import React from 'react'
import Image from 'next/image'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';

const challenge = [
    {
        img: '/challenges/skill.svg',
        title: "Prove your skills",
        description: 'Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions.'
    },
    {
        img: '/challenges/people.svg',
        title: "Learn from community",
        description: 'One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.'
    },
    {
        img: '/challenges/bot.svg',
        title: "Challenge yourself",
        description: 'There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.'
    },
    {
        img: '/challenges/earn.svg',
        title: "Earn recognition",
        description: 'You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.'
    },
]

const Challenges = () => {
    return (
        <section className='bg-white text-black py-[100px] '>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-center text-3xl font-semibold'>Why Participate in <span className='text-greenVariant'>AI Challenges?</span> </h2>

                <div className='grid grid-cols-2 gap-y-10 mt-[50px] justify-items-center '>
                    {
                        challenge.map((item, index) => (
                            <Card key={index} className='flex flex-col  gap-5 p-10 shadow-none w-[480px] bg-surface100 rounded-md'>
                                <CardMedia>
                                    <Image
                                        src={item.img}
                                        alt='Hero Image'
                                        width={100}
                                        height={100}
                                        className='w-10 h-10'
                                    />
                                </CardMedia>
                                <CardContent>
                                    <div className='flex flex-col space-y-2'>
                                        <h1 className='text-xl font-extrabold'>
                                            {item.title}
                                        </h1>
                                        <p className='text-base text-gray-500 '>
                                            {item.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Challenges