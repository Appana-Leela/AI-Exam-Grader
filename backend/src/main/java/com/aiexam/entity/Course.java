package com.aiexam.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "courses")
public class Course {

    @Id
    private String id;

    @Field("courseCode")
    private String courseCode;

    @Field("courseName")
    private String courseName;

    @Field("description")
    private String description;

    @Field("duration")
    private String duration;

    @Builder.Default
    private Boolean enabled = true;

    @Builder.Default
    private Boolean deleted = false;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}