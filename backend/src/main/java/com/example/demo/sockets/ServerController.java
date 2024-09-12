package com.example.demo.sockets;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerController {

    private ServerSocket serverSocket;
    private List<ClientThread> clients = new ArrayList<>(); // List of connected clients

    @GetMapping("/server")
    public ResponseEntity<String> startServer() {
        try {
            serverSocket = new ServerSocket(8082); // Listening on port 8082
            serverSocket.setReuseAddress(true);

            new Thread(() -> {
                while (true) {
                    try {
                        Socket clientSocket = serverSocket.accept(); // Accept client connection
                        System.out.println("New client connected: " + clientSocket.getInetAddress().getHostAddress());

                        ClientThread clientThread = new ClientThread(clientSocket, clients);
                        clients.add(clientThread); // Add client to list
                        clientThread.start(); // Start the thread
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }).start();

            return ResponseEntity.ok("Server started and listening on port 8082");

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server Error: " + e.getMessage());
        }
    }
}
