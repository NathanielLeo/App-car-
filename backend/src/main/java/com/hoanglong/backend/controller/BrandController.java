package com.hoanglong.backend.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hoanglong.backend.config.AppConstants;
import com.hoanglong.backend.entity.Brand;
import com.hoanglong.backend.exceptions.APIException;
import com.hoanglong.backend.payloads.BrandDTO;
import com.hoanglong.backend.payloads.BrandResponse;
import com.hoanglong.backend.service.BrandService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@SecurityRequirement(name = "E-Commerce Application")
public class BrandController {

    @Autowired
    private BrandService brandService;

    // admin:

    @PostMapping("/admin/brands")
    public ResponseEntity<BrandDTO> createBrand(@Valid @RequestBody Brand Brand) {
        BrandDTO savedBrandDTO = brandService.createBrand(Brand);

        return new ResponseEntity<BrandDTO>(savedBrandDTO, HttpStatus.CREATED);

    }

    @PutMapping("/admin/brands/{BrandId}")
    public ResponseEntity<BrandDTO> updateBrand(@RequestBody Brand Brand,
            @PathVariable Long BrandId) {
        BrandDTO BrandDTO = brandService.updateBrand(Brand, BrandId);

        return new ResponseEntity<BrandDTO>(BrandDTO, HttpStatus.OK);

    }

    @DeleteMapping("/admin/brands/{BrandId}")
    public ResponseEntity<String> deleteBrand(@PathVariable Long BrandId) {
        String status = brandService.deleteBrand(BrandId);

        return new ResponseEntity<String>(status, HttpStatus.OK);

    }

    @GetMapping("/public/brands")
    public ResponseEntity<BrandResponse> getBrands(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_BRANDS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR, required = false) String sortOrder) {

        BrandResponse brandResponse = brandService.getBrands(
                pageNumber == 0 ? pageNumber : pageNumber - 1,
                pageSize,
                "id".equals(sortBy) ? "BrandId" : sortBy,
                sortOrder

        );

        return new ResponseEntity<BrandResponse>(brandResponse, HttpStatus.OK);
    }

    @GetMapping("/public/brands/{BrandId}")
    public ResponseEntity<BrandDTO> getOneBrand(@PathVariable Long BrandId) {
        BrandDTO BrandDTO = brandService.getBrandById(BrandId);

        return new ResponseEntity<>(BrandDTO, HttpStatus.OK);

    }

    @PutMapping("/admin/brands/{brandId}/logo")
    public ResponseEntity<BrandDTO> updateBrandLogo(@PathVariable Long brandId,
            @RequestParam("logo") MultipartFile logo) throws IOException {
        try {
            BrandDTO updatedBrand = brandService.updateBrandLogo(brandId,
                    logo);

            return new ResponseEntity<BrandDTO>(updatedBrand, HttpStatus.OK);
        } catch (IOException e) {
            throw new APIException("Error: " + e);
        }

    }

    @GetMapping("/public/brands/logo/{fileName}")
    public ResponseEntity<InputStreamResource> getLogo(@PathVariable String fileName)
            throws FileNotFoundException {
        InputStream logoStream = brandService.getBrandLogo(fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentDispositionFormData("inline", fileName);
        return new ResponseEntity<>(new InputStreamResource(logoStream), headers, HttpStatus.OK);

    }

}