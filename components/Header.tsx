import React from 'react'
import { UserButton } from "@clerk/nextjs";
import Image from 'next/image';

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: 'Ride',
      image: '/taxi.png'
    },
    {
      id: 2,
      name: 'Package',
      image: '/box.png'
    },
  ]
  return (
    <div className='flex justify-between items-center p-1 px-8 border-b-2 shadow-sm'>
      <Image src="/uber_logo.png" alt='logo' width={80} height={80} />
      <div className='hidden md:flex items-center justify-center gap-20'>
        {headerMenu.map((header, index) => (
          <div key={index} className='flex justify-center items-center'>
            <Image src={header.image} alt={header.name} width={17} height={17} className='w-auto h-auto' />
            <h2 className='text-sm ml-2'>{header.name}</h2>
          </div>

        ))}
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Header
