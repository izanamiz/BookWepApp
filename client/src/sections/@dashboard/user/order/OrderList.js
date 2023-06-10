import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { cancelOrder, getOrder } from '../../../../services/user/order/orderRequest';
import { orderListSelector } from '../../../../redux/selectors';
import Label from '../../../../components/label/Label';

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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>OrderID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList
              .filter((order) => order.user.id === currentUser.id)
              .map((order) => {
                const { id, address, notes, phoneNumber, status } = order;
                return (
                  <TableRow key={id}>
                    <TableCell align="left">{id}</TableCell>
                    <TableCell align="left">{address}</TableCell>
                    <TableCell align="left">{phoneNumber}</TableCell>
                    <TableCell align="left">{notes}</TableCell>
                    <TableCell align="left">
                      <Label color={status === 'PENDING' ? 'success' : 'error'}> {status}</Label>
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" justifyContent={'center'}>
                        <Button onClick={() => navigate(`/dashboard/order/${id}`)}>View</Button>
                        {status === 'PENDING' && (
                          <Button color="error"onClick={() => cancelOrder(token, id, bodyCancel, dispatch)}>Cancel</Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderList;
