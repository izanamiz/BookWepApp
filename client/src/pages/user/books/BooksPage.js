import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
//
import { useDispatch, useSelector } from 'react-redux';
import { bookListSelector } from '../../../redux/selectors';
import { getBooks } from '../../../services/books/booksRequest';
import { BookList } from '../../../sections/@dashboard/user/books';
import BookCartWidget from '../../../sections/@dashboard/user/books/BookCartWidget';

// ----------------------------------------------------------------------

export default function BooksPage() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const bookList = useSelector(bookListSelector);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getBooks(token, dispatch);
    }
  }, [token]);

  return (
    <>
      <Helmet>
        <title> Dashboard: Books | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Books
        </Typography>

        <BookList books={bookList} />

        <BookCartWidget />
      </Container>
    </>
  );
}
