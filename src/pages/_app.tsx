import { AppProps } from "next/app";
import { AuthContextProvider } from "../hooks/useAuth";
import { CalcProvider } from "../hooks/useCalc";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CalcProvider>
        <Component {...pageProps} />
      </CalcProvider>
    </AuthContextProvider>
  )
}

export default MyApp;
