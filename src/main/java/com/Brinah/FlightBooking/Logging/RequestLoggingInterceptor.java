package com.Brinah.FlightBooking.Logging;

import com.Brinah.FlightBooking.Entity.LogEntry;
import com.Brinah.FlightBooking.Service.Interface.LogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest; // Fixed import
import jakarta.servlet.http.HttpServletResponse; // Fixed import
import java.time.LocalDateTime;

@Component
@Slf4j
@RequiredArgsConstructor
public class RequestLoggingInterceptor implements HandlerInterceptor {

    private final LogService logService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            String role = auth.getAuthorities().stream().findFirst().map(Object::toString).orElse("UNKNOWN");

            if (role.equals("ROLE_SUPERADMIN")) {
                String path = request.getRequestURI();
                String ip = request.getRemoteAddr();

                log.info("🔒 SUPERADMIN ACCESS: {} accessed [{}] from IP: {}", username, path, ip);

                logService.saveLog(LogEntry.builder()
                        .username(username)
                        .role(role)
                        .ipAddress(ip)
                        .action("ACCESS_CONTROLLER")
                        .endpoint(path)
                        .timestamp(LocalDateTime.now())
                        .build());
            }
        }

        return true;
    }
}