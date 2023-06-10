package com.project.book.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;
import java.util.function.Function;

@Log4j2
@Component
public class JwtTokenProvider {

	private String key = "MIICXgIBAAKBgQCiLU3sYGTb9tZympsw2TmuiI2/sXXxwXRr/bnkmF49sTVTIuqsieBybneA+txODbFcpzLkqTyzHzwyBqLvbudpTQoL7KytDZY7TWWn77FHH6bN2eY0hY1XFmkbAwa17foLa+Nqv7M8wSBmBOsha6TEcBmxwSuuzRQoapX+T6THSwIDAQABAoGBAKBTc2aMQQln88bmayeWiDywCJoKgRQX8NVVxzFjJD+O8a2XpjIeOAJIjOG4npSXWtDDBkAhwr090s+N2gQkOqY+oyegGO1AMW3rHrKSjIc6S6xD6c1x342YdKNbxBpdQoI5jBr3/A++Bx0kaKLrJfBaYfTUQPRUhowJdprfZUWxAkEA11lbNYy/cm8c5xoLPiiYbnUSRjFta1v70TWSoXwfS77ua5JSTqRxQR/GTbfalR6hTWy4xcOlUAIp04zoVgaS+QJBAMDKbpDZsVAZb1v76G1GZ4Sv9lmeNeTNkZ/LpnDZzKNzzfCPyt+gZqWgjjihKywCui8b8ZSZQ4wAsIhBULcEuWMCQFcYssUDueKEggIODIIFVTFHdC6jiwei2kQREM7zLo0qGa+0LEnWRF/8g+2m8GbjToXL9Sc3K8MiPNxs3wL8AbECQQCjqvdEh1sNahps16XRJyT4sz2LhVGxhYcsRoJtaald1hEuOZR8VrrtvykeEE0LVuFi3vEvOxHqCCfV9MUmKp+LAkEAthDJb4gyRhnEpiSJaYJYuZ52Eg/TfUfIttvU1BEL76idwmI7x7klOeBHxl/MdZChI3rp3Y6assCGyXA0v2gLMA==";

	private SecretKey secretKey;

	@PostConstruct
	// Khởi tạo khóa bí mật
	public void setUpSecretKey() {
		try {
			// Sử dụng thuật toán mã hóa HMAC-SHA để tạo ra một khóa bí mật để ký token
			secretKey = Keys.hmacShaKeyFor(key.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			log.error("Error generating JWT Secret Key : {}", e.getMessage());
			throw new RuntimeException("Error generating JWT Secret Key", e);
		}
	}

	// Tạo token
	public String generateToken(Authentication authentication, String role) {
		String token = null;
		try {
			LocalDate now = LocalDate.now();
			ZoneId defaultZoneId = ZoneId.systemDefault();
			Claims clms = Jwts.claims().setSubject(authentication.getName()); // Khởi tạo đối tượng thông tin xác thực
			clms.put("role", new ObjectMapper().writeValueAsString(role)); // Đặt trường role vào thông tin xác thực
			ObjectMapper mapper = new ObjectMapper();
			// Xây dựng token dựa trên các thông tin cần thiết
			return Jwts.builder()
					.setId(UUID.randomUUID().toString())
					.setClaims(clms) // Đặt thông tin xác thực người dùng vào chuỗi JWT
					.setSubject(authentication.getName()) //đặt tên người dùng (username) vào chuỗi JWT
					.setIssuer(authentication.getName()) //đặt tên của ứng dụng (issuer) vào chuỗi JWT
					.setIssuedAt(Date.from(Instant.now())) //đặt thời gian phát hành chuỗi JWT
					.setExpiration(Date.from(now.plusDays(1).atStartOfDay(defaultZoneId).toInstant())) //đặt thời gian hết hạn của chuỗi JWT (1 ngày)
					.signWith(secretKey).compact(); // Ký chuỗi JWT bằng secretKey vừa tạo
		} catch (Exception e) {
			log.error("error get token" + e.getMessage());
		}
		return token;
	}
	
	//Validate token
	public boolean validateToken(String token, HttpServletRequest request) {
		try {
			// Lấy role từ tài khoản đăng nhập
			String role = getRole(token).replace("\"", "");
			log.info("user role {}",role);
			//Phân quyền user/admin khi thực hiện các http request
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/genre")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/book")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/genre")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			if (!role.equals("admin") && request.getRequestURI().contains("/api/v1/book")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/review")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/review")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/cart")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/cart")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/order")
					&& request.getMethod().equals("POST")) {
				return false;
			}
			if (role.equals("admin") && request.getRequestURI().contains("/api/v1/order")
					&& request.getMethod().equals("DELETE")) {
				return false;
			}
			return true;
		} catch (SignatureException ex) {
		} catch (MalformedJwtException ex) {
		} catch (ExpiredJwtException ex) {
		} catch (UnsupportedJwtException ex) {
		} catch (IllegalArgumentException ex) {
		}
		return false;
	}

	//Trả về username của tài khoản đăng nhập
	public String getUsername(String token) {
		Claims claims = getAllClaimsFromToken(token);
		return claims.getSubject();
	}
	
	//Trả về role của tài khoản đăng nhập
	public String getRole(String token) {
		Claims claims = getAllClaimsFromToken(token);
		return (String) claims.get("role");
	}
	
	private Claims getAllClaimsFromToken(String token) {
		//phương thức parseClaimsJws() sẽ thực hiện giải mã token và trả về một đối tượng Jws<Claims>. Từ đối tượng này, chúng ta có thể lấy được body của token thông qua phương thức getBody().
		return Jwts.parser().setSigningKey(key.getBytes()).parseClaimsJws(token).getBody();
	}

	private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	// Trả về dữ liệu của tài khoản đã đăng nhập sau khi được giải mã từ token
	private String getDataFromToken(String token) {
		return getClaimFromToken(token, claims -> (String) claims.get("data"));
	}
	
	private HashMap<String, Object> additionalInfo() {
        HashMap<String, Object> data = new HashMap<>();
        data.put("id", 1);
        return data;
    }
}