package com.hoanglong.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI().info(new Info().title("E-Commerce Application")
                .description("Backend APIs for E-Commerce app")
                .version("v1.0.0")
                .contact(new Contact().name("Hoang Long").url("hoanglong@hitu.edu.vn").email("hoanglong@hitu.edu.vn"))
                .license(new License().name("License").url("/")))
                .externalDocs(new ExternalDocumentation().description("E-Commerce App Documentation")
                        .url("http://localhost:8081/swagger-ui/index.html"));
    }
}