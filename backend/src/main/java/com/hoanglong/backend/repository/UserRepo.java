package com.hoanglong.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hoanglong.backend.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.addresses a WHERE a. addressId = ?1")
    List<User> findByAddress(Long addressId);

    @Query("SELECT u FROM User u ORDER BY u.userId DESC")
    List<User> findTopByOrderByUserIdDesc();

    Optional<User> findByEmail(String email);

    User findFirstByOrderByUserIdDesc();

}