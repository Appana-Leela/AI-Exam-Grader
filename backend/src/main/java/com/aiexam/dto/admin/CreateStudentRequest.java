package com.aiexam.dto.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateStudentRequest {

    @NotBlank(message = "First name is required.")
    private String firstName;

    @NotBlank(message = "Last name is required.")
    private String lastName;

    @Email(message = "Invalid email.")
    @NotBlank(message = "Email is required.")
    private String email;

    @NotBlank(message = "Password is required.")
    @Size(min = 6, message = "Password must contain at least 6 characters.")
    private String password;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone number must contain exactly 10 digits."
    )
    private String phone;

    @NotBlank(message = "Department is required.")
    private String department;

    @NotBlank(message = "Roll number is required.")
    private String rollNumber;

    @NotBlank(message = "Year is required.")
    private String year;

    @NotBlank(message = "Section is required.")
    private String section;

}