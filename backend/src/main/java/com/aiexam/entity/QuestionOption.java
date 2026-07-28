package com.aiexam.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionOption {

    /*
     * Option Label
     * Example:
     * A, B, C, D
     */
    private String optionLabel;

    /*
     * Option Text
     */
    private String optionText;

    /*
     * Whether this option is correct
     */
    @Builder.Default
    private Boolean correct = false;

    /*
     * Display Order
     * Example:
     * 1,2,3,4
     */
    private Integer displayOrder;

}