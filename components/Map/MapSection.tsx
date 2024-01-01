import React, { useContext, useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api'
import { SourceContext } from '@/context/SourceContext'
import { DestinationContext } from '@/context/DestinationContext'

function MapSection() {
  const { source, setSource } = useContext(SourceContext)
  const { destination, setDestination } = useContext(DestinationContext)
  const containerStyle = {
    width: '100%',
    height: window.innerHeight * 0.85,
    borderRadius: 8
  }

  const [center, setCenter] = React.useState({
    lat: -3.745,
    lng: -38.523
  })

  // const { isLoaded } = useJsApiLoader({
  //   id: 'google-map-script',
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
  // })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  useEffect(() => {
    if (source && map) {

      // map.panTo({
      //   lat: source.lat,
      //   lng: source.lng
      // })

      setCenter({
        lat: source.lat,
        lng: source.lng
      })
    }

    if(source && destination){
      directionRoute()
    }
  }, [source])

  useEffect(() => {
    if (destination && map) {
      setCenter({
        lat: destination.lat,
        lng: destination.lng
      })
    }

    if(source && destination){
      directionRoute()
    }

  }, [destination])

  //draw route in google map
  const [directionRoutePoints, setDirectionRoutePoints] = useState([])
  const directionRoute = ()=>{
    const DirectionService = new google.maps.DirectionsService()
    DirectionService.route({
      origin: {lat: source.lat, lng: source.lng},
      destination: {lat:destination.lat, lng:destination.lng},
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status)=>{
      if(status === 'OK'){
        setDirectionRoutePoints(result as any )
      }else{
        console.error('Google Map get Error in DirectionRoute')
      }
    })
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      // onLoad={onLoad}
      onLoad={(map: any) => setMap(map)}
      onUnmount={onUnmount}
      options={{
        mapId: '97ac429ce62b1d9c'
      }}
    >
      { /* Child components, such as markers, info windows, etc. */}
      {source ? (<MarkerF
        position={{ lat: source.lat, lng: source.lng }}
        icon={{
          url: '/source.png',
          scaledSize: {
            width: 20,
            height: 20,
            equals: () => { return true }
          }
        }}
      >
        <OverlayViewF position={{ lat: source.lat, lng: source.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='p-2 bg-white inline-block'><p className='font-bold text-xs'>{source.label}</p></div>
        </OverlayViewF>
      </MarkerF>) : null}
      {destination ? (<MarkerF
        position={{ lat: destination.lat, lng: destination.lng }}
        icon={{
          url: '/destination.png',
          scaledSize: {
            width: 20,
            height: 20,
            equals: () => { return true }
          }
        }}
      >
        <OverlayViewF position={{ lat: destination.lat, lng: destination.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <div className='p-2 bg-white inline-block'><p className='font-bold text-xs'>{destination.label}</p></div>
        </OverlayViewF>
      </MarkerF>) : null}
      <DirectionsRenderer 
      directions={directionRoutePoints as any}
      options={{
        suppressMarkers: true,
        polylineOptions:{
          strokeColor: '#000',
          strokeWeight: 4
        }
      }}
      />
    </GoogleMap>
  )
}

export default MapSection
