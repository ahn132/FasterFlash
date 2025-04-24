'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const supabase = createClient();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(error.message);
        } else {
            router.push('/');
        }
    };

    const handleSignup = async () => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(error.message);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white grid grid-cols-1 lg:grid-cols-2 p-4 gap-6">
            {/* Title */}
            <div className="absolute top-10 left-0 w-full text-center">
                <h1 className="text-4xl font-bold">Faster Flash</h1>
            </div>


            {/* Left: Login Card */}
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md bg-neutral-900 border border-white mt-16">
                    <CardContent className="flex flex-col gap-4 p-6">
                        <h2 className="text-2xl font-semibold text-center text-white">Login / Sign-up</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLogin();
                            }}
                            className="flex flex-col gap-4"
                        >
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-black text-white border-white"
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-black text-white border-white"
                            />
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <Button type="submit" className="col-span-1 flex items-center justify-center gap-2">
                                    <LoginIcon /> {'Log In'}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSignup}
                                    className="col-span-1 flex items-center justify-center gap-2"
                                >
                                    <PersonAddIcon /> {'Sign Up'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Description Section */}
            <div className="flex items-center justify-center px-6">
                <div className="max-w-xl text-sm text-gray-300">
                    <h2 className="text-2xl font-bold mb-4 text-white">About Faster Flash</h2>
                    <p className="mb-2">
                        Faster Flash is a rapid flashcard creation and review tool designed to help you master vocabulary more effectively — starting with Korean to English translations.
                    </p>
                    <p className="mb-2">
                        Built with Next.js, Supabase, and ShadCN UI components, this app delivers a streamlined, responsive experience with support for user authentication and real-time updates.
                    </p>
                    <p>
                        Whether you're studying for a language test or just brushing up on new words, Faster Flash makes it simple, clean, and efficient.
                    </p>
                </div>
            </div>
        </div>
    );
}