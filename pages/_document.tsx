// import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";
// import theme from "../theme";

const setInitialThemeScript = `
  (function() {
    const persistedThemeValue = localStorage.getItem('theme');
    if (persistedThemeValue) {
      document.documentElement.setAttribute('data-theme', persistedThemeValue);
    }
  })();
`;

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: setInitialThemeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
