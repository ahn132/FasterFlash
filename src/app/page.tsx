'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { redirect } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";

export default function HomePage() {
    const supabase = createClient()

    const logout = async () => {
        const {error} = await supabase.auth.signOut()
        if (error) {
            alert(error.message)
        }
        else {
            redirect('/login')
        }

    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between py-10 px-4">
            {/* App Name */}
            <h1 className="text-4xl font-bold">Faster Flash</h1>

            {/* Middle Section: Buttons */}
            <div className="flex flex-col items-center gap-6">
                <Link href="/create">
                    <Button className="w-60 h-16 text-lg flex items-center gap-2 justify-center">
                        <AddCircleIcon /> Create
                    </Button>
                </Link>
                <Link href="/library">
                    <Button className="w-60 h-16 text-lg flex items-center gap-2 justify-center">
                        <LibraryBooksIcon /> Library
                    </Button>
                </Link>
                <Button className="w-60 h-16 text-lg flex items-center gap-2 justify-center" onClick={logout}>
                    <LogoutIcon /> Log Out
                </Button>
            </div>

            {/* Bottom Section: Description */}
            <p className="text-center text-gray-400 max-w-md text-sm">
                Faster Flash is a rapid flashcard creation and review app designed to help you master languages faster, starting with Korean to English translation.
            </p>
        </div>
    );
}
