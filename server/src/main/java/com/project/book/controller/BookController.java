package com.project.book.controller;

import com.project.book.domain.dto.BookDto;
import com.project.book.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/v1/book")
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Object> createNewBook(@RequestBody BookDto request) {
        return bookService.addBook(request);
    }
    @GetMapping
    public ResponseEntity<Object> getAllBooks() {
        return bookService.getBook();
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Object> getById(@PathVariable Long id){
        return bookService.getBookById(id);
    }

    @PostMapping(value = "{id}")
    public ResponseEntity<Object> update(@RequestBody BookDto request, @PathVariable Long id){
        return bookService.updateById(request, id);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Object> deleteById(@PathVariable Long id){
        return bookService.deleteById(id);
    }
}

