package com.cleancityB.project.Security;

import com.cleancityB.project.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
     @Autowired
     Jwtutil jwtutil;
     @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        if (path.equals("/cleancity/login") || path.equals("/cleancity/register")) {
           filterChain.doFilter(request, response);
           return;
        }
        String userName =null;
        String jwtToken =null;
        final String authHeader = request.getHeader("Authorization");

        if(authHeader!=null && authHeader.startsWith("Bearer ")){
            jwtToken = authHeader.substring(7);
            try{
                userName=jwtutil.extactUserName(jwtToken);

            } catch (Exception e) {
                    throw new RuntimeException(e);
            }
        }
        else {
            System.out.println("Authorization header not present");
        }

        if(userName!=null && SecurityContextHolder.getContext().getAuthentication()==null){
          try{
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(userName);
                if(jwtutil.validateToken(jwtToken,userDetails.getUsername())){

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
          catch(Exception e){
              System.out.println("Username or password not valid");
          }
        }
        filterChain.doFilter(request, response);
    }
}
