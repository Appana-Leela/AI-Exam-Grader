package com.aiexam.repository;

import com.aiexam.entity.User;
import com.aiexam.enums.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    List<User> findByRoleOrderByFirstNameAsc(Role role);

    List<User> findByRoleAndDeletedFalseOrderByFirstNameAsc(Role role);

    long countByRole(Role role);

    long countByRoleAndDeletedFalse(Role role);

    long countByRoleAndDeletedFalseAndEnabledTrue(Role role);

    long countByRoleAndEnabledTrue(Role role);

}

