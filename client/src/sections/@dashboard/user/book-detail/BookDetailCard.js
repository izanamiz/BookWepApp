import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import {
  Box,
  Typography,
  Stack,
  Grid,
  TableContainer,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  Table,
} from '@mui/material';

import { getBookById } from '../../../../services/books/bookDetailRequest';
import { addCart, updateCart } from '../../../../services/user/cart/cartRequest';

import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtil';
import { fDate, momentDate } from '../../../../utils/formatTime';

import { BookCard } from '../books';
import ReviewList from '../review/ReviewList';
import { cartListSelector } from '../../../../redux/selectors';
// ----------------------------------------------------------------------
export default function BookDetailCard() {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { bookId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartList = useSelector(cartListSelector);

  const [book, setBook] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [itemInCart, setItemInCart] = useState(false);
  const [cartId, setCartId] = useState(-1); // not in cart

  useEffect(() => {
    getBookById(token, bookId, dispatch).then((res) => {
      if (res) {
        setBook(res.data);
      } else {
        showErrorToast('Sản phẩm không còn tồn tại');
        navigate(-1);
      }
    });
  }, [token, bookId]);

  useEffect(() => {
    const item = cartList.filter((cart) => cart?.book?.id === bookId - 0);
    setItemInCart(!!item.length);
    if (item.length) {
      setCartId(item[0].id);
      setQuantity(item[0].quantity);
    }
  }, [cartList]);

  const handleAddToCart = (qty) => {
    const body = {
      quantity: qty,
      book: { id: bookId - 0 },
      user: { id: currentUser.id },
    };
    addCart(token, body, dispatch).then((res) => {
      if (res) {
        showSuccessToast('Add To Cart Successfully');
      } else {
        showErrorToast('Add To Cart Failed');
      }
    });
  };

  const handleUpdateCart = (qty) => {
    const item = cartList.filter((cart) => cart?.book?.id === bookId - 0);
    const body = {
      quantity: qty + item[0].quantity,
      book: { id: bookId - 0 },
      user: { id: currentUser.id },
    };
    updateCart(token, cartId, body, dispatch).then((res) => {
      if (res) {
        showSuccessToast('Add To Cart Successfully');
      } else {
        showErrorToast('Add To Cart Failed');
      }
    });
  };
  return (
    <Box>
      <Grid container spacing={5} rowSpacing={5}>
        <Grid item xs={12} sm={6} md={6}>
          <BookCard product={book} />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Stack spacing={2}>
            <Typography variant="h4">Tiêu đề: {book.bookTitle}</Typography>
            <Typography variant="subtitle2">Tác giả: {book.bookAuthor}</Typography>
            <Typography variant="subtitle2">Thể loại: {book?.bookGenre?.genreName || 'Undefined'}</Typography>

            {currentUser.role === 'user' && (
              <Stack direction="row" spacing={5}>
                <Stack direction="row">
                  <Button
                    disabled={quantity === 0}
                    variant="contained"
                    sx={{ minWidth: '35px', width: '35px', height: '35px', fontSize: '1.5rem' }}
                    onClick={() => setQuantity((prev) => prev - 1)}
                  >
                    -
                  </Button>
                  <Button disabled>
                    <Typography variant="subtitle1">{quantity}</Typography>
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ minWidth: '35px', width: '35px', height: '35px', fontSize: '1.5rem' }}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </Button>
                </Stack>
                {!itemInCart ? (
                  <Button variant="contained" onClick={() => handleAddToCart(quantity)} disabled={quantity === 0}>
                    Add To Cart
                  </Button>
                ) : (
                  <Button variant="contained" onClick={() => handleUpdateCart(quantity)} disabled={quantity === 0}>
                    Add To Cart
                  </Button>
                )}
              </Stack>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Paper>
            <Typography variant="h3" padding={5}>
              Thông tin chi tiết
            </Typography>

            <TableContainer sx={{ paddingLeft: 5, paddingBottom: 5 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Ngày xuất bản</TableCell>
                    <TableCell>{momentDate(book?.bookReleaseDate, 'DD/MM/YYYY')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Thể loại</TableCell>
                    <TableCell>{book?.bookGenre?.genreName || 'undefined'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Số trang</TableCell>
                    <TableCell>{book.bookPages}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ padding: 5 }}>
            <Typography variant="h3">Nội dung chính</Typography>
            <Typography paddingTop={3}>{book.bookPlot}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <ReviewList />
        </Grid>
      </Grid>
    </Box>
  );
}
