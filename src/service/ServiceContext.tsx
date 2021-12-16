import React, {
  useContext, 
  useEffect, 
  useRef 
} from 'react'
 
  // marker
const SERVICE_MARK = Symbol();
  // https://stackoverflow.com/questions/53696873/how-to-make-a-marker-interface-or-something-similar
  // https://michalzalecki.com/nominal-typing-in-typescript/#approach-2-brands
export interface Service {
  [SERVICE_MARK]: never
} 

type ServiceMap = Record<string, Service>

const ServiceContext = React.createContext<ServiceMap | undefined>(undefined) 

export const useService = (name: string): Service  =>  {
  const map: ServiceMap = useContext(ServiceContext)
  if (!(name in map)) {
    throw new Error('useService(): service not found')
  }
  return map[name] 
}

export const ServiceProvider: React.FC<{
  map: ServiceMap
}> = ({ 
  children,
  map
}) => {
  
  const mapRef = useRef<ServiceMap>(map)

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
        // Anything in here is fired on component unmount.
      for (let [key, value] of Object.entries(mapRef.current)) {
        if (SERVICE_MARK in value && 'disposer' in value) {
          (value as any).disposer()
        }
      }
    }
  }, [])
  
  return (
    <ServiceContext.Provider value={mapRef.current}>
      {children}
    </ServiceContext.Provider>
  )
}
