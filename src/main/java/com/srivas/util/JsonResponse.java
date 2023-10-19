package com.srivas.util;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.srivas.exception.ErrorsEnum;
import lombok.Setter;

import java.util.HashMap;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Setter
public class JsonResponse<T> {
    private String Message;
    private HashMap<Object, T> data;
    private Boolean type;

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

    public JsonResponse(T errorsEnum, T hashMap, T b) {
    }
}
