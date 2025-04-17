import {NewFlashCardProps} from "@/types/flashcard";
import axios from "axios";

export default function NewFlashcard(props: NewFlashCardProps) {

    const getTranslation = () => {
        axios.post("/api/translate", {
            input: props.card.front
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error);
        })
    }


    return (
        <div className="border p-4 my-2 rounded">
            <input
                value={props.card.front}
                onChange={(e) => props.onUpdate(props.card.id, { front: e.target.value })}
                placeholder="Front"
                className="block w-full mb-2"
                onBlur={getTranslation}
            />
            <input
                value={props.card.back}
                onChange={(e) => props.onUpdate(props.card.id, { back: e.target.value })}
                placeholder="Back"
                className="block w-full"
            />
            <button onClick={() => props.onDelete(props.card.id)} className="mt-2 text-red-500">Delete</button>
        </div>
    );
}
