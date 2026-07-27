package com.aiexam.dto.admin;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TeacherPageResponse {

    private List<TeacherResponse> teachers;

    private int currentPage;

    private int totalPages;

    private long totalElements;

    private boolean last;

}