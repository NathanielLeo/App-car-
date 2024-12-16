package com.hoanglong.backend.service;

import com.hoanglong.backend.entity.Category;
import com.hoanglong.backend.payloads.CategoryDTO;
import com.hoanglong.backend.payloads.CategoryResponse;

public interface CategoryService {

    CategoryDTO createCategory(Category category);

    CategoryResponse getCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    CategoryDTO getCategoryById(Long categoryId);

    CategoryDTO updateCategory(Category category, Long categoryId);

    String deleteCategory(Long categoryId);

}