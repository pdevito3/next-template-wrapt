import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();
class MyDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html
        className="h-full scroll-smooth antialiased [font-feature-settings:'ss01'] font-sans"
        lang="en"
      >
        <Head>
          <link rel="icon" href="/favicon.svg" />
          <link rel="preconnect" href="https://fonts.bunny.net" />
          <link
            rel="stylesheet"
            // href="https://fonts.bunny.net/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
            href="https://fonts.bunny.net/css2?family=Lexend:wght@100..900&display=swap"
          />
        </Head>
        <body className="flex flex-col h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
