'use client'

import {useEffect, useState} from "react";
import {Flashcard, FlashCardSetBasic} from "@/types/flashcard";
import NewFlashcard from "@/app/create/NewFlashcard";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import {useParams, useRouter} from "next/navigation";
import "@/app/globals.css";
import { TypographyP } from "@/components/ui/typography";

export default function EditPage() {
    const [cards, setCards] = useState<Flashcard[]>([{ index: 0, front: "", back: "" }]);
    const [nextID, setNextID] = useState(1);
    const [index, setIndex] = useState(0);
    const [stackName, setStackName] = useState("");
    const [autoTranslate, setAutoTranslate] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const {stack_id} = useParams()

    useEffect(() => {
        const loadCards = async () => {

            //get stack name
            const {data: stackInfo, error: stackError} = await supabase
                .from('flashcard_sets')
                .select('stack_name')
                .eq('stack_id', stack_id)
            if (!stackError) {
                setStackName(stackInfo[0].stack_name)
            }
            else {
                alert(stackError.message);
            }

            //get cards
            const { data: flashcards, error: flashcardsError } = await supabase
                .from('flashcards')
                .select('index, front, back')
                .eq('stack_id', stack_id);
            if (!flashcardsError) {
                flashcards.sort(function(a, b) {
                    if (a.index > b.index) {
                        return 1;
                    }
                    if (a.index < b.index) {
                        return -1;
                    }
                    return 0;
                });
                setCards(flashcards);
                setNextID(flashcards.length)
            }
            else {
                alert(flashcardsError.message);
            }
        };

        loadCards();
    }, [stack_id]);

    const addCard = () => {
        setCards(prev => [...prev, { index: nextID, front: "", back: "" }]);
        setNextID(id => id + 1);
        setIndex(i => i + 1);
    };

    const updateCard = (index: number, changes: Partial<Flashcard>) => {
        setCards(prev => prev.map(card => card.index === index ? { ...card, ...changes } : card));
    };

    const deleteCard = (index: number) => {
        setCards(prev => prev.filter(card => card.index !== index));
        setIndex(i => Math.max(0, i - 1));
    };

    const saveStack = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        await supabase
            .from('flashcard_sets')
            .update({ stack_name: stackName })
            .eq('stack_id', stack_id);

        for (const card of cards) {
            const { data, error } = await supabase
                .from('flashcards')
                .update({
                    front: card.front,
                    back: card.back,
                })
                .eq('stack_id', stack_id)
                .eq('index', card.index)
                .select()

            if (error) {
                alert(error.message);
            } else if (data.length === 0) {
                await supabase.from('flashcards').insert([
                    {
                        user_id: user!.id,
                        stack_id: stack_id,
                        index: card.index,
                        front: card.front,
                        back: card.back,
                    }
                ]);
            }
        }
        router.push("/");
    };

    return (
        <div className="grid grid-cols-4 grid-rows-4 w-screen h-screen bg-black text-white">
            <div className="col-start-1 col-span-1 row-start-1 row-span-1 self-center justify-self-center -translate-x-17">
                <Button onClick={() => router.push("/")}>
                    <HomeIcon sx={{ fontSize: 24, color: 'white' }} />
                </Button>
            </div>

            <Textarea
                value={stackName}
                onChange={(e) => setStackName(e.target.value)}
                placeholder="Stack name"
                rows={2}
                className="col-span-2 col-start-2 row-span-1 row-start-1 min-h-[auto] self-center text-center text-3xl md:text-3xl resize-none bg-black text-white border-2 border-white"
            />

            <div className="col-span-2 col-start-2 row-span-2 row-start-2">
                <TypographyP className="text-center mb-1">Card {index + 1} of {cards.length}</TypographyP>
                <NewFlashcard
                    key={index}
                    card={cards[index]}
                    onUpdate={updateCard}
                    onDelete={deleteCard}
                    autoTranslate={autoTranslate}
                />
            </div>

            <Button
                onClick={() => setIndex(i => i - 1)}
                className="row-start-2 row-span-2 col-start-1 col-span-1 w-fit h-fit self-center justify-self-center"
                variant={index !== 0 ? "default" : "outline"}
                disabled={index === 0}
                style={index === 0 ? { opacity: 0.5, color: 'white' } : {}}
            >
                <ArrowBackIcon sx={{ fontSize: 40, color: 'white' }} />
            </Button>

            {index === cards.length - 1 ? (
                <Button
                    onClick={addCard}
                    className="row-start-2 row-span-2 col-start-4 col-span-1 w-fit h-fit self-center justify-self-center"
                >
                    <AddIcon sx={{ fontSize: 40 }} />
                </Button>
            ) : (
                <Button
                    onClick={() => setIndex(i => i + 1)}
                    className="row-start-2 row-span-2 col-start-4 col-span-1 w-fit h-fit self-center justify-self-center"
                >
                    <ArrowForwardIcon sx={{ fontSize: 40 }} />
                </Button>
            )}

            <Button
                className="row-start-4 row-span-1 col-start-1 col-span-1 w-fit h-fit self-center justify-self-center"
                onClick={() => setAutoTranslate(!autoTranslate)}
            >
                Auto-translate {autoTranslate ? "enabled" : "disabled"}
            </Button>

            <Button
                disabled={!(stackName.length !== 0 && cards.every(card => card.front.length !== 0 && card.back.length !== 0))}
                variant={stackName.length !== 0 && cards.every(card => card.front.length !== 0 && card.back.length !== 0) ? "default" : "outline"}
                onClick={saveStack}
                className="row-start-4 row-span-1 col-start-4 col-span-4 w-fit h-fit self-center justify-self-center"
                style={!(stackName.length !== 0 && cards.every(card => card.front.length !== 0 && card.back.length !== 0)) ? { opacity: 0.5, color: 'white' } : {}}
            >
                Save flashcard Set
            </Button>
        </div>
    );
}
