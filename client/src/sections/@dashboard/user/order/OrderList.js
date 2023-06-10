import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Stack, Typography } from '@mui/material';

import { cancelOrder, getOrder } from '../../../../services/user/order/orderRequest';
import { orderListSelector } from '../../../../redux/selectors';
import { getOrderDetail } from '../../../../services/user/order/orderDetailRequest';

const OrderList = () => {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const orderList = useSelector(orderListSelector);

  const bodyCancel = {
    user: { id: currentUser.id },
  };
  useEffect(() => {
    getOrder(token, dispatch);
  }, [token, dispatch]);

  return (
    <Paper>
      <Typography> Order List</Typography>
      {orderList
        .filter((order) => order.user.id === currentUser.id)
        .map((order) => {
          const { id, address, notes, phoneNumber, status, user } = order;
          return (
            <Stack key={id} direction="row" spacing={2}>
              <Typography align="center">{id}</Typography>
              <Typography align="center">{address}</Typography>
              <Typography align="center">{notes}</Typography>
              <Typography align="center">{phoneNumber}</Typography>
              <Typography align="center">{status}</Typography>
              <Typography align="center">{user.id}</Typography>
              <Button onClick={() => navigate(`/dashboard/order/${id}`)}>View</Button>
              <Button onClick={() => cancelOrder(token, id, bodyCancel, dispatch)}>Cancel</Button>
            </Stack>
          );
        })}
    </Paper>
  );
};

export default OrderList;
