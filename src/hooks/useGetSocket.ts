import { useContext } from 'react';
import { ClientInfoProviderContext } from './../provider/ClientInfoProvider';
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client';
import { initSocket } from '../config/socket';
import { DefaultEventsMap, } from "@socket.io/component-emitter";
import { ACTIONS } from '../constants/Action';
import { useLocation, useParams } from 'react-router-dom';
import { Client } from '../model/Client';

export const useGetSocket = (setElementsData:any) => {
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    const { roomId } = useParams();
    const location = useLocation();
    const [clients, setClients] = useState<Client[]>([]);

    const userSet = useRef(new Set<string>()).current;

    const {activeClients, setClientInfo} = useContext(ClientInfoProviderContext);

    useEffect(() => {
        const init = async () => {

            console.log("establishing connection");

            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e:Error) {
                console.log('socket error', e);
             
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                userName: (location as any).state?.userName,
            });

            // Listening for joined event
            socketRef.current.on(
                ACTIONS.JOINED,
                ({ clients, userName, socketId  , elementsData}) => {
                    if (userName !== (location as any).state?.userName) {
                        if(!userSet.has(userName)){
                            console.log(`${userName} joined`);
                            userSet.add(userName);
                            setClientInfo?.((prevState)=>[...prevState , {socketId, userName}])
                        }
                    }else{
                        setElementsData(elementsData ?? [])
                    }
                    setClients(clients);
                }
            );

            socketRef.current.on(
                "on-newelements",
                ({ userName, elementsData }) => {
                   setElementsData(elementsData)
                }
            );
             // Listening for disconnected
             socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, userName }) => {
                    setClients((prev) => {
                        return prev?.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );
        };
        init();
        return () => {
            socketRef.current?.disconnect();
            socketRef.current?.off(ACTIONS.JOINED);
            socketRef.current?.off(ACTIONS.DISCONNECTED);
        };
    }, []);

    return {
        clients,
        roomId,
        socket:socketRef.current,
        userName: (location as any).state?.username,
    }
}
