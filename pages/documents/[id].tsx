import { Button, Card } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignaturePad from "react-signature-pad-wrapper";
import BackButton from "../../src/components/BackButton";
import { IDocument, usePocketBase } from "../../src/hooks/usePocketbase";

export default function DocumentPage() {
  const { client } = usePocketBase();
  const router = useRouter();
  const { id } = router.query;

  let padRef = React.useRef<SignaturePad>(null);

  function handleClear() {
    const signaturePad = padRef.current;
    if (!signaturePad) {
      return;
    }
    signaturePad.instance.clear();
  }

  function handleSave() {
    const signaturePad = padRef.current;
    if (!signaturePad) {
      return;
    }
    if (signaturePad.isEmpty()) {
      console.log("pad empty");
    } else {
      console.log("toData: ", signaturePad.toData());
      console.log("toDataURL: ", signaturePad.toDataURL());
      console.log("toSVG: ", signaturePad.toSVG());
      const data = {
        "user": client.authStore.model?.id,
        "file": signaturePad.toSVG(),
      }
      client.collection("signatures").create(data);
    }
  }

  const getDocument = async () => {
    try {
      const record = await client.collection("documents").getOne(`${id}`);
      console.log(record)
    } catch (error) {
      console.log("Error occurred while fetching data", error);
    }
  };
  
  useEffect(() => {
    getDocument();
  });

  return (
    <>
      <Head>
        <title>DocumentPage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col gap-2 justify-center items-center">
        <Card>
          <div className="flex flex-row justify-between items-center">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {id}
          </h5>
            <BackButton />
          </div>
          <div className="bg-gray-100 rounded-lg border-2 border-gray-300">
            <SignaturePad ref={padRef} />
          </div>

          <div className="flex flex-row justify-between gap-2">
            <Button onClick={handleClear} color="light" outline={true}>
              Leeren
            </Button>
            <Button onClick={handleSave} color="light" outline={true}>
              Fertig
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
