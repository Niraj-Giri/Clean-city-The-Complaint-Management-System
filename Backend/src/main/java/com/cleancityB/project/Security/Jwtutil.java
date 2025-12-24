package com.cleancityB.project.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.function.Function;

@Component
public class Jwtutil {

    private final String SECRET="currenttimeisfourfiftysixofafternoondayis24sep2025wednesdaytommrrowismyonlineclasses";
    private final int EXP_TIME=60*60*60*5;
    private final Key key= Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String subject) {
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+EXP_TIME*1000L))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claimsResolver.apply(claims);
    }
    public String extactUserName(String token) {
        return extractClaim(token,Claims::getSubject);
    }
    public Date extactExpirationDate(String token) {
        return extractClaim(token,Claims::getExpiration);

    }
    public boolean extactIsExpired(String token) {
        return extractClaim(token,Claims::getExpiration).before(new Date());
    }
    public boolean validateToken(String token,String username) {
        return username.equals(extactUserName(token)) &&!extactIsExpired(token);

    }
}
