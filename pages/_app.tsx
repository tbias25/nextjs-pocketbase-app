import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useCallback, useEffect, useState } from "react";
import { usePocketBase } from "../src/hooks/usePocketbase";
import HomePage from ".";
import LoginPage from "./login";
import Layout from "../src/components/Layout";
import { Spinner } from "flowbite-react";

export default function App({ Component, pageProps }: AppProps) {
  const { client } = usePocketBase();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);


  const fetch = useCallback(() => {
    if (isLoading) {
      setLoggedIn(client.authStore.isValid);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  if (isLoading) {
    return <div className="flex flex-col min-h-screen justify-center items-center"><Spinner aria-label="Loading..." size="xl" /></div>;
  }

  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <LoginPage />
      )}
    </>
  );
}
