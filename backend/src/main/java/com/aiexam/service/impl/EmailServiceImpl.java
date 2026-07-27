package com.aiexam.service.impl;

import com.aiexam.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:test@test.com}")
    private String fromEmail;

    @Override
    public void sendPasswordResetEmail(String to, String resetLink) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("AI Exam Platform - Password Reset");

        message.setText("""
                Hello,

                We received a request to reset your password.

                Click the link below:

                %s

                This link expires in 15 minutes.

                If you didn't request this, please ignore this email.

                AI Exam Platform
                """.formatted(resetLink));

        mailSender.send(message);
    }

    @Override
    public void sendVerificationEmail(String to, String verificationLink) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Verify Your Email");

        message.setText("""
                Welcome to AI Exam Platform.

                Verify your email:

                %s

                Thank you.
                """.formatted(verificationLink));

        mailSender.send(message);
    }
}