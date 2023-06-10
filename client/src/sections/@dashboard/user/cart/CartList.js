import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { addCart, updateCart, deleteCart, getCart } from '../../../../services/user/cart/cartRequest';
import { cartListSelector } from '../../../../redux/selectors';
import { addOrder } from '../../../../services/user/order/orderRequest';

const CartList = () => {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const dispatch = useDispatch();
  const body = {
    quantity: 10,
    book: { id: 5 },
    user: { id: currentUser.id },
  };

  const cartList = useSelector(cartListSelector);

  return (
    <Paper>
      <Typography> Cart List</Typography>
      {cartList
        .filter((cart) => cart.user.id === currentUser.id)
        .map((cart) => {
          const { id, quantity, book, user } = cart;
          return (
            <Stack key={id} direction="row" spacing={2}>
              <Typography align="center">{id}</Typography>
              <Typography align="center">{quantity}</Typography>
              <Typography align="center">{book.id}</Typography>
              <Typography align="center">{user.id}</Typography>
              <Button onClick={() => addCart(token, body, dispatch)}>Add</Button>
              <Button onClick={() => updateCart(token, id, body, dispatch)}>Update</Button>
              <Button onClick={() => deleteCart(token, id, dispatch)}>Delete</Button>
            </Stack>
          );
        })}
    </Paper>
  );
};

export default CartList;
