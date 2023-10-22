package com.srivas.model;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.Date;

@Document(collection = "property")
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class PropertyModel {
    @Id
    private String id;

    @Field("rent")
    @NotNull(message = "Rent field should not be empty")
    @Positive(message = "Rent should be a positive value")
    @Max(value = 1000000, message = "Rent cannot be more than 10,00,000")
    private double rent; // Rent amount (Float)

    @Field("deposit")
    @NotNull(message = "Deposit field should not be empty")
    @Positive(message = "Deposit should be a positive value")
    @Max(value = 10000000, message = "Deposit cannot be more than 1,00,00,000")
    private double deposit; // Deposit amount (Float)

    @Field("areasqft")
    @NotNull(message = "Area Sq. ft. field should not be empty")
    @Positive(message = "Area Sq. ft. should be a positive value")
    @Max(value = 100000, message = "Area Sq. ft. cannot be more than 1,00,000")
    private double areaSqFt; // Area in square feet (Float)

    @Field("bedroom")
    @NotNull(message = "Bedroom field should not be empty")
    @Positive(message = "Bedroom should be a positive value")
    @Max(value = 100, message = "Bedroom cannot be more 100")
    private int bedroom; // Number of bedrooms (Integer)

    @Field("parking")
    @NotNull(message = "Parking Status field should not be empty")
    private ArrayList<String> parking; // Parking availability (String: Car, Bike, No-Parking)

    @Field("postedOn")
    private Date postedOn;

    @Field("furnishingStatus")
    @NotNull(message = "Furnishing Status field should not be empty")
    private boolean furnishingStatus;

    @Field("bathroom")
    @NotNull(message = "Bathroom field should not be empty")
    @Positive(message = "Bathroom should be a positive value")
    @Max(value = 20, message = "Bathroom cannot be more than 20")
    private int bathroom;

    @Field("gatedsecurity")
    @NotNull(message = "Gated Security field should not be empty")
    private boolean gatedSecurity;

    @Field("floor")
    @NotNull(message = "Floor field should not be empty")
    @Positive(message = "Floor should be a positive value")
    @Max(value = 100, message = "Floor cannot be more 100")
    private int floor;

    @Field("description")
    @NotNull(message = "Description field should not be empty")
    @Size(min = 4, max = 32, message = "Description should be between 4 to 32 characters")
    private String description;

    @DBRef
    @Null
    private AddressModel address;
}
