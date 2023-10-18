package com.srivas.exception;

import com.srivas.util.JsonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@ControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public ResponseEntity<JsonResponse> handleValidationException(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();
        ex
                .getBindingResult()
                .getFieldErrors()
                .forEach(fieldError -> {
                    errors.add(fieldError.getDefaultMessage());
                });

        HashMap<String, String> errorResponse = new HashMap<>();
        errorResponse.put("validation error", errors.toString());

        return new ResponseEntity<>(new JsonResponse(ErrorsEnum.VALIDATION_ERROR, errorResponse, false), HttpStatus.CREATED);
    }
}
