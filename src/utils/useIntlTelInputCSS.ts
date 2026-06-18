import { useEffect } from "react";

const LINK_ID = "intl-tel-input-css";

/**
 * Lazily injects intlTelInput.css into the document <head> the first time
 * a component that needs it mounts. The stylesheet lives in /public/css/
 * so it is served as a static asset — never part of the critical CSS bundle.
 *
 * Previously this CSS was imported globally in _app.tsx, which caused it to
 * appear as a render-blocking resource on every single page (including pages
 * that have no phone input at all). Moving it here limits the cost to pages
 * that actually render a form with a phone field.
 */
export function useIntlTelInputCSS() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(LINK_ID)) return; // already injected

    const link = document.createElement("link");
    link.id = LINK_ID;
    link.rel = "stylesheet";
    link.href = "/css/intlTelInput.css";
    document.head.appendChild(link);
  }, []);
}
