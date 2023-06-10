import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import CartList from '../../../sections/@dashboard/user/cart/CartList';
import CustomerInfo from '../../../sections/@dashboard/user/cart/CustomerInfo';

const CartPage = () => (
  <>
    <Helmet>
      <title> Dashboard: Cart | Minimal UI </title>
    </Helmet>

    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Cart
      </Typography>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={12} md={5}>
          <CustomerInfo />       
        </Grid>
      </Grid>
    </Container>
  </>
);

export default CartPage;
