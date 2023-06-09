package com.project.book.controller;

import com.project.book.domain.dto.OrderDto;
import com.project.book.service.OrderService;

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
@RequestMapping(value = "/v1/order")
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Object> createOrder(@RequestBody OrderDto orderDto) {
        return orderService.createOrder(orderDto);
    }

    @GetMapping
    public ResponseEntity<Object> getAllOrders(@RequestBody OrderDto orderDto) {
        return orderService.getAllOrdersByUserId(orderDto);
    }

    @GetMapping(value = "{id}")
    public ResponseEntity<Object> getById(@PathVariable Long id){
        return orderService.getOrderById(id);
    }

    @PostMapping(value = "{id}")
    public ResponseEntity<Object> update(@RequestBody OrderDto request, @PathVariable Long id){
        return orderService.updateById(request, id);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Object> deleteById(@PathVariable Long id){
        return orderService.cancelOrder(id);
    }

}
