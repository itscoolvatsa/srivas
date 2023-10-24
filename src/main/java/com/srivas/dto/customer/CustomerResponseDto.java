package com.srivas.dto.customer;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;

@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CustomerResponseDto {
    private String id;
    private String email;
    private String name;
}
