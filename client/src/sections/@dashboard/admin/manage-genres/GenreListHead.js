// @mui
import { TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

const headLabel = ['ID', 'Genre Name', 'Action'];

export default function GenreListHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headLabel.map((val, idx) => (
          
          <TableCell key={idx} align={idx === (headLabel.length-1) ? "center" : "left"}>
            <TableSortLabel>{val}</TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox" />
      </TableRow>
    </TableHead>
  );
}
