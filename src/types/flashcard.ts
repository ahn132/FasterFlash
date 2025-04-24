export type Flashcard = {
    index: number;
    front: string;
    back: string;
};

export interface NewFlashCardProps {
    card: Flashcard;
    onUpdate: Function;
    onDelete: Function;
    autoTranslate: boolean;
}

export interface StudyFlashCardProps {
    card: Flashcard;
}

export interface FlashCardSetBasic {
    stack_id: number;
    stack_name: string;
}