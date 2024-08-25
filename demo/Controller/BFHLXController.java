// src/main/java/com/example/demo/controller/BFHLController.java

package com.example.demo.controller;

import com.example.demo.model.DataRequest;
import com.example.demo.model.DataResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bfhl")
public class BFHLController {

    @PostMapping
    public ResponseEntity<DataResponse> handlePostRequest(@RequestBody DataRequest dataRequest) {
        DataResponse response = new DataResponse();

        // Set user information (replace with actual values)
        response.setUserId("john_doe_17091999");
        response.setEmail("john@xyz.com");
        response.setRollNumber("ABCD123");

        // Extract numbers, alphabets, and highest lowercase alphabet
        List<String> numbers = new ArrayList<>();
        List<String> alphabets = new ArrayList<>();
        List<String> highestLowercaseAlphabet = new ArrayList<>();

        String highestLowercase = "";

        for (String item : dataRequest.getData()) {
            if (item.matches("\\d+")) {
                numbers.add(item);
            } else if (item.matches("[a-zA-Z]")) {
                alphabets.add(item);
                if (item.matches("[a-z]")) {
                    if (highestLowercase.isEmpty() || item.compareTo(highestLowercase) > 0) {
                        highestLowercase = item;
                    }
                }
            }
        }

        if (!highestLowercase.isEmpty()) {
            highestLowercaseAlphabet.add(highestLowercase);
        }

        // Set response data
        response.setSuccess(true);
        response.setNumbers(numbers);
        response.setAlphabets(alphabets);
        response.setHighestLowercaseAlphabet(highestLowercaseAlphabet);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<Object> handleGetRequest() {
        return ResponseEntity.ok().body("{\"operation_code\":1}");
    }
}
