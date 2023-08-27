import { AppProps } from "next/app";
import { Chakra } from "../utils/Chakra";
import "../styles/globals.css";
import "@fontsource/kanit";
import "@fontsource/raleway/700.css";

export function App({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Component {...pageProps} />
    </Chakra>
  );
}

export default App;

export { getServerSideProps } from "../utils/Chakra";
