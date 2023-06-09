package com.project.book.service;

import java.util.List;
import java.util.Optional;

import com.project.book.constant.AppConstant.ResponseCode;
import com.project.book.domain.dao.Book;
import com.project.book.domain.dao.User;
import com.project.book.domain.dao.Review;
import com.project.book.domain.dto.ReviewDto;
import com.project.book.repository.BookRepository;
import com.project.book.repository.ReviewRepository;
import com.project.book.repository.UserRepository;
import com.project.book.util.ResponseUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ReviewService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ModelMapper mapper;

    public ResponseEntity<Object> addReview(ReviewDto request) {
        log.info("Executing add new review");
        try {
            Optional<Book> book = bookRepository.findById(request.getBook().getId());
            if (book.isEmpty()) {
                log.info("Book [{}] not found", request.getBook().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            Optional<User> user = userRepository.findById(request.getUser().getId());
            if (user.isEmpty()) {
                log.info("User [{}] not found", request.getUser().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            Review review = mapper.map(request, Review.class);
            review.setUser(user.get());
            review.setBook(book.get());

            reviewRepository.save(review);

            return ResponseUtil.build(ResponseCode.SUCCESS, mapper.map(review, ReviewDto.class), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when saving new review. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getAllReview() {
        try {
            log.info("Executing get all review");
            List<Review> reviews;
            reviews = reviewRepository.findAll();
            return ResponseUtil.build(ResponseCode.SUCCESS, reviews, HttpStatus.OK);

        } catch (Exception e) {
            log.error("Got an error when get all review by genre. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public ResponseEntity<Object> getReviewById(Long id) {
        log.info("Executing get review by id");
        try {
            Optional<Review> review = reviewRepository.findById(id);
            return review.map(value -> ResponseUtil.build(ResponseCode.SUCCESS, value, HttpStatus.OK)).orElseGet(() ->
                    ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND));
        }catch (Exception e){
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateById(ReviewDto request, Long id) {
        log.info("Executing update review by id");
        try {
            Optional<Review> getById = reviewRepository.findById(id);
            if (!getById.isPresent()) return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND);
            Review review = getById.get();
            review.setStars(request.getStars());
            review.setComment(request.getComment());

            Optional<Book> book = bookRepository.findById(request.getBook().getId());
            if (book.isEmpty()) {
                log.info("Book [{}] not found", request.getBook().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            Optional<User> user = userRepository.findById(request.getUser().getId());
            if (user.isEmpty()) {
                log.info("User [{}] not found", request.getUser().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            review.setBook(book.get());
            review.setUser(user.get());

            reviewRepository.save(review);
            return ResponseUtil.build(ResponseCode.SUCCESS, mapper.map(review, ReviewDto.class), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteById(Long id) {
        log.info("Executing delete review by id");
        try {
            Optional<Review> data = reviewRepository.findById(id);
            if (!data.isPresent()) return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND);
            reviewRepository.delete(data.get());
            return ResponseUtil.build(ResponseCode.SUCCESS, null, HttpStatus.OK);
        }catch (Exception e){
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
