import React, { useContext, useState } from 'react'
import InputItem from './InputItem'
import { SourceContext } from '@/context/SourceContext'
import { DestinationContext } from '@/context/DestinationContext'
import CarListOptions from '../Cars/CarListOptions'

function Search() {

  const { source, setSource } = useContext(SourceContext)
  const { destination, setDestination } = useContext(DestinationContext)
  const [distance, setDistance] = useState<number>()

  const calculateDistance = () => {
    const dist = google.maps.geometry.spherical.computeDistanceBetween({ lat: source.lat, lng: source.lng }, { lat: destination.lat, lng: destination.lng })
    setDistance(dist * 0.000621374)
    // console.log(dist*0.000621374)
  }
  return (
    <div>
      <div className='border-2 rounded-md p-5'>
        <h2 className='font-bold text-2xl mb-3'>Get a ride</h2>
        <div className='gap-4'>
          <InputItem type="source" />
          <InputItem type="destination" />
        </div>
        <button className='w-full text-white bg-black rounded-md p-3 mt-1 font-light'
          onClick={() => calculateDistance()}
        >Search</button>
      </div>
      {distance ? <CarListOptions distance={distance}/> : null}
      {/* <CarListOptions distance={distance}/>  */}
    </div>
  )
}

export default Search
