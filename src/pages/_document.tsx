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
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
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
