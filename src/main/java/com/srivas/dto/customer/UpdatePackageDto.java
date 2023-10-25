package com.srivas.dto.customer;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePackageDto {
    @Field("totalView")
    @NotNull
    @Positive
    @Max(50)
    private int totalView;
    @Field("remainingView")
    @NotNull
    @Positive
    @Max(50)
    private int remainingView;
    @Field("name")
    @Size(min = 6, max = 6)
    private String name;
}