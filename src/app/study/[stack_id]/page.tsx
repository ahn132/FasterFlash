'use client'

import {useEffect, useState} from "react";
import { Flashcard } from "@/types/flashcard";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/client";
import {useParams, useRouter} from "next/navigation";
import "@/app/globals.css";
import { TypographyP } from "@/components/ui/typography";
import StudyFlashcard from "@/app/study/[stack_id]/StudyFlashcard";
import { ArrowBackIos } from "@mui/icons-material";

export default function EditPage() {
    const {stack_id} = useParams()
    const [cards, setCards] = useState<Flashcard[]>([{ index: 0, front: "", back: "" }]);
    const [index, setIndex] = useState(0);
    const [stackName, setStackName] = useState("");
    const [autoTranslate, setAutoTranslate] = useState(true);
    const supabase = createClient();
    const router = useRouter();

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
            }
            else {
                alert(flashcardsError.message);
            }
        };

        loadCards();
    }, [stack_id]);

    return (
        <div className="grid grid-cols-4 grid-rows-4 w-screen h-screen bg-black text-white">
            <div className="col-start-1 col-span-1 row-start-1 row-span-1 self-center justify-self-center -translate-x-17">
                <Button onClick={() => router.push("/library")}>
                    <ArrowBackIos sx={{ fontSize: 24, color: 'white' }} />
                    Back To Library
                </Button>
            </div>

            <Textarea
                value={stackName}
                readOnly={true}
                onChange={(e) => setStackName(e.target.value)}
                placeholder="Stack name"
                rows={2}
                className="col-span-2 col-start-2 row-span-1 row-start-1 min-h-[auto] self-center text-center text-3xl md:text-3xl resize-none bg-black text-white border-2 border-white"
            />

            <div className="col-span-2 col-start-2 row-span-2 row-start-2">
                <TypographyP className="text-center mb-1">Card {index + 1} of {cards.length}</TypographyP>
                <StudyFlashcard
                    key={index}
                    card={cards[index]}
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
            <Button
                onClick={() => setIndex(i => i + 1)}
                className="row-start-2 row-span-2 col-start-4 col-span-1 w-fit h-fit self-center justify-self-center"
                variant={index !== cards.length - 1 ? "default" : "outline"}
                disabled={index === cards.length - 1}
                style={index === cards.length - 1 ? { opacity: 0.5, color: 'white' } : {}}
            >
                <ArrowForwardIcon sx={{ fontSize: 40, color: 'white' }} />
            </Button>
        </div>
    );
}
