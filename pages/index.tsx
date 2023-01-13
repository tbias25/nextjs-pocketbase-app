import { Button, Card, Footer, Modal, Table, Timeline } from "flowbite-react";
import Head from "next/head";
import { usePocketBase } from "../src/hooks/usePocketbase";

export default function HomePage() {
  const { client } = usePocketBase();

  return (
    <>
      <Head>
        <title>HomePage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap gap-2 justify-start">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Konto
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            id: {client.authStore.model?.id}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            username: {client.authStore.model?.username}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            name: {client.authStore.model?.name}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            email: {client.authStore.model?.email}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            created: {client.authStore.model?.created}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            updated: {client.authStore.model?.updated}
          </p>
        </Card>
      </div>
    </>
  );
}
