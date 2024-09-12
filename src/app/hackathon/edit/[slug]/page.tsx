"use client"
import React, { useEffect, useState } from 'react'
import FormComponent from '@/components/core/CreateHackathon/FormComponent'
import { Hackathon, useHackathonStore } from '@/store/hackathonStore'

const Page = ({params}:{
    params: { slug: string }
}) => {
    const [hackathon, setHackathon] = useState<Hackathon | undefined>()
    const getHackahtonBySlug = useHackathonStore((state) => state.getHackahtonBySlug)


    useEffect(() => {
        const hackathon = getHackahtonBySlug(params.slug)
        console.log(hackathon)
        setHackathon(hackathon)
    }, [params.slug])

    return (
        <div className=' text-black min-h-screen'>
            <div className='bg-surface100 p-10'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-3xl font-semibold'>Edit Challenge Details</h1>
                </div>
            </div>

            <div className='max-w-7xl mx-auto'>
                <FormComponent 
                    hackathon={hackathon}
                />
            </div>
        </div>
    )
}

export default Page