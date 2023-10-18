package com.srivas.util;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.srivas.exception.ErrorsEnum;

import java.util.HashMap;
import java.util.Objects;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class JsonResponse<T> {
    private final String Message;
    private final HashMap<Object, T> data;
    private final Boolean type;

    public JsonResponse(String message, HashMap<Object, T> data, Boolean type) {
        this.Message = message;
        this.data = data;
        this.type = type;
    }

    public JsonResponse(ErrorsEnum message, HashMap<Object, T> data, Boolean type) {
        this.Message = message.toString();
        this.data = data;
        this.type = type;
    }
}
