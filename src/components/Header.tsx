import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { usePocketBase } from "../hooks/usePocketbase";

export default function Header() {
  const { client } = usePocketBase();
  const router = useRouter();
  const logout = async () => {
    client.authStore.clear();
    router.reload();
  };

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          IPS Sicherheitsdienst
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Link href="/documents">
          <button className="flex mr-3 w-8 h-8 bg-white rounded-md text-s md:mr-0 items-center justify-center hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 rounded-full text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                clipRule="evenodd"
              />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
          </button>
        </Link>
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="Avatar"
              img={`https://tbias25.de/api/files/${client.authStore.model?.collectionId}/${client.authStore.model?.id}/${client.authStore.model?.avatar}`}
              rounded={true}
              size="sm"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {client.authStore.model?.name}
            </span>
            <span className="block truncate text-sm font-medium">
              {client.authStore.model?.email}
            </span>
          </Dropdown.Header>
          <Link href="/profile">
            <Dropdown.Item>Konto</Dropdown.Item>
          </Link>
          <Link href="/settings">
            <Dropdown.Item>Einstellungen</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>Abmelden</Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );
}
