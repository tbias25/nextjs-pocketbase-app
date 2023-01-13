import { usePocketBase } from "../src/hooks/usePocketbase";

export default function ProfilePage() {
  const { client } = usePocketBase();

  return (
    <>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        ProfilePage
      </p>
    </>
  );
}
