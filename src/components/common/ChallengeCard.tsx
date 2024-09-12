import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Button } from '@mui/material';
import { CheckCircle } from 'lucide-react';
import { Hackathon } from '@/store/hackathonStore';
import HackathonCard from './TimerComponent';

interface ChallengeCardProps {
    hackathon: Hackathon;
}

export default function ChallengeCard({ hackathon }: ChallengeCardProps) {

    return (
        <Card data-id={hackathon.slug} sx={{ maxWidth: 345 }} className='rounded-md pb-2'>
            <CardActionArea>
                <div style={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                        component="img"
                        image={hackathon.image || "/hackathon/1.jpg"}
                        alt={hackathon.name || "Hackathon"}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <CardContent className='flex justify-center flex-col'>
                    <div className='flex justify-center'>
                        <p className='text-center bg-transparentYellow rounded-md p-1 px-2 text-sm'>Upcoming</p>
                    </div>
                    <div className='flex justify-center pt-3'>
                        <p className='text-lg text-center font-semibold'>{hackathon.name}</p>
                    </div>

                    <div className='text-center my-5'>
                        <p>Starts In:</p>
                        <HackathonCard
                            startTime={hackathon.startDate}
                          />
                    </div>
                    <div className='flex justify-center'>
                        <Button
                            className='bg-green-600 text-white capitalize font-semibold rounded-md flex gap-2 p-2 px-5'
                        >
                            <CheckCircle size={15} /> Participate In
                        </Button>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
