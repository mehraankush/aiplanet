import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const heroData = [
    {
        title: 'AI model submissions',
        img: '/home/ai.png',
        count: '100k'
    },
    {
        title: 'Data Scientists',
        img: '/home/datascience.png',
        count: '50k'
    },
    {
        title: 'AI Challenges hosted',
        img: '/home/aichallenges.png',
        count: '100+'
    },
]



const HeroSection = () => {
    return (
        <section >
            <div className='bg-deepBlue'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex gap-5 py-[100px]'>
                        <div className='flex-1 flex flex-col  justify-center items-center space-y-3'>
                            <h1 className='text-5xl text-white font-extrabold border-l-4 border-goldenYellow pl-5'>
                                Accelerate Innovation with Global AI Challenges
                            </h1>
                            <p className='pl-5'>
                                AI Challenges at Dphi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.

                            </p>
                            <div className=' w-full pt-10 pl-5 ' >
                                <Link href={'/create'}>
                                    <Button
                                        variant="contained"
                                        className='bg-white text-deepBlue font-medium capitalize'
                                    >
                                        Create Challenge
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className='flex-1 flex justify-center items-center mt-10'>
                            <Image
                                src={'/home/rocket.png'}
                                alt='Hero Image'
                                width={1000}
                                height={1000}
                                className='w-[300px] h-[350px]'
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className='bg-darkBlue'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex gap-5 w-full py-[70px]'>
                        {
                            heroData.map((data, index) => (
                                <div key={index} className='flex flex-1  items-center gap-5 border-r  pl-[50px]'>
                                    <Image
                                        src={data.img}
                                        alt='Hero Image'
                                        width={100}
                                        height={100}
                                        className='w-10 h-10'
                                    />
                                    <div className='flex flex-col '>
                                        <h1 className='text-xl text-white font-extrabold'>
                                            {data.count}
                                        </h1>
                                        <p className='text-white text-sm'>
                                            {data.title}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </section>
    )
}

export default HeroSection