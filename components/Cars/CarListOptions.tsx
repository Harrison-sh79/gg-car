
import { CarListData } from '@/utils/CarListData'
import React, { useState } from 'react'
import CarItem from './CarItem'
import { useRouter } from 'next/navigation'

function CarListOptions({ distance }: any) {
  const [activeIndex, setActiveIndex] = useState<number>()
  const [selectedCar, setSelectedCar] = useState<any>()
  const router = useRouter()
  return (
    <div className='mt-2 p-5'>
      <div className='mb-5'>
        <h2 className='font-bold text-xl'>Recommended</h2>
      </div>
      <div className='mt-2 overflow-auto h-64 scroll-smooth border shadow-sm rounded-md'>
        {
          CarListData.map((car, index) => (
            <div key={index} className={`cursor-pointer p-2 border-black rounded-md
          ${activeIndex == index ? 'border-2' : null}`}
              onClick={() => {
                setActiveIndex(index)
                setSelectedCar(car)
              }}
            >
              <CarItem car={car} distance={distance} />
            </div>)

          )
        }

      </div>
      {selectedCar ? (
        <div className='flex fixed left-6 right-5 bottom-5 bg-white p-3 
        shadow-md justify-between w-[87%] md:w-[30%] border items-center'>
          <h2 className='text-xs lg:text-sm'>Make Payment For</h2>
          <button className='bg-black text-white p-3 rounded-md text-center text-xs lg:text-sm'
            onClick={()=>{
              router.push('/payment?amount=' + (selectedCar.amount * distance).toFixed(2))
            }}
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default CarListOptions
