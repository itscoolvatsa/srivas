package com.srivas.dto.owner;

import com.srivas.model.OwnerModel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Field;

@ToString
public class OwnerSignUpDto {
    @Field("name")
    @NotNull(message = "name field should not be empty")
    @Size(min = 4, max = 32, message = "name should be between 4 to 32 characters")
    private final String name;

    @Field("mobile")
    @NotNull(message = "mobile number should not be empty")
    @Size(min = 10, max = 10, message = "mobile number should contain 10 digits.")
    private final String mobile;

    @Field("email")
    @NotNull(message = "email should not be empty")
    @Email(message = "please enter a valid email")
    private final String email;

    @Field("password")
    @NotNull(message = "password should not be empty")
    @Size(min = 6, max = 128, message = "password must be between 6 to 128 characters")
    private final String password;

    public OwnerSignUpDto(String name, String mobile, String email, String password) {
        this.name = name;
        this.mobile = mobile;
        this.email = email;
        this.password = password;
    }

    public OwnerModel createOwner() {
        return OwnerModel
                .builder()
                .email(this.email)
                .name(this.name)
                .mobile(this.mobile)
                .password(this.password)
                .build();
    }
}
