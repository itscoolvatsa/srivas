package com.srivas.dto.customer;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@Getter
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CustomerSignInDto {
    @Field("email")
    @Email(message = "please enter a valid email")
    private String email;
    @Field("password")
    @NotNull(message = "password should not be empty")
    @Size(min = 5, max = 128, message = "password must be between 6 to 128 characters")
    private String password;
}
