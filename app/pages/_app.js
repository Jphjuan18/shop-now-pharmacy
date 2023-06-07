import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// import { CookiesProvider } from "react-cookie";

export default function MyApp({ Component, pageProps }) {
  return;

  // <CookiesProvider>
  <Component {...pageProps} />;
  // </CookiesProvider>;
}
