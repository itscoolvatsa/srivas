package com.srivas.dto.customer;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.srivas.model.CustomerModel;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

@Builder
@ToString
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CustomerDto {
    @Id
    private String id;
    @Field("name")
    @NotNull(message = "name field should not be empty")
    @Size(min = 4, max = 32, message = "name should be between 4 to 32 characters")
    private String name;
    @Field("mobile")
    @NotNull(message = "mobile number should not be empty")
    @Size(min = 10, max = 10, message = "mobile number should contain 10 digits.")
    private String mobile;

    @Field("email")
    @Email(message = "please enter a valid email")
    private String email;
    @Field("password")
    @NotNull(message = "password should not be empty")
    @Size(min = 5, max = 128, message = "password must be between 6 to 128 characters")
    private String password;

    public CustomerModel createCustomerModel() {
        return CustomerModel
                .builder()
                .name(this.name)
                .mobile(this.mobile)
                .email(this.email)
                .password(this.password)
                .build();
    }
}
