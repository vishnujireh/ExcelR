import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';

// Custom Document for the Pages Router. Keep this server side only — do not add "use client".
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/favicon.png" />

          {/*
            ── Home-page LCP preload ─────────────────────────────────────────
            homebaner.webp is the full-bleed hero background on the home page.
            Next.js <Image priority> emits a preload only after the JS bundle
            parses the component. Declaring it here means the browser sees it
            in the raw HTML and fetches it immediately, saving ~200–400 ms.

            We target the Next.js image-optimisation endpoint so the browser
            gets the same optimised asset that the <Image> component requests.
            ─────────────────────────────────────────────────────────────────── */}
          <link
            rel="preload"
            as="image"
            href="/_next/image?url=%2Fhomebaner.webp&w=1920&q=75"
            // @ts-ignore — imagesrcset/imagesizes are valid HTML but missing from React types
            imagesrcset="/_next/image?url=%2Fhomebaner.webp&w=828&q=75 828w, /_next/image?url=%2Fhomebaner.webp&w=1200&q=75 1200w, /_next/image?url=%2Fhomebaner.webp&w=1920&q=75 1920w"
            imagesizes="100vw"
          />

          {/* Preconnect to image origins so DNS+TCP+TLS is resolved before banner image fetch */}
          <link rel="preconnect" href="https://www.excelr.com" />
          <link rel="dns-prefetch" href="https://www.excelr.com" />
          <link rel="preconnect" href="https://excelrcom.b-cdn.net" />
          <link rel="dns-prefetch" href="https://excelrcom.b-cdn.net" />
          {/* Google Fonts preconnect — Open Sans is loaded via next/font but
              some sub-resources still cross-origin-connect to fonts.gstatic.com */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Head>
        <body>
          <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=GTM-MNQJ78J"
      height="0"
      width="0"
      style={{ display: "none", visibility: "hidden" }}
    />
  </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
