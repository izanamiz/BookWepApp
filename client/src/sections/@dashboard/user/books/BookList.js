import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import BookCard from './BookCard';

// ----------------------------------------------------------------------

BookList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function BookList({ products, books }) {
  console.log("chay toi day")
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
