'use client'
import { DestinationContext } from '@/context/DestinationContext'
import { SourceContext } from '@/context/SourceContext'
import Image from 'next/image'
import React, { useState, useEffect, useContext } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function InputItem({ type }: any) {
  const [value, setValue] = useState<any>(null)
  const [placeholder, setPlaceholder] = useState<any>()
  const {source, setSource} = useContext(SourceContext)
  const {destination, setDestination} = useContext(DestinationContext)

  useEffect(() => {
    if (type == 'source') {
      setPlaceholder('Pick up location')
    }else{
      setPlaceholder('Drop off location')
    }
  
  }, [])
  
  const getLatAndLng = (place:any, type:string)=>{
    const placeId = place.value.place_id
    const service = new google.maps.places.PlacesService(document.createElement('div'))
    service.getDetails({placeId}, (place, status)=>{
      if(status === 'OK' && place?.geometry && place.geometry.location){
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
        if(type === 'source'){
          setSource({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          })
        }else{
          setDestination({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name: place.formatted_address,
            label: place.name
          })
        }
      }
    })
  }

  return (
    <div className='flex bg-slate-200 p-3 items-center rounded-md gap-5 my-2'>
      <Image src={type == "source" ? "/source.png" : "/destination.png"} alt={type == "source" ? "source" : "destination"} width={15} height={15} />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange:(place)=>{ 
            getLatAndLng(place,type)
            setValue(place)
          },
          placeholder: placeholder,
          isClearable: true,
          className: 'w-full',
          components: {
            DropdownIndicator: false as any
          },
          styles: {
            control: (provided)=>({
              ...provided,
              backgroundColor: 'transparent',
              padding: '1px',
              outline: 'none',
              border:'none'
            })
          }
        }} />
    </div>
  )
}

export default InputItem
