import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomerInfo from '../../../sections/@dashboard/user/cart/CustomerInfo';
import OrderDetailList from '../../../sections/@dashboard/user/order/OrderDetailList';

const OrderDetailPage = () => (
  <>
    <Helmet>
      <title> Dashboard: OrderDetail | Minimal UI </title>
    </Helmet>

    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        OrderDetail
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={6}>
          <OrderDetailList />
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <CustomerInfo />
        </Grid>
      </Grid>
    </Container>
  </>
);

export default OrderDetailPage;
