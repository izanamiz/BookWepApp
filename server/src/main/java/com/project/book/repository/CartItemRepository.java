package com.project.book.repository;

import com.project.book.domain.dao.CartItem;

import com.project.book.domain.dao.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT c FROM CartItem c WHERE c.user.id = :userId")
    List<CartItem> findByUserId(Long userId);

    @Query("SELECT b FROM CartItem b WHERE b.book.id = :id")
    List<CartItem> findByBookId(Long id);
}