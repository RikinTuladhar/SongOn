package com.example.demo.sockets;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClientController {

    @GetMapping("/client/{id}")
    public ResponseEntity<String> startClient(@PathVariable("id") int clientId, @RequestBody Chat chat) {
        try {
            Socket socket = new Socket("localhost", 8082); // Connect to the server
            BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()), true);

            // Send a message to the server
            output.println("Client " + clientId + ": " + chat.getMessage());

            // Read messages broadcasted by the server
            StringBuilder serverMessages = new StringBuilder();
            String serverResponse;
            while ((serverResponse = input.readLine()) != null) {
                serverMessages.append(serverResponse).append("\n");
            }

            socket.close(); // Close the socket

            return ResponseEntity.ok("Client " + clientId + " received: \n" + serverMessages.toString());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Client Error: " + e.getMessage());
        }
    }
}
