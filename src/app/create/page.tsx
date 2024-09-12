"use client"
import React from 'react'
import FormComponent from '@/components/core/CreateHackathon/FormComponent'

const page = () => {
  return (
      <div className=' text-black min-h-screen'>
          <div className='bg-surface100 p-10'>
              <div className='max-w-7xl mx-auto'>
                  <h1 className='text-3xl font-semibold'>Challenge Details</h1>
              </div>
          </div>

          <div className='max-w-7xl mx-auto'>
              <FormComponent />
          </div>
      </div>
  )
}

export default page