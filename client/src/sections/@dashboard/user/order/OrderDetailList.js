import { Paper, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { orderDetailListSelector } from '../../../../redux/selectors';
import { getOrderDetail } from '../../../../services/user/order/orderDetailRequest';

const OrderDetailList = () => {
  const token = localStorage.getItem('token');

  const { orderId } = useParams();

  const dispatch = useDispatch();

  const orderDetailList = useSelector(orderDetailListSelector);

  useEffect(() => {
    getOrderDetail(token, orderId, dispatch);
  }, [orderId]);

  return (
    <Paper>
      <Typography> Order Detail List</Typography>
      {orderDetailList.map((detail) => {
        const { id, quantity, order } = detail;
        console.log(detail?.book?.id);
        return (
          <Stack key={id} direction="row" spacing={2}>
            <Typography align="center">{id}</Typography>
            <Typography align="center">{quantity}</Typography>
            {/* <Typography align="center">{detail?.book?.id}</Typography> */}
            {detail?.book?.bookTitle ? (
              <Typography align="center">{detail?.book?.bookTitle}</Typography>
            ) : (
              <Typography align="center">Sách này không còn tồn tại</Typography>
            )}
            <Typography align="center">{order.id}</Typography>
            <Typography align="center">{order.user.id}</Typography>
          </Stack>
        );
      })}
    </Paper>
  );
};

export default OrderDetailList;
