package com.project.book.repository;

import com.project.book.domain.dao.CartItem;
import com.project.book.domain.dao.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Query("SELECT o FROM OrderDetail o WHERE o.order.id = :orderId")
    List<OrderDetail> findByOrderId(Long orderId);

    @Query("SELECT b FROM OrderDetail b WHERE b.book.id = :id")
    List<OrderDetail> findByBookId(Long id);
}
