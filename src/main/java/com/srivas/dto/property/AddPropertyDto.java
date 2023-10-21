package com.srivas.dto.property;

import com.srivas.dto.address.AddressDto;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AddPropertyDto {
    @Valid
    private AddressDto addressDto;
    @Valid
    private PropertyDto propertyDto;
}
