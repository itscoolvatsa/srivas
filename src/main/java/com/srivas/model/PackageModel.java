package com.srivas.model;

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
