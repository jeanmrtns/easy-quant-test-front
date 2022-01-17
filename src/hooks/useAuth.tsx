import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";

interface AuthContextData {
  user: User;
  setUser: (user: User) => void;
  login: (credentials: Credentials) => void;
  logout: () => void;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  id: string;
}

interface Credentials {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  async function login(credentials: Credentials) {

    try {
      setLoading(true);
      const response = await api.post(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/user`, { params: credentials });

      const { email } = response.data;
      setCookie(undefined, 'calcauth', email, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      setLoading(false);
      Router.push('/calc');
    } catch (error) {
      setLoading(false);
      toast.error('Invalid credentials!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

    }

  }

  function logout() {
    destroyCookie(null, 'calcauth');
    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}