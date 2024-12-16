package com.hoanglong.backend.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDTO {
    private Long brandId;
    private String brandName;
    private String logo;

    // private List<ProductDTO> products new ArrayList<>();
}