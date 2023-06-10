import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { addCart, updateCart, deleteCart } from '../../../../services/user/cart/cartRequest';
import { cartListSelector } from '../../../../redux/selectors';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtil';

const CartList = () => {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const dispatch = useDispatch();
  const cartList = useSelector(cartListSelector);

  const handleupdateCart = (cartId, bookId, qty) => {
    const body = {
      quantity: qty,
      book: { id: bookId },
      user: { id: currentUser.id },
    };
    updateCart(token, cartId, body, dispatch).then((res) => {
      if (res) {
        showSuccessToast('Update Cart Item Successfully');
      } else {
        showErrorToast('Update Cart Item Failed');
      }
    });
  };
  const handleDeleteFromCart = (cartId) => {
    deleteCart(token, cartId, dispatch).then((res) => {
      if (res) {
        showSuccessToast('Delete From Cart Successfully');
      } else {
        showErrorToast('Delete From Cart Failed');
      }
    });
  };

  return (
    <Paper sx={{ padding: 5 }}>
      {cartList.filter((cart) => cart.user.id === currentUser.id).length === 0 && (
        <Stack alignItems="center" spacing={5}>
          <Typography variant="h3">There's no Items in Cart</Typography>
          <img
            // src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            src="/assets/images/cart/empty-cart.png"
            alt="empty-cart"
            style={{ width: '50%' }}
          />
        </Stack>
      )}
      <TableContainer>
        <Table>
          <TableBody>
            {cartList
              .filter((cart) => cart.user.id === currentUser.id)
              .map((cart) => {
                const { id, quantity, book, user } = cart;
                return (
                  <TableRow key={cart.id}>
                    <TableCell>
                      <Card sx={{ width: 150, height: 150 }}>
                        <img src={book.bookCover} alt={book.bookTitle} />
                      </Card>
                    </TableCell>

                    <TableCell>
                      <Stack spacing={5}>
                        <Box>
                          <Typography align="left" variant="subtitle1">
                            {book.bookTitle}
                          </Typography>
                          <Typography align="left" variant="subtitle2">
                            {book.bookAuthor}
                          </Typography>
                          <Typography align="left" variant="subtitle2">
                            {book?.bookGenre.genreName || 'Undefined'}
                          </Typography>
                        </Box>
                        <Stack direction="row">
                          <Button
                            disabled={quantity === 1}
                            variant="contained"
                            sx={{ minWidth: '35px', width: '35px', height: '35px', fontSize: '1.5rem' }}
                            onClick={() => handleupdateCart(id, book.id, quantity - 1)}
                          >
                            -
                          </Button>
                          <Button disabled>
                            <Typography variant="subtitle1">{quantity}</Typography>
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ minWidth: '35px', width: '35px', height: '35px', fontSize: '1.5rem' }}
                            onClick={() => handleupdateCart(id, book.id, quantity + 1)}
                          >
                            +
                          </Button>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ verticalAlign: 'top' }}>
                      <RemoveCircleIcon
                        onClick={() => handleDeleteFromCart(id)}
                        sx={{ cursor: 'pointer', width: '1.5em', height: '1.5em' }}
                      />
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

export default CartList;
