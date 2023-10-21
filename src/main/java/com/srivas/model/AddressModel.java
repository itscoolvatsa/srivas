package com.srivas.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "address")
@Getter
@Setter
@ToString
public class AddressModel {
    @Id
    private String id;
    @Field("name")
    @NotNull(message = "name should not be empty")
    @Size(min = 4, max = 32, message = "name must be between 4 to 32 characters")
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
    @NotNull(message = "locality should not be empty")
    @Size(min = 3, max = 32, message = "locality name must be between 3 to 32 characters")
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
}
