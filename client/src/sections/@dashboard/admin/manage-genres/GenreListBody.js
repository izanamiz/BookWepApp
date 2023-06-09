import { Avatar, Stack, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import Label from '../../../../components/label/Label';
import DeleteGenre from './DeleteGenre';
import GenreForm from './GenreForm';

export default function GenreListBody({ filteredGenres, page, rowsPerPage }) {
  return (
    <TableBody>
      {filteredGenres.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, idx) => {
        const { id, genreName } = val;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell padding="checkbox" />

            <TableCell align="left">{idx}</TableCell>

            <TableCell align="left">{genreName}</TableCell>

            <TableCell align="left">
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>

                <GenreForm genreName={genreName} genreId={id} />

                <DeleteGenre genreName={genreName} genreId={id} />
                
              </Stack>
            </TableCell>

            <TableCell padding="checkbox" />
          </TableRow>
        );
      })}
    </TableBody>
  );
}
