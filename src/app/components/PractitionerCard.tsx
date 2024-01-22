import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { Provider } from '@/@types';
import { SlotButtonList } from './SlotButtonList';

interface Practitioner {
    name: string;
    title: string;
    bio: string;
    specialization: string;
    image: string;
    phone: string;
    user: object;
    slots: object[];
}

interface PractitionerCardProps {
    practitioner: Practitioner;
}

// const PractitionerCard = ({ practitioner  }) => {
const PractitionerCard: React.FC<PractitionerCardProps> = ({ practitioner }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', borderRadius: '5%', m: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'start', p: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ width: 60, height: 60, borderRadius: '50%', mr: 2 }}
                    image={practitioner.image}
                    alt={practitioner.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h5" component="div">
                        {practitioner.user?.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {practitioner.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {practitioner.specialization}
                    </Typography>
                </Box>
            </Box>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {practitioner.bio}
                </Typography>
                {practitioner.slots && practitioner.slots.length === 0 && (
                    <>
                        <Typography variant="body2" color="text.secondary">
                            No Available Slots
                        </Typography>
                    </>
                )}

                {practitioner.slots && practitioner.slots.length > 0 && (
                    <>
                        <Typography variant="body2" color="text.secondary">
                            Available Slots
                        </Typography>
                        <SlotButtonList slots={practitioner.slots} />
                    </>
                )}


            </CardContent>
        </Card>

    );
};

export default PractitionerCard;
