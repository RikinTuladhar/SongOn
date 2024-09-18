package com.example.demo.sockets;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.List;

public class ClientThread extends Thread {
    private Socket socket;
    private List<ClientThread> clients; // List of connected clients
    private PrintWriter out;

    public ClientThread(Socket socket, List<ClientThread> clients) {
        this.socket = socket;
        this.clients = clients;
    }

    @Override
    public void run() {
        try {
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            out = new PrintWriter(socket.getOutputStream(), true);

            String clientMessage;
            while ((clientMessage = input.readLine()) != null) {
                broadcastMessage(clientMessage); // Broadcast message to all clients
            }

            socket.close(); // Close connection
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Send a message to this client
    public void sendMessage(String message) {
        if (out != null) {
            out.println(message);
        }
    }

    // Broadcast the message to all other clients
    private void broadcastMessage(String message) {
        for (ClientThread client : clients) {
            if (client != this) { // Send to other clients only
                client.sendMessage(message);
            }
        }
    }
}
