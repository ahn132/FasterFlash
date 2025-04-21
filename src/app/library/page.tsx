'use client';

import {useEffect, useState} from 'react';
import {createClient} from "@/utils/supabase/client"
import {FlashCardSetBasic} from "@/types/flashcard";
import {
    Container,
    Typography,
    TextField,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [stacks, setStacks] = useState<FlashCardSetBasic[]>([]);

    const filteredStacks = stacks.filter(stack =>
        stack.stack_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const loadStacks = async () => {
            const {
                data: {user}
            } = await supabase.auth.getUser()

            const { data, error } = await supabase
                .from('flashcard_sets')
                .select('stack_name, stack_id')
                .eq('user_id', user!.id)
            if (!error) {
                console.log(data)
                setStacks(data)
            }
        };

        loadStacks();
    }, []);

    return (
        <Container maxWidth="lg" sx={{py: 4}}>
            <Typography variant="h4" component="h1" gutterBottom>
                Your Library
            </Typography>

            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search your sets"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{mb: 4}}
            />

            <Grid container spacing={3}>
                {filteredStacks.map((set) => (
                    <Grid key={set.stack_id}>
                        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{flexGrow: 1}}>
                                <Typography variant="h6" component="h2">
                                    {set.stack_name}
                                </Typography>
                                <Typography color="text.secondary">
                                    {"DUMMY DESCRIPTION"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Last modified: {"DUMMY MODIFIED DATE"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => router.push(`/study/${set.stack_id}`)}>Study</Button>
                                <IconButton size="small">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton size="small">
                                    <DeleteIcon/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
