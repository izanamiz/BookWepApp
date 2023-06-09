package com.project.book.repository;

import com.project.book.domain.dao.User;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Registered
public interface UserRepository extends JpaRepository<User, Long> {
    User getDistinctTopByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User findByUsername(String username);
}