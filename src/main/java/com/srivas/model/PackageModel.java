package com.srivas.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;

public class PackageModel {
    @Id
    private String id;
    @Field("totalView")
    private int totalView;
    @Field("createdOn")
    private Date postedOn;
    @Field("remainingView")
    private int remainingView;
    @Field("name")
    private String name;
}
