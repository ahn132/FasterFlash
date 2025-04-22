import {NewFlashCardProps} from "@/types/flashcard";
import axios from "axios";
import {useRef, useState} from "react";
import {Card, CardContent} from "@/components/ui/card"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {Spinner} from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

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
            props.onUpdate(props.card.id, { back: response.data.translations})
            console.log(response.data.translations);
            setLoading(false)
        }).catch(error => {
            console.log(error);
        })
    }

    //flip the card and possibly translate it
    const handleClick = () => {
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

    if (isFront) {
        return (
            <div className="flex flex-col gap-2 w-full h-full">
                <Card className="p-0 w-full h-full items-center justify-center">
                    <Textarea
                        value={props.card.front}
                        onChange={(e) => props.onUpdate(props.card.id, { front: e.target.value })}
                        placeholder="Front"
                        className="resize-none border-none text-center p-20 text-3xl md:text-3xl"
                    />
                </Card>
                <Button onClick={handleClick}>FLIP TO BACK</Button>
            </div>

        )
    }
    else {
        return (
            <div className="flex flex-col gap-2 w-full h-full">
                <Card className="p-0 w-full h-full items-center justify-center">
                    {loading ?
                        <Spinner className=""/> :
                        <Textarea
                            value={props.card.back}
                            onChange={(e) => props.onUpdate(props.card.id, { back: e.target.value })}
                            placeholder="Back"
                            className="resize-none border-none text-center p-20 text-3xl md:text-3xl"
                        />
                    }
                </Card>
                <Button onClick={handleClick}>FLIP TO FRONT</Button>
            </div>

        )
    }
}
