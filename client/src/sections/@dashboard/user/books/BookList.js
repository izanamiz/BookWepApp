// @mui
import { Grid } from '@mui/material';
import BookCard from './BookCard';

// ----------------------------------------------------------------------

export default function BookList({books }) {
  return (
    <Grid container spacing={3}>
     {books.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <BookCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
