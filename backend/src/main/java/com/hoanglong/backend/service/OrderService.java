package com.hoanglong.backend.service;

import java.util.List;
import com.hoanglong.backend.payloads.OrderDTO;
import com.hoanglong.backend.payloads.OrderResponse;

public interface OrderService {
    OrderDTO placeOrder(String emailid, Long cartId, String paymentMethod);

    OrderDTO getOrder(String emailld, Long orderId);

    List<OrderDTO> getOrdersByUser(String emailId);

    OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    OrderDTO updateOrder(String emailid, Long orderId, String orderStatus);
}