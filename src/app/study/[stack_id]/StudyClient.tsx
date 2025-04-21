'use client';

import { useState } from 'react';

export default function StudyClient({ flashcards }: { flashcards: any[] }) {
    const [index, setIndex] = useState(0);

    if (flashcards.length === 0) {
        return <p>No flashcards found.</p>;
    }

    const card = flashcards[index];

    return (
        <div>
            <h2>Flashcard {index + 1} / {flashcards.length}</h2>
            <p><strong>Front:</strong> {card.front}</p>
            <p><strong>Back:</strong> {card.back}</p>

            <button
                disabled={index === flashcards.length - 1}
                onClick={() => setIndex(index + 1)}
            >
                Next
            </button>
        </div>
    );
}