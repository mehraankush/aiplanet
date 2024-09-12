"use client"
import React, { useEffect, useState } from 'react'
import { AlignEndHorizontal, Clock } from 'lucide-react'
import { Hackathon, useHackathonStore } from '@/store/hackathonStore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'



const Page = ({ params }: {
    params: { id: string }
}) => {
    const [hackathon, setHackathon] = useState<Hackathon | undefined>()
    const getHackahtonBySlug = useHackathonStore((state) => state.getHackahtonBySlug)
    const deleteHackathon = useHackathonStore((state) => state.deleteHackathon)
    const router = useRouter()


    useEffect(() => {
        const hackathon = getHackahtonBySlug(params.id)
        console.log(hackathon)
        setHackathon(hackathon)
    }, [params.id])

    const handleEdit = () => {
        router.push(`/hackathon/edit/${hackathon?.slug}`)
    }
    const handleDelete = (id:string) => {
        if(!confirm('Are you sure you want to delete this hackathon?')) return
        deleteHackathon(id)
        toast.success('Hackathon Deleted')
        router.push('/')
    }
    console.log(hackathon?.startDate)
    return (
        <div className=' text-black min-h-screen '>
            <div
                className="bg-[url('/hackathon/background.png')] bg-cover bg-no-repeat bg-blue-500 py-[100px]"
            >
                <div className='max-w-7xl mx-auto text-white'>
                    <div className='flex justify-start text-black '>
                        <div className='bg-goldenYellow flex gap-2 rounded-md p-1 text-sm px-5 items-center'>
                            <Clock size={15} />
                            <p>{hackathon?.startDate as string}</p>
                        </div>
                    </div>
                    <h1 className='text-4xl font-semibold py-8'>{hackathon?.name}</h1>
                    <p className='text-sm'>{hackathon?.description}</p>

                    <div className='flex justify-start text-black'>
                        <div className='flex gap-2 rounded-md bg-white p-2 items-center px-5  mt-5'>
                            <AlignEndHorizontal size={15} /> <p className='text-sm'>{hackathon?.level}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-b shadow-lg'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex justify-between'>
                        <p className='border-b-4 border-greenVariant font-medium mt-5 cursor-pointer'>Overview</p>
                        <div className='flex gap-2 text-sm py-3'>
                            <button
                                className='rounded-md  bg-greenVariant text-white px-5 py-1'
                                onClick={handleEdit}
                            >Edit
                            </button>
                            <button 
                            className='rounded-md border border-greenVariant text-greenVariant px-3 py-1'
                            onClick={() => handleDelete(hackathon?.id as string)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           

            <div className='max-w-7xl mx-auto '>
                <div className='text-lg font-medium text-gray300 space-y-3 text-left w-4/5 mt-10'>
                    <p>
                        Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word Lepidoptera means scaly wings in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.
                    </p>
                    <p>
                        An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.

                    </p>
                    <p>
                        Your Task is to build an Image Classification Model using CNN that classifies to which class of weather  each image belongs to.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Page