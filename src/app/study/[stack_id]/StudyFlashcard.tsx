import {NewFlashCardProps, StudyFlashCardProps} from "@/types/flashcard";
import axios from "axios";
import {useRef, useState} from "react";
import {Card, CardContent} from "@/components/ui/card"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Spinner} from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import {motion} from "motion/react"

const MotionCard = motion(Card)

export default function StudyFlashcard(props: StudyFlashCardProps) {

    const [isFront, setIsFront] = useState(true)


    //flip the card
    const handleFlip = () => {
        if (isFront) {
            setIsFront(false)
        }
        else {
            setIsFront(true)
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full h-full" style={{ perspective: 1000 }}>
            <motion.div
                animate={{ rotateX: isFront ? 0 : 180 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full rounded-xl border-2"
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* FRONT */}
                <div className="absolute w-full h-full p-0 items-center justify-center flex backface-hidden">
                    <Textarea
                        value={props.card.front}
                        readOnly={true}
                        placeholder="Front"
                        className="resize-none border-none text-center p-20 text-3xl md:text-3xl w-full h-full scrollbar-hide"
                    />
                </div>

                {/* BACK */}
                <div
                    className="absolute w-full h-full p-0 items-center justify-center flex backface-hidden"
                    style={{
                        transform: 'rotateX(180deg)',
                    }}
                >
                    <Textarea
                        value={props.card.back}
                        readOnly={true}
                        placeholder="Back"
                        className="resize-none border-none text-center p-20 text-3xl md:text-3xl w-full h-full scrollbar-hide"
                    />
                </div>
            </motion.div>

            <Button onClick={handleFlip}>
                {isFront ? 'FLIP TO BACK' : 'FLIP TO FRONT'}
            </Button>
        </div>
    )
}
