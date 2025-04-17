import Link from "next/link";

export default function HomePage() {
    return (
        <div className="p-8 max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
            <p>HOME PAGE</p>
            <Link href="/create">Create</Link>
            <Link href="/library">My Library</Link>
            <Link href="/about">About</Link>
            <Link href="/settings">Settings</Link>
        </div>
    );
}
