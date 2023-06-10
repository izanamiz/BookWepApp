import { Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import CustomerInfo from '../../../sections/@dashboard/user/cart/CustomerInfo';
import { orderDetailListSelector } from '../../../redux/selectors';
import { getOrderDetail } from '../../../services/user/order/orderDetailRequest';
import OrderDetailList from '../../../sections/@dashboard/user/order/OrderDetailList';

const OrderDetailPage = () => {
  const token = localStorage.getItem('token');

  const { orderId } = useParams();

  const dispatch = useDispatch();

  const orderDetailList = useSelector(orderDetailListSelector);

  useEffect(() => {
    getOrderDetail(token, orderId, dispatch);
  }, [orderId]);

  const { id, status, address, phoneNumber, notes } = orderDetailList[0]?.order || {
    id: '',
    status: '',
    address: '',
    phoneNumber: '',
    notes: '',
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: OrderDetail | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          OrderDetail
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={7}>
            <OrderDetailList detailList={orderDetailList} />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <Paper sx={{ padding: 5 }}>
              <Stack spacing={5}>
                <Typography variant="h3">CustomerInfo</Typography>
                <TextField disabled autoFocus label="Phone Number" value={phoneNumber} />
                <TextField disabled autoFocus label="Address" value={address} />
                <TextField disabled={!!orderDetailList} autoFocus label="Notes" value={notes} />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default OrderDetailPage;
