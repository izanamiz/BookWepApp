import { Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { addOrder } from '../../../../services/user/order/orderRequest';

const CustomerInfo = () => {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const location = useLocation();

  const dispatch = useDispatch();

  const body = {
    status: 'PENDING',
    address: 'Hai phong, Vietnam',
    phone_number: '012345678',
    notes: 'Chuc shop 1 ngay tot lanh',
    user: { id: currentUser.id },
  };
  return (
    <Paper>
      <Typography>CustomerInfo</Typography>
      {location.pathname.includes('cart') && <Button onClick={() => addOrder(token, body, dispatch)}>Checkout</Button>}
    </Paper>
  );
};

export default CustomerInfo;
