import { usePocketBase } from "../src/hooks/usePocketbase";

export default function SettingsPage() {
    const { client } = usePocketBase();

    return(
        <>
        <p>SettingsPage</p>
        </>
    )
}