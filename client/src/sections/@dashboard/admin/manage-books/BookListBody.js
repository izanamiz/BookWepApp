import { Avatar, Stack, TableBody, TableCell, TableRow,  Tooltip, Typography } from '@mui/material';
import Label from '../../../../components/label/Label';
import DeleteBook from './DeleteBook';

export default function BookListBody({ filteredBooks, page, rowsPerPage }) {
  return (
    <TableBody>
      {filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val, idx) => {
        const { id, bookTitle, bookAuthor, bookGenre, bookPages, bookPlot, bookCover } = val;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell padding="checkbox" />

            <TableCell align="left">{id}</TableCell>

            <TableCell component="th" scope="row" padding="none">
              <Stack direction="row" alignItems="center" spacing={2} minHeight={'80px'}>
                <Avatar alt={bookTitle} src={bookCover} />
                <Typography variant="subtitle2" noWrap>
                  {bookTitle}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell align="left">{bookAuthor}</TableCell>

            <TableCell align="left">{bookGenre?.genreName}</TableCell>

            <TableCell align="left">{bookPages}</TableCell>

            <TableCell
              align="left"
              sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              <Tooltip title={bookPlot} placement="top">
                <div>{bookPlot}</div>
              </Tooltip>
            </TableCell>

            <TableCell align="left">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Label color="success" sx={{ cursor: 'pointer' }}>
                  View
                </Label>
                <DeleteBook bookTitle={bookTitle} bookId={id}/>
              </Stack>
            </TableCell>

            <TableCell padding="checkbox" />
          </TableRow>
        );
      })}
    </TableBody>
  );
}
