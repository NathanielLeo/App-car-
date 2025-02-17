package com.hoanglong.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hoanglong.backend.entity.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
}