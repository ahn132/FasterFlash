export type Flashcard = {
    id: number;
    front: string;
    back: string;
};

export interface NewFlashCardProps {
    card: Flashcard;
    onUpdate: Function;
    onDelete: Function;
}