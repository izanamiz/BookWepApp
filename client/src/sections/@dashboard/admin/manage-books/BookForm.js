import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  MenuItem,
  Card,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Iconify from '../../../../components/iconify/Iconify';
import { getGenres } from '../../../../services/genres/genresRequest';

export default function BookForm() {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const [genreList, setGenreList] = useState([]);
  console.log(genreList);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getGenres(token, dispatch).then((res) => setGenreList(res.data));
  }, [token, dispatch]);

  return (
    <div>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
        New Book
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'lg'}>
        <DialogTitle>Manage Books</DialogTitle>
        <DialogContent>
          <Grid container spacing={5} padding={2}>
            <Grid item xs={12} sm={12} md={7}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <TextField label="Book Titile" sx={{ width: '100%' }} />
                    <TextField label="Book Author" sx={{ width: '100%' }} />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Book Plot" sx={{ width: '100%' }} multiline rows={4} />
                </Grid>

                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <TextField label="Number" type="number" sx={{ width: '100%' }} />
                    <TextField label="Number" type="number" sx={{ width: '100%' }} />
                  </Stack>
                </Grid>

                <Grid item xs={12}>
                  <TextField id="outlined-select-currency" select label="Genre Name" helperText="Please select a genre">
                    {genreList.map((option) => (
                      <MenuItem key={option.id} value={option.genreName}>
                        {option.genreName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <Stack>
                <TextField label="Book Cover Link" sx={{ width: '100%' }} />
                <Card />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
