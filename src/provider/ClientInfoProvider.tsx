import React, { useMemo, useState } from 'react';
import { Client } from '../model/Client';

type ClientInfoProviderProviderContextType = {
    activeClients:Client[],
    setClientInfo:React.Dispatch<React.SetStateAction<Client[]>> | null; 
}
export const ClientInfoProviderContext = React.createContext<ClientInfoProviderProviderContextType>({
    activeClients:[],
    setClientInfo:null
})
export const ClientInfoProvider = (props:{children: React.ReactNode}) => {

  const [activeClients, setClientInfo] = useState<Client[]>([]);
  const clientContext = useMemo(()=>({activeClients , setClientInfo}),[activeClients])

  return (
    <ClientInfoProviderContext.Provider value = {clientContext}>
        {props.children}
    </ClientInfoProviderContext.Provider>
  )
}
