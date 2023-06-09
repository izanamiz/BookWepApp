package com.project.book.repository;

import com.project.book.domain.dao.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query("SELECT b FROM Book b WHERE b.bookGenre.id = :id")
    List<Book> findByGenreId(Long id);
}

