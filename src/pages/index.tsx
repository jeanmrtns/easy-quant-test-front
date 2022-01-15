import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { FormEvent, useState } from "react";

import BitCoinImage from "../../public/bitcoin.jpeg";
import { api } from "../services/api";
import styles from "../styles/Home.module.scss";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ICredentials {
  email: string;
  password: string;
}

export default function Home() {

  const [credentials, setCredentials] = useState({} as ICredentials);
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
      functionThatReturnPromise,
      {
        pending: 'Loading',
        success: 'Loaded'
      }
    )
    const response = await api.post(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/user`, { params: credentials });


    if (!response.data) {
      toast.error('Invalid credentials!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      return;
    }


    Router.push('/calculator');

  }

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
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
            <Image src={BitCoinImage} alt="Bitcoin" objectFit="scale-down" />
          </div>
          <form className={styles.form} onSubmit={e => handleLogin(e)}  >
            <h1>Login to use the calculator</h1>

            <input type="email" placeholder="Email" onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} />
            <input type="password" placeholder="Password" onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} />
            <button disabled={loading}>Login</button>
          </form>
        </div>

      </div>
    </>
  )
}
