package com.srivas.dto.owner;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Builder;

@Builder
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class OwnerCustomerResponseDto {
    private String email;
    private String name;
    private String mobile;
}
