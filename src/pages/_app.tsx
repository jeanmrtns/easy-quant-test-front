import { AppProps } from "next/app";
import { CalcProvider } from "../hooks/useCalc";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CalcProvider>
      <Component {...pageProps} />
    </CalcProvider>
  )
}

export default MyApp;
