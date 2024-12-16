package com.hoanglong.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hoanglong.backend.entity.Brand;

@Repository
public interface BrandRepo extends JpaRepository<Brand, Long> {
    Brand findByBrandName(String brandName);
}