import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
//
import BookCartWidget from '../../../sections/@dashboard/user/books/BookCartWidget';
import BookDetailCard from '../../../sections/@dashboard/user/book-detail/BookDetailCard';

// ----------------------------------------------------------------------

export default function BookDetailPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Book | Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Book
        </Typography>

        <BookDetailCard />

        <BookCartWidget />
      </Container>
    </>
  );
}
