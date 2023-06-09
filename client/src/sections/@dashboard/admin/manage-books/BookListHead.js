import PropTypes from 'prop-types';
// @mui
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------
BookListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function BookListHead({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headLabel.map((val, idx) => (
          <TableCell key={idx} align='center'>
            <TableSortLabel>{val}</TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox" />
      </TableRow>
    </TableHead>
  );
}
