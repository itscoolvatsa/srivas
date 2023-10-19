package com.srivas.dto.owner;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Field;

@AllArgsConstructor
@Getter
public class OwnerSignInDto {
    @Field("email")
    @NotNull(message = "email should not be empty")
    @Email(message = "please enter a valid email")
    private final String email;

    @Field("password")
    @NotNull(message = "password should not be empty")
    @Size(min = 6, max = 128, message = "password must be between 6 to 128 characters")
    private final String password;
}
