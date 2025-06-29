package com.Brinah.FlightBooking.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // apply to all endpoints
                        .allowedOrigins(
                                "http://localhost:5500",   // for Live Server (VS Code)
                                "http://127.0.0.1:5500",   // alternate live-server address
                                "http://localhost:3000",   // for React
                                "http://127.0.0.1:3000"    // alternate React dev server
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true); // allow cookies or Authorization headers
            }
        };
    }
}


