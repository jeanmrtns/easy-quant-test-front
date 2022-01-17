import Head from "next/head";
import { FormEvent, useState } from "react";

import styles from "../styles/Home.module.scss";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth";

interface ICredentials {
  email: string;
  password: string;
}

export default function Home() {

  const [credentials, setCredentials] = useState({} as ICredentials);

  const { login, loading } = useAuth();

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (credentials) login(credentials);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <div className={styles.container}>
        <Head>
          <title>Easy Quant Calculator - Login</title>
        </Head>
        <div className={styles.main}>
          <div className={styles.banner}>
            <img src="../../bitcoin.jpeg" alt="Bitcoin" />
          </div>
          <form className={styles.form} onSubmit={e => handleLogin(e)}  >
            <h1>Login to use the calculator</h1>

            <input type="email" placeholder="Email" required onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} />
            <input type="password" placeholder="Password" required onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} />
            <button disabled={loading}>Login</button>
          </form>
        </div>

      </div>
    </>
  )
}
