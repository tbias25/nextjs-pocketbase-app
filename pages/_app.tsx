import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { usePocketBase } from "../src/hooks/usePocketbase";
import LoginPage from "./login";
import Layout from "../src/components/Layout";
import { Spinner } from "flowbite-react";

export default function App({ Component, pageProps }: AppProps) {
  const { client } = usePocketBase();
  const [isLoggedIn, setLoggedIn] = useState(client.authStore.isValid);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoggedIn(client.authStore.isValid);
      setLoading(true);
      console.log("isLoggedIn changed")
    }
    setLoading(false);
    console.log("isLogged", isLoggedIn);
  }, [client, isLoading, isLoggedIn]);

  if (isLoading) {
    return (
      <main className="bg-white dark:bg-gray-900">
        <div className="flex flex-col min-h-screen justify-center items-center">
          <Spinner aria-label="Loading..." size="xl" />
        </div>
      </main>
    );
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
