package com.ouvinte.backend.services.webSocket;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ouvinte.backend.dto.response.ComplaintResponseDto;
import com.ouvinte.backend.services.ComplaintService;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class CustomWebSocketHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    private ObjectMapper objectMapper;

    private final ComplaintService complaintService;


    public CustomWebSocketHandler(ObjectMapper objectMapper, ComplaintService complaintService) {
        this.objectMapper = objectMapper;
        this.complaintService = complaintService;
    }
   
    @Override
    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("WebSocket conectado (Back-End)");
    }

    @Override
    public void afterConnectionClosed(@NonNull WebSocketSession session, @NonNull CloseStatus status) throws Exception {
        sessions.remove(session);
        System.out.println("WebSocket desconectado (Back-End)");
    }
    
    @Override
    protected void handleTextMessage(@NonNull WebSocketSession session, @NonNull TextMessage message) throws Exception {
        String payload = message.getPayload();
        List<ComplaintResponseDto> complaintList = complaintService.findAllComplaints();
        System.out.println("Mensagem recebida: " + payload);
        System.out.println("Quantidade de denúncias existentes: " + complaintList.size());
        broadcast(complaintList);
    }

    public void broadcast(List<ComplaintResponseDto> complaints) throws Exception {
        String response = objectMapper.writeValueAsString(complaints);
        System.out.println("Broadcast acessado.");

        for (WebSocketSession session : sessions) {
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(response));
            }
        }
    }


}