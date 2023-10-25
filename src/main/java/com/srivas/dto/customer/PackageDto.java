package com.srivas.dto.customer;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

public class PackageDto {
    @Field("totalView")
    private int totalView;
    @Field("name")
    private String name;
}
