'use client'
import MapSection from "@/components/Map/MapSection";
import Search from "@/components/Search/Search";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";

// const lib = process.env.REACT_APP_GOOGLE_LIBS
const lib=['places']

export default function Home() {
  //page number
  const [source, setSource] = useState<any>()
  const [destination, setDestination] = useState<any>()

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      <SourceContext.Provider value={{ source, setSource }}>
        <LoadScript libraries={lib as any} googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <Search />
            </div>
            <div className="order-first md:order-last md:col-span-2">
              <MapSection />
            </div>
          </div>
        </LoadScript>
      </SourceContext.Provider>
    </DestinationContext.Provider>
  )
}
