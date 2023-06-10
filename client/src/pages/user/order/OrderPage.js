import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomerInfo from '../../../sections/@dashboard/user/cart/CustomerInfo';
import OrderList from '../../../sections/@dashboard/user/order/OrderList';

const OrderPage = () => (
  <>
    <Helmet>
      <title> Dashboard: Order | Minimal UI </title>
    </Helmet>

    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Order
      </Typography>

      <OrderList />
    </Container>
  </>
);

export default OrderPage;
