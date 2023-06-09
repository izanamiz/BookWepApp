import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Label from '../../../../components/label';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function BookCard({ product }) {
  const { id, bookTitle, bookAuthor, bookGenre, bookPages, bookPlot, bookCover, bookSold } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <Label
          variant="filled"
          color={'error'}
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          {product?.bookGenre?.genreName}
        </Label>
        <StyledProductImg alt={bookTitle} src={bookCover} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle1" noWrap sx={{ cursor: 'pointer' }}>
            {bookTitle}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
            variant="subtitle2"
            sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {bookAuthor}
          </Typography>
          <Label color="success">Đã bán {bookSold}</Label>
        </Stack>
      </Stack>
    </Card>
  );
}
