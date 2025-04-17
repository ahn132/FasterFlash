'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const supabase = createClient()

    const handleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            router.push('/');
        }
    };

    const handleSignup = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            router.push('/')
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }}
        >
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 mb-4"
            />
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
                <button
                    type="button"
                    onClick={handleSignup}
                    className="bg-green-500 text-white px-4 py-2"
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </div>
        </form>
    );
}
