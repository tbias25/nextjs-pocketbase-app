import { Footer } from "flowbite-react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
     <main className="bg-white dark:bg-gray-900">
      <Header />
      <div className="min-h-screen p-6">
        {children}
      </div>
      <Footer container={true}>
        <Footer.Copyright href="#" by="IPS Sicherheitsdienst GmbH" year={2023} />
        <Footer.LinkGroup>
          <Footer.Link href="#">Status</Footer.Link>
          <Footer.Link href="#">Kontakt</Footer.Link>
          <Footer.Link href="#">Datenschutz</Footer.Link>
          <Footer.Link href="#">Impressum</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
      </main>
    </>
  );
}
