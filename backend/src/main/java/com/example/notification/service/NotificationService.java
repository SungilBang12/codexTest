package com.example.notification.service;

import com.example.notification.model.NotificationPayload;
import com.example.notification.websocket.NotificationWebSocketHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;

@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationWebSocketHandler webSocketHandler;
    private final ObjectMapper objectMapper;

    public NotificationService(NotificationWebSocketHandler webSocketHandler, ObjectMapper objectMapper) {
        this.webSocketHandler = webSocketHandler;
        this.objectMapper = objectMapper;
    }

    public void send(NotificationPayload payload) {
        try {
            String json = objectMapper.writeValueAsString(payload);
            webSocketHandler.broadcast(new TextMessage(json));
        } catch (JsonProcessingException e) {
            log.error("Unable to serialize payload", e);
        }
    }
}
