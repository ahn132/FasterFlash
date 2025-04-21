import {NewFlashCardProps} from "@/types/flashcard";
import axios from "axios";
import {useRef, useState} from "react";
import {Card, TextField} from "@mui/material";

export default function NewFlashcard(props: NewFlashCardProps) {
    const [prevTranslAttempt, setPrevTranslAttempt] = useState("")
    const [isFront, setIsFront] = useState(true)
    const [loading, setLoading] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

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

    //flip the card if the card/text is in focus and the user clicks on the card/text
    const handleClick = () => {
        if (isFocused) {
            if (isFront) {
                setIsFront(false)

                //Don't translate if already translated and no changes were made
                if (prevTranslAttempt === props.card.front) {
                    console.log("EARLY RETURN")
                    return
                }
                else {
                    console.log("TRANSLATING")
                    console.log(prevTranslAttempt)
                    setLoading(true)
                    getTranslation()
                }
            }
            else {
                setIsFront(true)
            }
        }
    };

    if (isFront) {
        return (
            <Card variant="outlined" raised={true}>
                <TextField
                    value={props.card.front}
                    onChange={(e) => props.onUpdate(props.card.id, { front: e.target.value })}
                    placeholder="Front"
                    onMouseDown={handleClick}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    multiline={true}
                    fullWidth={true}
                    rows={5}
                    sx={{
                        height: '100%',

                        '& .MuiInputBase-root': {
                            height: '100%',
                            padding: 0,
                            alignItems: 'flex-start',
                        },

                        '& .MuiInputBase-inputMultiline': {
                            height: '100% !important',
                            overflow: 'auto',
                            padding: '8px',
                            textAlign: 'center', // ✅ this centers the text
                        },
                    }}
                />
            </Card>

        )
    }
    else {
        return (
            <Card variant="outlined" raised={true}>
                {loading ?
                    <p>Loading</p> :
                    <TextField
                        value={props.card.back}
                        onChange={(e) => props.onUpdate(props.card.id, { back: e.target.value })}
                        placeholder="Back"
                        onMouseDown={handleClick}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        multiline={true}
                        rows={5}
                        fullWidth={true}
                        sx={{
                            height: '100%',

                            '& .MuiInputBase-root': {
                                height: '100%',
                                padding: 0,
                                alignItems: 'flex-start',
                            },

                            '& .MuiInputBase-inputMultiline': {
                                height: '100% !important',
                                overflow: 'auto',
                                padding: '8px',
                                textAlign: 'center', // ✅ this centers the text
                            },
                        }}
                    />
                }

            </Card>
        )
    }
}
