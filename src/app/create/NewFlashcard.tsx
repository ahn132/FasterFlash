import {NewFlashCardProps} from "@/types/flashcard";
import axios from "axios";
import {useRef, useState} from "react";
import {Card, CardContent} from "@/components/ui/card"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Spinner} from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import {motion} from "motion/react"

const MotionCard = motion(Card)

export default function NewFlashcard(props: NewFlashCardProps) {
    const [prevTranslAttempt, setPrevTranslAttempt] = useState("")
    const [isFront, setIsFront] = useState(true)
    const [loading, setLoading] = useState(false)

    //get automatic translation and put it on back-side of card
    const getTranslation = () => {
        setPrevTranslAttempt(props.card.front)
        axios.post("/api/translate", {
            input: props.card.front
        }).then(response => {
            props.onUpdate(props.card.index, { back: response.data.translations})
            console.log(response.data.translations);
            setLoading(false)
        }).catch(error => {
            console.log(error);
        })
    }

    //flip the card and possibly translate it
    const handleFlip = () => {
        if (isFront) {
            setIsFront(false)

            //Don't translate if already translated and no changes were made...or auto-translate is disabled
            if (prevTranslAttempt === props.card.front || !props.autoTranslate) {
                return
            }
            else {
                setLoading(true)
                getTranslation()
            }
        }
        else {
            setIsFront(true)
        }
    };

    const handleDelete = () => {
        props.onDelete(props.card.index)
    }

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
                        onChange={(e) => props.onUpdate(props.card.index, { front: e.target.value })}
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
                    {loading ? (
                        <Spinner />
                    ) : (
                        <Textarea
                            value={props.card.back}
                            onChange={(e) => props.onUpdate(props.card.index, { back: e.target.value })}
                            placeholder="Back"
                            className="resize-none border-none text-center p-20 text-3xl md:text-3xl w-full h-full scrollbar-hide"
                        />
                    )}
                </div>
            </motion.div>

            <Button onClick={handleFlip}>
                {isFront ? 'FLIP TO BACK' : 'FLIP TO FRONT'}
            </Button>
            <Button onClick={handleDelete} variant={props.card.index !== 0 ? "default" : "outline" } disabled={props.card.index === 0}>
                DELETE CARD
            </Button>
        </div>
    )
}
