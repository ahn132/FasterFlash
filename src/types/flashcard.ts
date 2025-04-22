export type Flashcard = {
    id: number;
    front: string;
    back: string;
};

export interface NewFlashCardProps {
    card: Flashcard;
    onUpdate: Function;
    onDelete: Function;
    autoTranslate: boolean;
}

export interface FlashCardSetBasic {
    stack_id: number;
    stack_name: string;
}