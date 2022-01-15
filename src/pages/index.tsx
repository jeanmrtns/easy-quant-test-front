import Head from "next/head";
import Image from "next/image";

import BitCoinImage from "../../public/bitcoin.jpeg";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Easy Quant Calculator - Login</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.banner}>
          <Image src={BitCoinImage} alt="Bitcoin" objectFit="scale-down" />
        </div>
        <form className={styles.form}>
          <h1>Login to use the calculator</h1>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}
