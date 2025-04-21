import { createClient } from '@/utils/supabase/server';
import StudyClient from './StudyClient';

export default async function StudyPage({ params }: { params: { stack_id: string } }) {
    const supabase = await createClient();
    params = await params

    const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('stack_id', params.stack_id);

    if (error || !data) {
        return <div>Error loading flashcards</div>;
    }

    return <StudyClient flashcards={data} />;
}
