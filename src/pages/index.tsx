import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { FormEvent, useState } from "react";

import BitCoinImage from "../../public/bitcoin.jpeg";
import { api } from "../services/api";
import styles from "../styles/Home.module.scss";

interface ICredentials {
  email: string;
  password: string;
}

export default function Home() {

  const [credentials, setCredentials] = useState({} as ICredentials);

  async function login() {
    const response = await api.post(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/user`, { params: credentials });

    if (!response.data) {
      alert('Invalid credentials');
      return;
    }

    Router.push('/calculator');

  }

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Easy Quant Calculator - Login</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.banner}>
          <Image src={BitCoinImage} alt="Bitcoin" objectFit="scale-down" />
        </div>
        <form className={styles.form} onSubmit={e => handleLogin(e)}  >
          <h1>Login to use the calculator</h1>

          <input type="email" placeholder="Email" onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} />
          <input type="password" placeholder="Password" onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} />
          <button>Login</button>
        </form>
      </div>
    </div>
  )
}
