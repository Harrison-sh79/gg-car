import { CarListData } from '@/utils/CarListData'
import React, { useState } from 'react'
import CarItem from './CarItem'

function CarListOptions({ distance }: any) {
  const [activeIndex, setActiveIndex] = useState<number>()
  return (
    <div className='mt-2 p-5'>
      <div className='mb-5'>
        <h2 className='font-bold text-xl'>Recommended</h2>
      </div>
      <div className='mt-2 overflow-auto h-64 scroll-smooth'>
        {
          CarListData.map((car, index) => (
            <div key={index} className={`cursor-pointer p-2 border-black rounded-md
          ${activeIndex == index ? 'border-2' : null}`}
              onClick={() => setActiveIndex(index)}
            >
              <CarItem car={car} distance={distance} />
            </div>)

          )
        }
      </div>
    </div>
  )
}

export default CarListOptions
