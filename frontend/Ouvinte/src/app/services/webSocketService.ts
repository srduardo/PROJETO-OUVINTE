const WEBSOCKET_URL = 'ws://172.20.10.5:8080/ws';

export const useWebSocket = (handleComplaint: (message: string) => void) => {
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
        socket.send('Solicitação...');
        console.log('WebSocket conectado!');
    }

    socket.onmessage = (event) => {
        handleComplaint(event.data);
        console.log(event.data);
    };

    socket.onerror = (error) => {
        console.log('Erro:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket desconectado!');
    }

    const close = () => socket.close();

    return {close};
}