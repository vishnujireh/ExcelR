/**
 * CleverTap Web Native Display handler (shared by index.html and web_nd.html)
 * Docs: https://developer.clevertap.com/docs/web-native-display
 *
 * Handles:
 *  - Banner / Carousel templates  -> CleverTap renders directly into #<containerId>
 *                                    (enter this Div ID in the campaign on the dashboard)
 *  - Custom Key-Value template    -> listens to "CT_web_native_display", renders by topic
 *  - NotificationViewed / NotificationClicked via clevertap.renderNotificationViewed / Clicked
 *  - Fallback banner when no CleverTap content arrives
 *  - "clevertap_homepage_load" custom event (once per page load) when isHomepage: true
 *
 * Optional per-page override before this script loads:
 *   window.CT_WND_CONFIG = { containerId: 'Ct-banner-homepage', isHomepage: true };
 */
(function (window, document) {
  'use strict';

  var TAG = '[CT-WND]';
  if (window.CT_WND) {
    console.warn(TAG, 'ct-native-display.js already loaded on this page; skipping duplicate initialization');
    return;
  }
  var DEFAULTS = {
    containerId: 'ct-native-display',
    // Default/fallback banner (Google Drive file 14r__DMELhpSkCblcdY4DmLR3oQHUAIDU)
    fallbackImage: 'https://drive.google.com/file/d/14r__DMELhpSkCblcdY4DmLR3oQHUAIDU/view?usp=sharing',
    fallbackImageAlt: 'https://drive.google.com/file/d/14r__DMELhpSkCblcdY4DmLR3oQHUAIDU/view?usp=sharing',
    fallbackTimeoutMs: 6000,
    // KV topic (first key of the KV payload) that this container renders
    topics: { HOMEPAGE_BANNER: 'homepage_banner' },
    // Set true on the homepage only: raises the custom event below once per page load
    isHomepage: false,
    homepageLoadEvent: 'clevertap_homepage_load'
  };
  var CONFIG = Object.assign({}, DEFAULTS, window.CT_WND_CONFIG || {});

  var state = {
    container: null,
    observer: null,
    fallbackTimer: null,
    ctContentRendered: false,   // true once CleverTap (banner/carousel or KV) has rendered
    fallbackShown: false,
    selfMutation: false          // ignore DOM changes made by this script itself
  };

  function log() { console.log.apply(console, [TAG].concat([].slice.call(arguments))); }
  function warn() { console.warn.apply(console, [TAG].concat([].slice.call(arguments))); }

  /* ------------------------------------------------------------------ */
  /* Fallback banner                                                     */
  /* ------------------------------------------------------------------ */
  function renderFallback(reason) {
    if (state.ctContentRendered || state.fallbackShown) return;
    state.fallbackShown = true;
    log('No CleverTap Web Native Display content available (' + reason + '). Rendering DEFAULT/FALLBACK banner:', CONFIG.fallbackImage);

    var img = document.createElement('img');
    img.className = 'ct-wnd-fallback';
    img.alt = 'Default banner';
    img.src = CONFIG.fallbackImage;
    img.onerror = function () {
      if (img.src !== CONFIG.fallbackImageAlt) {
        warn('Fallback image failed to load, trying alternate URL');
        img.src = CONFIG.fallbackImageAlt;
      }
    };
    setContent(img);
  }

  /* ------------------------------------------------------------------ */
  /* Custom Key-Value template                                           */
  /* ------------------------------------------------------------------ */
  function pick(kv, keys) {
    for (var i = 0; i < keys.length; i++) {
      if (kv[keys[i]] !== undefined && kv[keys[i]] !== '') return kv[keys[i]];
    }
    return undefined;
  }

  // Rendering function for topic "homepage_banner".
  // Supported KV keys: image | imageUrl, title, message, ctaText, ctaUrl | url
  function renderHomepageBanner(data) {
    var kv = data.kv || {};
    var image = pick(kv, ['image', 'imageUrl', 'Image']);
    var title = pick(kv, ['title', 'Title']);
    var message = pick(kv, ['message', 'Message', 'text']);
    var ctaText = pick(kv, ['ctaText', 'CTA']);
    var ctaUrl = pick(kv, ['ctaUrl', 'url', 'URL']);

    if (!image && !title && !message) {
      warn('KV payload has no renderable keys (image/title/message). Payload:', kv);
      return false;
    }

    var wrap = document.createElement('div');
    wrap.className = 'ct-wnd-kv';
    if (ctaUrl) wrap.style.cursor = 'pointer';

    if (image) {
      var img = document.createElement('img');
      img.src = image;
      img.alt = title || 'CleverTap banner';
      wrap.appendChild(img);
    }
    if (title || message || ctaText) {
      var txt = document.createElement('div');
      txt.className = 'ct-wnd-kv-text';
      if (title) { var h = document.createElement('h3'); h.textContent = title; txt.appendChild(h); }
      if (message) { var p = document.createElement('p'); p.textContent = message; txt.appendChild(p); }
      if (ctaText) { var b = document.createElement('button'); b.type = 'button'; b.textContent = ctaText; txt.appendChild(b); }
      wrap.appendChild(txt);
    }

    setContent(wrap);
    log('KV banner rendered for topic "' + kv.topic + '" (msgId: ' + data.msgId + ')');

    // Raise NotificationViewed / NotificationClicked via the SDK
    if (window.clevertap && typeof clevertap.renderNotificationViewed === 'function') {
      clevertap.renderNotificationViewed(data);
      log('NotificationViewed raised for msgId', data.msgId);
    } else {
      warn('clevertap.renderNotificationViewed not available');
    }
    wrap.addEventListener('click', function () {
      if (window.clevertap && typeof clevertap.renderNotificationClicked === 'function') {
        clevertap.renderNotificationClicked(data);
        log('NotificationClicked raised for msgId', data.msgId);
      }
      if (ctaUrl) window.location.href = ctaUrl;
    });
    return true;
  }

  function onKvEvent(event) {
    var data = event && event.detail;
    log('CT_web_native_display event received. Payload:', data);
    if (!data || !data.kv) { warn('Event has no kv payload, ignoring'); return; }

    var topic = data.kv.topic;
    switch (topic) {
      case CONFIG.topics.HOMEPAGE_BANNER:
        if (renderHomepageBanner(data)) markCtRendered('KV template');
        break;
      default:
        log('Topic "' + topic + '" has no renderer on this page; ignoring. Known topics:', CONFIG.topics);
    }
  }

  /* ------------------------------------------------------------------ */
  /* Banner / Carousel templates (rendered by the SDK into the container)*/
  /* ------------------------------------------------------------------ */
  function observeContainer() {
    if (!('MutationObserver' in window)) { warn('MutationObserver unsupported; cannot detect SDK-rendered banner'); return; }
    state.observer = new MutationObserver(function (mutations) {
      if (state.selfMutation) return;
      var added = mutations.some(function (m) { return m.type === 'childList' && m.addedNodes.length; });
      if (!added || !state.container.children.length) return;
      // Content injected by someone other than this script => CleverTap Banner/Carousel
      log('CleverTap Banner/Carousel content rendered into #' + CONFIG.containerId + (state.fallbackShown ? ' (replaced fallback banner)' : ''));
      markCtRendered('Banner/Carousel template');
    });
    state.observer.observe(state.container, { childList: true, subtree: true });
  }

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  function setContent(node) {
    state.selfMutation = true;
    state.container.innerHTML = '';
    state.container.appendChild(node);
    // MutationObserver callbacks are async (microtask); release the flag after they run
    setTimeout(function () { state.selfMutation = false; }, 0);
  }

  function markCtRendered(source) {
    state.ctContentRendered = true;
    state.fallbackShown = false;
    if (state.fallbackTimer) { clearTimeout(state.fallbackTimer); state.fallbackTimer = null; }
    log('Web Native Display content active. Source: ' + source);
  }

  /* ------------------------------------------------------------------ */
  /* Homepage load event                                                 */
  /* ------------------------------------------------------------------ */
  // Pushes "clevertap_homepage_load" through the SDK queue (clevertap.event.push),
  // so it is sent as soon as clevertap.min.js finishes loading. A window-level flag
  // guarantees a single fire per page load even if this script is included twice.
  function raiseHomepageLoadEvent() {
    if (!CONFIG.isHomepage) return;
    if (window.__CT_HOMEPAGE_LOAD_FIRED__) {
      log('"' + CONFIG.homepageLoadEvent + '" already raised for this page load; skipping duplicate');
      return;
    }
    if (!window.clevertap || !clevertap.event || typeof clevertap.event.push !== 'function') {
      warn('clevertap object not initialised; cannot raise "' + CONFIG.homepageLoadEvent + '"');
      return;
    }
    window.__CT_HOMEPAGE_LOAD_FIRED__ = true;
    var props = { page: window.location.pathname, referrer: document.referrer || '' };
    clevertap.event.push(CONFIG.homepageLoadEvent, props);
    log('Event "' + CONFIG.homepageLoadEvent + '" pushed to CleverTap SDK' +
        (Array.isArray(clevertap.event) ? ' (queued; SDK still loading)' : '') + '. Props:', props);
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                */
  /* ------------------------------------------------------------------ */
  function sdkVersion() {
    try { return typeof clevertap.getSDKVersion === 'function' ? clevertap.getSDKVersion() : 'n/a (SDK not loaded yet)'; }
    catch (e) { return 'n/a'; }
  }

  function init() {
    raiseHomepageLoadEvent();

    state.container = document.getElementById(CONFIG.containerId);
    if (!state.container) {
      warn('Container #' + CONFIG.containerId + ' not found; Web Native Display not initialized on this page');
      return;
    }
    var sdkLoaded = !!(window.clevertap && clevertap.event && !Array.isArray(clevertap.event));
    log('Initializing Web Native Display. Container: #' + CONFIG.containerId + ', fallback after ' + CONFIG.fallbackTimeoutMs + 'ms, SDK loaded: ' + sdkLoaded + ', SDK version: ' + sdkVersion());

    document.addEventListener('CT_web_native_display', onKvEvent);
    observeContainer();

    // If the SDK already injected a banner before we attached (fast response), honour it
    if (state.container.children.length) {
      markCtRendered('Banner/Carousel template (pre-rendered)');
      return;
    }
    state.fallbackTimer = setTimeout(function () {
      renderFallback('no campaign content within ' + CONFIG.fallbackTimeoutMs + 'ms');
    }, CONFIG.fallbackTimeoutMs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for debugging in the console
  window.CT_WND = { config: CONFIG, state: state, renderFallback: renderFallback, raiseHomepageLoadEvent: raiseHomepageLoadEvent };
})(window, document);
