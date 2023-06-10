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
import { showErrorToast } from '../../../../utils/toastUtil';
import { fDate, momentDate } from '../../../../utils/formatTime';

import { BookCard } from '../books';
import ReviewList from '../review/ReviewList';
// ----------------------------------------------------------------------
export default function BookDetailCard() {
  const token = localStorage.getItem('token');

  const { bookId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [book, setBook] = useState({});

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
