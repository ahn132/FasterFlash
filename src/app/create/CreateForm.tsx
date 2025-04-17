'use client'

import { useState } from "react";
import {Flashcard} from "@/types/flashcard";
import NewFlashcard from "@/app/create/NewFlashcard";

export default function CreateForm() {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [nextID, setNextID] = useState(1);
    const [inputLanguage, setInputLanguage] = useState('English');

    const changeInputLanguage = () => {
        if (inputLanguage === 'English') {
            setInputLanguage('Korean')
        }
        else {
            setInputLanguage('English');
        }
    }

    const addCard = () => {
        setCards(prev => [
            ...prev,
            { id: nextID, front: "", back: "" }
        ]);
        setNextID(nextID => nextID + 1)
    };

    const updateCard = (id: number, changes: Partial<Flashcard>) => {
        setCards(prev =>
            prev.map(card =>
                card.id == id ? { ...card, ...changes } : card
            )
        );
    };

    const deleteCard = (id: number) => {
        setCards(prev => prev.filter(card => card.id !== id));
    };

    return (
        <div className="max-w-xl mx-auto">
            <button onClick = {changeInputLanguage}>Input Language: {inputLanguage}</button>
            <button onClick={addCard} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                + Add Flashcard
            </button>

            {cards.map(card => (
                <NewFlashcard
                    key={card.id}
                    card={card}
                    onUpdate={updateCard}
                    onDelete={deleteCard}
                />
            ))}
        </div>
    );
}
