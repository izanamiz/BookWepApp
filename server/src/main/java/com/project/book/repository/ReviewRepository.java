package com.project.book.repository;

import com.project.book.domain.dao.Book;
import com.project.book.domain.dao.Review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("SELECT b FROM Review b WHERE b.book.id = :id")
    List<Review> findByBookId(Long id);
}