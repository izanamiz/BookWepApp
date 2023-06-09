package com.project.book.controller;

import com.project.book.domain.dto.CartItemDto;
import com.project.book.service.CartItemService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/v1/cart-item")
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @PostMapping
    public ResponseEntity<Object> createNewReview(@RequestBody CartItemDto request) {
        return cartItemService.addCartItem(request);
    }

    @GetMapping
    public ResponseEntity<Object> getAllCartItems(@RequestBody CartItemDto request) {
        return cartItemService.getAllCartItemsByUserId(request);
    }

    @PostMapping(value = "{id}")
    public ResponseEntity<Object> update(@RequestBody CartItemDto request, @PathVariable Long id){
        return cartItemService.updateById(request, id);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Object> deleteById(@PathVariable Long id){

        return cartItemService.deleteById(id);
    }


}
