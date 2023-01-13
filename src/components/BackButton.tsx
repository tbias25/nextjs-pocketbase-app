import { useRouter } from "next/router";

export default function BackButton() {
    const router = useRouter();
    
    const handleBackButton = () => {
        router.back();
      }

    return (
        <button
            onClick={handleBackButton}
             className="flex mr-3 w-8 h-8 bg-white rounded-md text-s md:mr-0 items-center justify-center hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 rounded-full text-gray-500"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
    )
}