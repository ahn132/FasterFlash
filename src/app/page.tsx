import Link from "next/link";
import { motion } from "motion/react"

export default function HomePage() {
    return (
        <div className="p-8 max-w-sm mx-auto">
            <p>HOME PAGE</p>
            <Link href="/create">Create</Link>
            <Link href="/library">My Library</Link>
            <Link href="/about">About</Link>
            <Link href="/settings">Settings</Link>
        </div>
    );
}
