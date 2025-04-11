import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef} from 'react';
import { getJWT } from './storageService';

const WEBSOCKET_URL = 'ws://192.168.18.3:8080/ws';

export const useWebSocket = async (handleComplaint: (message: string) => void) => {
    const socket = useRef<WebSocket | null>(null);
    const token: string = await getJWT('JWT');
    const query: string = `${WEBSOCKET_URL}?token=${token}`;

    if (!token) {
        console.warn('Token não coletado');
        return;
    }

    useEffect(() => {
        socket.current = new WebSocket(query);

        socket.current.onmessage = (event) => {
            console.log('Mensagem recebida:', event.data);
            handleComplaint(event.data);
        };

        socket.current.onerror = (error) => {
            console.log('Erro:', error);
        };

        socket.current.onclose = () => {
            console.log('WebSocket desconectado');
        };

        return () => {
            if (socket.current) {
                socket.current.close();
            }
        }
    }, [handleComplaint]);

    return socket.current;
}