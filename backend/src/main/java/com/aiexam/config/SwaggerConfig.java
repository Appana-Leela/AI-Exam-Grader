package com.aiexam.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {

        return new OpenAPI()

                .info(
                        new Info()

                                .title("AI Exam Grader API")

                                .version("1.0")

                                .description(
                                        "AI Powered University Examination Management & Intelligent Evaluation Platform")

                                .contact(
                                        new Contact()
                                                .name("Appana Sri Leela Satya Ratnam")
                                                .email("teacher@test.com")
                                )
                )

                .externalDocs(
                        new ExternalDocumentation()
                                .description("Project Documentation")
                );
    }
}