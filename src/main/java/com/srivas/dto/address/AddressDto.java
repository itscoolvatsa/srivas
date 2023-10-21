package com.srivas.dto.address;

import com.srivas.model.AddressModel;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class AddressDto {
    private String name;
    @Field("number")
    @NotNull(message = "house number/name should not be empty")
    @Size(min = 1, max = 32, message = "house number/name must be between 1 to 32 characters")
    private String houseNumber;
    @Field("street")
    @NotNull(message = "street number/name should not be empty")
    @Size(min = 2, max = 32, message = "street number/name must be between 2 to 32 characters")
    private String street;
    @Field("locality")
    @Size(min = 0, max = 32, message = "locality name must be between 0 to 32 characters")
    private String locality;
    @Field("landmark")
    @NotNull(message = "landmark should not be empty")
    @Size(min = 4, max = 32, message = "landmark must be between 4 to 32 characters")
    private String landmark;
    @Field("city")
    @NotNull(message = "city should not be empty")
    @Size(min = 4, max = 32, message = "city must be between 4 to 32 characters")
    private String city;
    @Field("state")
    @NotNull(message = "state should not be empty")
    @Size(min = 4, max = 32, message = "state must be between 4 to 32 characters")
    private String state;
    @Field("pincode")
    @NotNull(message = "pincode should not be empty")
    @Size(min = 4, max = 32, message = "pincode must be between 4 to 32 characters")
    private String pincode;

    public AddressModel createAddress() {
        return AddressModel
                .builder()
                .name(this.name)
                .houseNumber(this.houseNumber)
                .street(this.street)
                .locality(this.locality)
                .landmark(this.landmark)
                .city(this.city)
                .state(this.state)
                .pincode(this.pincode)
                .build();
    }

    public static AddressDto createAddress(AddressModel addressModel) {
        return AddressDto
                .builder()
                .name(addressModel.getName())
                .houseNumber(addressModel.getHouseNumber())
                .street(addressModel.getStreet())
                .landmark(addressModel.getLandmark())
                .locality(addressModel.getLocality())
                .city(addressModel.getCity())
                .state(addressModel.getState())
                .pincode(addressModel.getPincode())
                .build();
    }
}
