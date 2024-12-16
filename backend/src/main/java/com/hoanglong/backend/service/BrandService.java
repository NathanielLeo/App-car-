package com.hoanglong.backend.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import com.hoanglong.backend.entity.Brand;
import com.hoanglong.backend.payloads.BrandDTO;
import com.hoanglong.backend.payloads.BrandResponse;

public interface BrandService {

    BrandDTO createBrand(Brand brand);

    BrandResponse getBrands(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    BrandDTO getBrandById(Long brandId);

    BrandDTO updateBrand(Brand brand, Long brandId);

    String deleteBrand(Long brandId);

    BrandDTO updateBrandLogo(Long BrandId, MultipartFile logo) throws IOException;

    public InputStream getBrandLogo(String fileName) throws FileNotFoundException;

}