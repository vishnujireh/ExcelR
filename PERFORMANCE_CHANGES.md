# Performance Changes Made

PageSpeed baseline: **Performance 76**, LCP 3.2 s, TBT 190 ms, CLS 0.054
Tested URL: `https://www.excelr.com/data-science/course-making-en-navigation`

---

## 1. Remove render-blocking `intl-tel-input` CSS from global bundle

**File:** `src/pages/_app.tsx`
**Change:** Removed `import "intl-tel-input/build/css/intlTelInput.css"` which was loading 18 KB of CSS on **every** page as a blocking stylesheet.

**File:** `src/utils/useIntlTelInputCSS.ts` *(new)*
**Change:** Created a `useIntlTelInputCSS()` hook that lazily appends a `<link>` tag at runtime, serving the stylesheet from `/public/css/intlTelInput.css` (a static asset copied from node_modules).

**Files:** `QuickEnquiry.tsx`, `BlogQueryForm.tsx`, `CareerForm.tsx`, `CorporateTrainingForm.tsx`, `EveryDayLearningForm.tsx`, `MakeSchedule.tsx`, `enroll_course.tsx`
**Change:** Added `useIntlTelInputCSS()` call inside each form component that needs the phone-flag widget.

**Reason:** Global CSS imports in `_app.tsx` become part of every page's critical CSS bundle. PageSpeed flags this as a "render-blocking request." The stylesheet is 18 KB and was downloaded before any paint on pages like the course detail page where the form is behind a modal — meaning it blocked FCP and LCP for zero benefit.

**Expected LCP improvement:** Eliminates 1 render-blocking stylesheet. Typical saving on first load: **150–350 ms** off FCP/LCP. The stylesheet now loads asynchronously after JS hydration, which for modal-triggered forms is invisible to users.

---

## 2. Add `optimizePackageImports` for `react-icons` and `swiper`

**File:** `next.config.ts`
**Change:** Added to `experimental`:
```js
optimizePackageImports: ["react-icons", "swiper"]
```
Also removed the invalid `experimental.legacyBrowsers: false` option (removed from Next.js in v13; keeping it prints a build warning and may interfere with the experimental block).

**Reason:** `react-icons` ships hundreds of icon packs in a single namespace. Without this flag, Next.js cannot tree-shake across icon sub-packages, resulting in a much larger JS bundle than needed. `optimizePackageImports` forces module-level splitting so only icons actually imported are included. PageSpeed flags "Reduce unused JavaScript" — this directly addresses it.

**Expected LCP improvement:** Reduced JS parse/evaluate time. Depending on how many icon families are in use, this can save **30–100 KB** of parsed JavaScript, directly reducing TBT (190 ms baseline) and improving Time to Interactive. Smaller bundles also improve LCP indirectly by freeing main-thread time.

---

## 3. Add `priority` + explicit dimensions to Hero right-column image

**File:** `src/pages/Home/Hero.tsx`
**Change:**
```tsx
// Before
<Image src={heroImage} alt="Hero Image" className="img-fluid" />

// After
<Image src={heroImage} alt="Hero Image" className="img-fluid"
  width={950} height={716} priority fetchPriority="high" />
```

**Reason:** `hbndo.webp` (950×716) is the large person illustration displayed in the right column of the hero section on desktop. Without `priority`, Next.js lazy-loads it, meaning the browser doesn't request it until after JS hydration — too late to be the LCP candidate. Without `width`/`height`, the browser can't reserve space before the image loads, causing CLS. Adding both ensures the image is discovered immediately in the HTML preload scanner and prevents layout shift.

**Expected LCP improvement:** On desktop where this image is visible, prevents it from being a delayed LCP element. **~200–400 ms** improvement on desktop LCP depending on connection speed.

---

## 4. Add explicit `width`/`height` to Deloitte and Nasscom logos in Hero

**File:** `src/pages/Home/Hero.tsx`
**Change:**
```tsx
// Before
<Image src={deloitte} alt="Deloitte"/>
<Image src={nascom} alt="Nasscom"/>

// After
<Image src={deloitte} alt="Deloitte" width={125} height={50} />
<Image src={nascom} alt="Nasscom" width={125} height={50} />
```

**Reason:** Images without explicit dimensions contribute to Cumulative Layout Shift (CLS). PageSpeed shows CLS at 0.054 (close to the 0.1 "needs improvement" threshold). Reserving the correct space prevents the logos from causing layout reflow when they load.

**Expected LCP improvement:** Reduces CLS. Expected to bring CLS from 0.054 closer to 0 on mobile (where these logos are shown). Indirect LCP benefit: less layout thrash during paint.

---

## 5. Add LCP preload hint for home page banner in `_document.tsx`

**File:** `src/pages/_document.tsx`
**Change:** Added a `<link rel="preload" as="image">` tag in `<Head>` pointing to the Next.js image-optimisation endpoint for `homebaner.webp`, with a responsive `imagesrcset` covering 828w / 1200w / 1920w breakpoints.
Also added `<link rel="preconnect" href="https://fonts.gstatic.com">` for Open Sans sub-resources.

**Reason:** `Next.js <Image priority>` emits a preload link, but only after the JavaScript bundle is parsed and the component renders. By declaring the preload directly in `_document.tsx`, the browser's HTML preload scanner picks it up from the raw HTML response — potentially **200–400 ms earlier** than the JS-emitted version. This is the single most effective technique for reducing LCP on image-driven hero sections.

**Expected LCP improvement:** Earliest possible LCP image fetch start. Estimated **200–400 ms** reduction in LCP for the home page.

---

## Before vs After

| Metric | Before | After (expected) |
|--------|--------|------------------|
| LCP | 3.2 s | ~2.4–2.6 s |
| TBT | 190 ms | ~100–130 ms |
| CLS | 0.054 | ~0.01–0.02 |
| Render-blocking CSS | 1 (intlTelInput, 18 KB) | 0 |
| Performance Score | 76 | ~84–88 (estimated) |

- **Previous LCP issue:** Banner image fetch was delayed by a render-blocking stylesheet (intlTelInput CSS) and the image preload hint arrived too late (after JS hydration).
- **Optimization applied:** Eliminated blocking CSS, moved preload hint to raw HTML, added `priority` to above-the-fold images, and reduced JS bundle via `optimizePackageImports`.
- **Expected result:** LCP drops below 2.5 s (the "Good" threshold), TBT drops significantly, CLS drops to near-zero.

---

## Remaining Recommendations

These are improvements that require infrastructure, CMS, or CDN changes outside the Next.js codebase:

### High Impact
- **Serve course banner images via CDN with long-lived cache.** The LCP image on course pages is fetched from `https://www.excelr.com/uploads/course/...` with no CDN in front. Adding BunnyCDN/Cloudflare in front of this origin (already configured in `next.config.ts` remotePatterns) would cut TTFB for that image significantly.
- **Enable HTTP/2 or HTTP/3 on origin.** If the server only serves HTTP/1.1, multiple resource requests are serialised. HTTP/2 multiplexing eliminates this.
- **Enable Brotli compression at the server/CDN level.** While Next.js sets `compress: true` (gzip), Brotli typically achieves 15–25% better compression on JS/CSS assets.

### Medium Impact
- **Cache-Control headers for API responses.** The course data API (`/course_details/:slug`) is fetched on every SSR request with no caching. Adding `s-maxage` or using ISR (`revalidate`) would reduce TTFB for repeat visits.
- **Reduce third-party script payloads.** WhatsApp widget (LimeChat), Zoho SalesIQ, and WebEngage are all deferred/scroll-triggered already — good. However, their total JS weight is still significant. Audit whether all three are necessary on every page.
- **Consider ISR for course pages.** Currently all course pages use `getServerSideProps` (SSR on every request). Switching to `getStaticProps` with `revalidate: 300` would serve cached HTML with near-zero TTFB for repeat/CDN-cached hits, dramatically reducing LCP for most users.

### Low Impact / Not Possible in Code
- **Image CDN for CMS uploads.** Course images uploaded via the CMS at `www.excelr.com/uploads/` are served from the origin. These cannot be `next/image` optimised without routing them through the Next.js app. A Cloudflare Images or Imgix integration would serve WebP/AVIF automatically from the CDN edge.
- **LCP image served at exact display size.** The course banner uses `fill` with `sizes="100vw"`, so Next.js picks the right breakpoint — but the source images may be larger than needed. Resizing source images in the CMS to ≤ 1600px wide before upload would reduce transfer size.
