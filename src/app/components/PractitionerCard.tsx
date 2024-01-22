import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import { Provider } from '@/@types';

interface Practitioner {
    name: string;
    specialization: string;
    image: string;
    availableSlots: string[];
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
                        {practitioner.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        title here
                    </Typography>
                </Box>
            </Box>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Specialization: {practitioner.specialization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Available: {practitioner.availableSlots.join(', ')}
                </Typography>
            </CardContent>
        </Card>

    );
};

export default PractitionerCard;
