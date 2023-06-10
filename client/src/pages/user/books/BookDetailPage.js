import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
//
import BookDetailCard from '../../../sections/@dashboard/user/book-detail/BookDetailCard';

// ----------------------------------------------------------------------

export default function BookDetailPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Book Detail| Minimal UI </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Book Detail
        </Typography>

        <BookDetailCard />
      </Container>
    </>
  );
}
