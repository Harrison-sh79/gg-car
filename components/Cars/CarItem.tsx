import Image from 'next/image'
import React from 'react'
import { HiUser } from "react-icons/hi";

function CarItem({ car, distance }: any) {
  return (
    <div>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex flex-col lg:flex-row items-center gap-1 md:gap-3'>
          <Image src={car.image} alt={car.desc} width={100} height={100} />
          <div>
            <h2 className='font-semibold text-sm flex gap-2 lg:text-lg'>
              {car.name}
              <span className='flex items-center gap-1/2 text-xs lg:text-sm'>
                <HiUser />
                {car.seat}
              </span>
            </h2>
            <p className='font-light text-sm'>{car.desc}</p>
          </div>
        </div>

        <h2 className='font-semibold'>${(car.amount * distance).toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default CarItem
