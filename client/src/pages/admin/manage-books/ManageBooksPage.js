import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
//
import { getBooks } from '../../../services/books/booksRequest';
import { bookListSelector } from '../../../redux/selectors';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { BookListBody, BookListHead, BookListToolbar } from '../../../sections/@dashboard/admin/manage-books';
import BookForm from '../../../sections/@dashboard/admin/manage-books/BookForm';
// ----------------------------------------------------------------------

const TABLE_HEAD = ['ID', 'Title', 'Author', 'Genre', 'Pages', 'Plot', 'Action'];

// ----------------------------------------------------------------------

function applySortFilter(array, query) {
  if (query) {
    return filter(array, (_user) => _user.bookTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return array;
}

export default function ManageBooksPage() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const bookList = useSelector(bookListSelector);

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getBooks(token, dispatch);
    }
  }, [token]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredBooks = applySortFilter(bookList, filterName);

  const isNotFound = !filteredBooks.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Book
          </Typography>
          <BookForm />
          
        </Stack>

        <Card>
          <BookListToolbar filterName={filterName} onFilterName={handleFilterByName} searchWhat={"book"}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <BookListHead headLabel={TABLE_HEAD}  />
               <BookListBody filteredBooks={filteredBooks} page={page} rowsPerPage={rowsPerPage}/>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredBooks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
