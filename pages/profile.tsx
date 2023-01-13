import { usePocketBase } from "../src/hooks/usePocketbase";

export default function ProfilePage() {
    const { client } = usePocketBase();

    return(
        <>
        <p>ProfilePage</p>
        </>
    )
}