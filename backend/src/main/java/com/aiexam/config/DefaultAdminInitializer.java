package com.aiexam.config;

import com.aiexam.entity.User;
import com.aiexam.enums.Role;
import com.aiexam.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DefaultAdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String adminEmail = "admin@aiexam.com";

        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        User admin = User.builder()
                .firstName("System")
                .lastName("Administrator")
                .email(adminEmail)
                .password(passwordEncoder.encode("Admin@123"))
                .phone("9999999999")
                .department("Administration")
                .role(Role.ADMIN)
                .enabled(true)
                .accountLocked(false)
                .emailVerified(true)
                .build();

        userRepository.save(admin);

        System.out.println();
        System.out.println("=======================================");
        System.out.println("DEFAULT ADMIN CREATED");
        System.out.println("Email : admin@aiexam.com");
        System.out.println("Password : Admin@123");
        System.out.println("=======================================");
        System.out.println();
    }
}