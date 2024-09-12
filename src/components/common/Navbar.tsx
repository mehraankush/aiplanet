import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-white'>
            <div className='max-w-7xl mx-auto'>
                <Link href={'/'}>
                    <Image
                        alt='Logo'
                        width={100}
                        height={100}
                        src={'/logo.svg'}
                        className='h-[50px] w-[50px]'
                    />
                </Link>

            </div>
        </nav>
    )
}

export default Navbar