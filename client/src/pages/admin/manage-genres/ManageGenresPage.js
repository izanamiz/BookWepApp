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
import { getGenres } from '../../../services/genres/genresRequest';
import { genreListSelector } from '../../../redux/selectors';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// sections
import { GenreListBody, GenreListHead, GenreListToolbar } from '../../../sections/@dashboard/admin/manage-genres';
import GenreForm from '../../../sections/@dashboard/admin/manage-genres/GenreForm';
// ----------------------------------------------------------------------

function applySortFilter(array, query) {
  if (query) {
    return filter(array, (_user) => _user.genreName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return array;
}

export default function ManageGenresPage() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const genreList = useSelector(genreListSelector);

  const [page, setPage] = useState(0);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getGenres(token, dispatch);
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

  const filteredGenres = applySortFilter(genreList, filterName);

  const isNotFound = !filteredGenres.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Genre
          </Typography>
          
          <GenreForm />

        </Stack>

        <Card>
          <GenreListToolbar filterName={filterName} onFilterName={handleFilterByName} searchWhat={"genre"}/>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <GenreListHead  />
               <GenreListBody filteredGenres={filteredGenres} page={page} rowsPerPage={rowsPerPage}/>

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
            count={filteredGenres.length}
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
