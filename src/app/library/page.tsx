'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import { FlashCardSetBasic } from '@/types/flashcard';

export default function LibraryPage() {
    const [stacks, setStacks] = useState<FlashCardSetBasic[]>([]);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const loadStacks = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            const { data, error } = await supabase
                .from('flashcard_sets')
                .select('stack_name, stack_id')
                .eq('user_id', user!.id);

            if (!error) {
                setStacks(data);
            }
        };

        loadStacks();
    }, []);

    const handleDelete = async (id: number) => {
        await supabase.from('flashcard_sets').delete().eq('stack_id', id);
        setStacks((prev) => prev.filter((stack) => stack.stack_id !== id));
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 relative">
            <div className="absolute top-10 left-10">
                <Button
                    onClick={() => router.push('/')}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white border border-white"
                >
                    <HomeIcon sx={{ fontSize: 20 }} />
                </Button>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-center">Your Flashcard Sets</h1>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {stacks.map((stack: any) => (
                    <Card
                        key={stack.stack_id}
                        className="bg-neutral-900 border border-white flex flex-col justify-between"
                    >
                        <CardContent className="flex flex-col gap-4 h-full">
                            <h2 className="text-xl font-semibold text-white mb-4 text-center">{stack.stack_name}</h2>
                            <div className="mt-auto grid grid-cols-1 gap-2">
                                <Button
                                    onClick={() => router.push(`/study/${stack.stack_id}`)}
                                    className="flex items-center gap-2 justify-center"
                                >
                                    <SchoolIcon /> Study
                                </Button>
                                <Button
                                    onClick={() => router.push(`/edit/${stack.stack_id}`)}
                                    className="flex items-center gap-2 justify-center"
                                >
                                    <EditIcon /> Edit
                                </Button>
                                <Button
                                    onClick={() => handleDelete(stack.stack_id)}
                                    className="flex items-center gap-2 justify-center border-white text-white"
                                >
                                    <DeleteIcon /> Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
