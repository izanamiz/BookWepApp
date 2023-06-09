package com.project.book.controller;

import com.project.book.domain.dto.ReviewDto;
import com.project.book.service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/review")
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Object> createNewReview(@RequestBody ReviewDto request) {
        return reviewService.addReview(request);
    }

    @GetMapping
    public ResponseEntity<Object> getAllReview() {
        return reviewService.getAllReview();
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Object> getById(@PathVariable Long id){
        return reviewService.getReviewById(id);
    }

    @PostMapping(value = "{id}")
    public ResponseEntity<Object> update(@RequestBody ReviewDto request, @PathVariable Long id){
        return reviewService.updateById(request, id);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Object> deleteById(@PathVariable Long id){
        return reviewService.deleteById(id);
    }


}
