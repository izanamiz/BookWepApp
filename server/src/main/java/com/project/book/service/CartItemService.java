package com.project.book.service;

import java.util.List;
import java.util.Optional;

import com.project.book.constant.AppConstant.ResponseCode;
import com.project.book.domain.dao.*;
import com.project.book.domain.dto.CartItemDto;
import com.project.book.repository.*;
import com.project.book.util.ResponseUtil;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CartItemService {


    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    public ResponseEntity<Object> addCartItem(CartItemDto request) {
        log.info("Executing add new cart item");
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

            CartItem cartItem  = mapper.map(request, CartItem.class);
            cartItem.setUser(user.get());
            cartItem.setBook(book.get());

            cartItemRepository.save(cartItem);

            return ResponseUtil.build(ResponseCode.SUCCESS,  mapper.map(cartItem, CartItemDto.class), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when saving new cart item. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getAllCartItems() {
        try {
            log.info("Executing get all cart item");

            List<CartItem> cartItems = cartItemRepository.findAll();
            return ResponseUtil.build(ResponseCode.SUCCESS, cartItems, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when get all cart item. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> updateById(CartItemDto request, Long id) {
        log.info("Executing update cart item by id");
        try {
            Optional<CartItem> getById = cartItemRepository.findById(id);
            if (!getById.isPresent()) return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND);

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

            CartItem cartItem = getById.get();
            cartItem.setQuantity(request.getQuantity());
            cartItem.setBook(book.get());
            cartItem.setUser(user.get());

            cartItemRepository.save(cartItem);

            return ResponseUtil.build(ResponseCode.SUCCESS, mapper.map(cartItem, CartItemDto.class), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when updating cart item. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> deleteById(Long id) {
        log.info("Executing delete cart item by id");
        try {
            Optional<CartItem> data = cartItemRepository.findById(id);
            if (!data.isPresent()) return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND);

            cartItemRepository.delete(data.get());

            return ResponseUtil.build(ResponseCode.SUCCESS, null, HttpStatus.OK);
        }catch (Exception e){
            log.error("Got an error when deleting cart item. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
