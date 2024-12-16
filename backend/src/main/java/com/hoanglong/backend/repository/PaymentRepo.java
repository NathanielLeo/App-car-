package com.hoanglong.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hoanglong.backend.entity.Payment;

@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
}