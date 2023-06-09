package com.project.book.service;

import com.project.book.constant.AppConstant.ResponseCode;
import com.project.book.domain.dao.*;
import com.project.book.domain.dto.BookDto;
import com.project.book.repository.*;
import com.project.book.util.ResponseUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    public ResponseEntity<Object> addBook(BookDto request) {
        log.info("Executing save new book");
        try {
            Optional<Genre> genre = genreRepository.findById(request.getBookGenre().getId());
            if (genre.isEmpty()) {
                log.info("Genre [{}] not found", request.getBookGenre().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            Book book = mapper.map(request, Book.class);
            book.setBookGenre(genre.get());
            book.setBookSold(Integer.valueOf(0));
            bookRepository.save(book);
            return ResponseUtil.build(ResponseCode.SUCCESS, mapper.map(book, BookDto.class), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when saving new book. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getBook() {
        log.info("Executing get all book");
        try {
            List<Book> bookList = bookRepository.findAll();
            return ResponseUtil.build(ResponseCode.SUCCESS, bookList, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when saving new book. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getBookById(Long id) {
        log.info("Executing get book by id");
        try {
            Optional<Book> movie = bookRepository.findById(id);
            return movie.map(value -> ResponseUtil.build(ResponseCode.SUCCESS, value, HttpStatus.OK)).orElseGet(() ->
                    ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateById(BookDto request, Long id) {
        log.info("Executing update book by id");
        try {
            Optional<Book> getById = bookRepository.findById(id);
            if (!getById.isPresent())
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND);
            Book book = getById.get();
            book.setBookTitle(request.getBookTitle());
            book.setBookPlot(request.getBookPlot());
            book.setBookReleaseDate(request.getBookReleaseDate());
            book.setBookAuthor(request.getBookAuthor());
            book.setBookCover(request.getBookCover());
            book.setBookPages(request.getBookPages());

            Optional<Genre> genre = genreRepository.findById(request.getBookGenre().getId());
            if (genre.isEmpty()) {
                log.info("Genre [{}] not found", request.getBookGenre().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }
            book.setBookGenre(genre.get());
            bookRepository.save(book);
            return ResponseUtil.build(ResponseCode.SUCCESS, mapper.map(book, BookDto.class), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteById(Long id) {
        log.info("Executing delete book by id");
        try {
            Optional<Book> data = bookRepository.findById(id);
            if (!data.isPresent()) return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND);

            List<CartItem> cartItems = cartItemRepository.findByBookId(id);
            if (cartItems.isEmpty()) {
                log.info("Book [{}] is not in cart", id);
//                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }
            else{
                // Clear cart items after deleting book
                cartItemRepository.deleteInBatch(cartItems);
            }

            List<Review> reviews = reviewRepository.findByBookId(id);
            if (reviews.isEmpty()) {
                log.info("No Reviews for book [{}]", id);
//                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }
            else {
                // Clear reviews after deleting book
                reviewRepository.deleteInBatch(reviews);
            }

            List<OrderDetail> orderDetails = orderDetailRepository.findByBookId(id);
            if (orderDetails.isEmpty()) {
                log.info("No Order details match book [{}]", id);
//                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }
            else {
                // Update book.id into null after deleting book
                for (OrderDetail orderDetail : orderDetails) {
                    orderDetail.setBook(null);
                    orderDetailRepository.save(orderDetail);
                }
            }
            bookRepository.delete(data.get());
            return ResponseUtil.build(ResponseCode.SUCCESS, null, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
