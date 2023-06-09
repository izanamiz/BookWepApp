package com.project.book.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.project.book.constant.AppConstant.ResponseCode;
import com.project.book.domain.dao.*;
import com.project.book.domain.dto.OrderDto;
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
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  OrderDetailRepository orderDetailRepository;

    @Autowired
    private  BookRepository bookRepository;

    @Autowired
    private ModelMapper mapper;
    public ResponseEntity<Object> createOrder(OrderDto request) {
        log.info("Executing create order");
        try {
            Optional<User> user = userRepository.findById(request.getUser().getId());
            if (user.isEmpty()) {
                log.info("User [{}] not found", request.getUser().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            List<CartItem> cartItems = cartItemRepository.findByUserId(request.getUser().getId());
            if (cartItems.isEmpty()) {
                log.info("Cart items not found for user [{}]", request.getUser().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            Order order = mapper.map(request, Order.class);
            order.setUser(user.get());
            orderRepository.save(order);

            List<OrderDetail> orderDetails = new ArrayList<>();
            for (CartItem cartItem : cartItems) {
                // Set book sold
                Optional<Book> optionalBook = bookRepository.findById(cartItem.getBook().getId());
                if (optionalBook.isEmpty()) {
                    log.info("Book [{}] not found", cartItem.getBook().getId());
                    return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
                }
                Book book = optionalBook.get();
                book.setBookSold(book.getBookSold() + cartItem.getQuantity());
                bookRepository.save(book);

                // Save order details
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setOrder(order);
                orderDetail.setQuantity(cartItem.getQuantity());
                orderDetail.setBook(cartItem.getBook());
                orderDetails.add(orderDetail);
            }

            orderDetailRepository.saveAll(orderDetails);

            // Clear cart items after creating the order
            cartItemRepository.deleteInBatch(cartItems);

            return ResponseUtil.build(ResponseCode.SUCCESS, mapper.map(order, OrderDto.class), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when creating order. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> getAllOrdersByUserId(OrderDto request) {
        try {
            log.info("Executing get all orders");

            Optional<User> user = userRepository.findById(request.getUser().getId());
            if (user.isEmpty()) {
                log.info("User [{}] not found", request.getUser().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            List<Order> orders = orderRepository.findByUserId(request.getUser().getId());

            return ResponseUtil.build(ResponseCode.SUCCESS, orders, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when getting all orders. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // User click in each order to get its order details
    public ResponseEntity<Object> getOrderById(Long id) {
        log.info("Executing get order by id");
        try {
//            Optional<Order> order = orderRepository.findById(id);
//            return order.map(value -> ResponseUtil.build(ResponseCode.SUCCESS, value, HttpStatus.OK)).orElseGet(() ->
//                    ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND));

            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(id);
            if (orderDetails.isEmpty()) {
                log.info("Order details not found for order [{}]", id);
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            return ResponseUtil.build(ResponseCode.SUCCESS, orderDetails, HttpStatus.OK);

        } catch (Exception e) {
            log.error("Got an error when getting order by id. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update status, address, phoneNumber, notes
    public ResponseEntity<Object> updateById(OrderDto request, Long id) {
        log.info("Executing update order status");
        try {
            Optional<Order> getById = orderRepository.findById(id);
            if (!getById.isPresent()) {
                log.info("Order [{}] not found", id);
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            Optional<User> user = userRepository.findById(request.getUser().getId());
            if (user.isEmpty()) {
                log.info("User [{}] not found", request.getUser().getId());
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            Order order = getById.get();
            order.setUser(user.get());
            order.setStatus(request.getStatus());
            order.setAddress(request.getAddress());
            order.setPhoneNumber(request.getPhoneNumber());
            order.setNotes(request.getNotes());
            orderRepository.save(order);

            return ResponseUtil.build(ResponseCode.SUCCESS, mapper.map(order, OrderDto.class), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when updating order status. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> cancelOrder(Long id) {
        log.info("Executing cancel order");
        try {
            Optional<Order> data = orderRepository.findById(id);
            if (!data.isPresent()) return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.NOT_FOUND);

            List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(id);
            if (orderDetails.isEmpty()) {
                log.info("Order details not found for order [{}]", id);
                return ResponseUtil.build(ResponseCode.DATA_NOT_FOUND, null, HttpStatus.BAD_REQUEST);
            }

            // Clear order details after cancel the order
            orderDetailRepository.deleteInBatch(orderDetails);

            orderRepository.delete(data.get());

            return ResponseUtil.build(ResponseCode.SUCCESS, null, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Got an error when canceling order. Error: {}", e.getMessage());
            return ResponseUtil.build(ResponseCode.UNKNOWN_ERROR, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
