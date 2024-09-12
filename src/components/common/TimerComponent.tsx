"use client"
import React, { useState, useEffect } from 'react';

const HackathonTimer = ({ startDate }: { startDate: string | Date }) => {
    const calculateTimeLeft = () => {
        const now = new Date();
        const start = new Date(startDate);
        const difference = start.getTime() - now.getTime();

        if (difference <= 0) {
            return null;
        }

        const timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [startDate]);

    if (!timeLeft) {
        return <div>The event has started!</div>;
    }

    return (

        <div className='font-semibold'>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>

    );
};

interface Hackathon {
    startTime: string | Date;
}

const HackathonCard = ({
    startTime
}: Hackathon) => {

    const hackathon = {
        startDate: startTime ?? '2024-10-01T05:30:00+05:30',
    };

    return (
        <div className='font-semibold'>
            <HackathonTimer startDate={hackathon.startDate} />
        </div>
    );
};

export default HackathonCard;
