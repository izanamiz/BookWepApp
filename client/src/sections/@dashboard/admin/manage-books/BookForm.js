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
  styled,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import Iconify from '../../../../components/iconify/Iconify';
import { getGenres } from '../../../../services/genres/genresRequest';
import Label from '../../../../components/label/Label';
import { addBook, updateBook } from '../../../../services/books/booksRequest';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtil';
import { momentDate } from '../../../../utils/formatTime';
import { BookFormValidationSchema } from '../../../../utils/validation';

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default function BookForm({ book }) {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const [genreList, setGenreList] = useState([]);

  const [formData, setFormData] = useState({
    bookTitle: book ? book.bookTitle : '',
    bookAuthor: book ? book.bookAuthor : '',
    bookCover: book ? book.bookCover : '',
    bookPages: book ? book.bookPages : 0,
    bookPlot: book ? book.bookPlot : '',
    bookReleaseDate: book ? momentDate(book?.bookReleaseDate, 'YYYY-MM-DD') : '',
    bookGenre: book ? book.bookGenre?.id : null,
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(!!book);

  const isFieldValid = (fieldName) => !errors[fieldName];

  const getFieldError = (fieldName) => errors[fieldName] || '';

  useEffect(() => {
    setIsDisabled(!!book);
  }, [book]);

  useEffect(() => {
    setIsDisabled(!!book);
  }, []);

  useEffect(() => {
    getGenres(token, dispatch).then((res) => setGenreList(res.data));
  }, [token, dispatch]);

  function handleClickOpen() {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsDisabled((prev) => !prev);
  };

  const handleUpdateBook = async () => {
    try {
      await BookFormValidationSchema.validate(formData, { abortEarly: false });
      const body = {
        book_title: formData.bookTitle,
        book_author: formData.bookAuthor,
        book_cover: formData.bookCover,
        book_pages: formData.bookPages,
        book_plot: formData.bookPlot,
        book_release_date: formData.bookReleaseDate,
        book_genre: { id: formData.bookGenre },
      };
      updateBook(token, book.id, body, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Update Book Successfully');
        } else {
          showErrorToast('Update Book Failed');
        }
      });
      setErrors({})
      setOpen(false);
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((validationError) => {
        fieldErrors[validationError.path] = validationError.message;
      });
      setErrors(fieldErrors);
    }
  };

  const handleAddBook = async () => {
    try {
      await BookFormValidationSchema.validate(formData, { abortEarly: false });

      const body = {
        book_title: formData.bookTitle,
        book_author: formData.bookAuthor,
        book_cover: formData.bookCover,
        book_pages: formData.bookPages,
        book_plot: formData.bookPlot,
        book_release_date: formData.bookReleaseDate,
        book_genre: { id: formData.bookGenre },
      };
      addBook(token, body, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Add Book Successfully');
        } else {
          showErrorToast('Add Book Failed');
        }
      });
      setErrors({})
      setOpen(false);
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((validationError) => {
        fieldErrors[validationError.path] = validationError.message;
      });
      setErrors(fieldErrors);
    }
  };
  return (
    <>
      {book ? (
        <Label color="success" sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen()}>
          View
        </Label>
      ) : (
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen()}>
          New Book
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'lg'}>
        <DialogTitle>Manage Books</DialogTitle>
        <DialogContent>
          <Grid container spacing={5} padding={2}>
            <Grid item xs={12} sm={12} md={7}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <TextField
                      disabled={isDisabled}
                      autoFocus
                      label="Book Titile"
                      name="bookTitle"
                      value={formData.bookTitle}
                      onChange={handleChange}
                      error={!isFieldValid('bookTitle')}
                      helperText={getFieldError('bookTitle')}
                      sx={{ width: '100%' }}
                    />
                    <TextField
                      disabled={isDisabled}
                      autoFocus
                      label="Book Author"
                      name="bookAuthor"
                      value={formData.bookAuthor}
                      onChange={handleChange}
                      error={!isFieldValid('bookAuthor')}
                      helperText={getFieldError('bookAuthor')}
                      sx={{ width: '100%' }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={isDisabled}
                    autoFocus
                    label="Book Plot"
                    name="bookPlot"
                    value={formData.bookPlot}
                    onChange={handleChange}
                    error={!isFieldValid('bookPlot')}
                    helperText={getFieldError('bookPlot')}
                    sx={{ width: '100%' }}
                    multiline
                    rows={4}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6} md={6}>
                      <input
                        style={{ width: '100%', height: '56px' }}
                        disabled={isDisabled}
                        type="date"
                        name="bookReleaseDate"
                        value={formData.bookReleaseDate}
                        required
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <TextField
                        disabled={isDisabled}
                        autoFocus
                        label="Number"
                        type="number"
                        name="bookPages"
                        value={formData.bookPages}
                        onChange={handleChange}
                        error={!isFieldValid('bookPages')}
                        helperText={getFieldError('bookPages')}
                        sx={{ width: '100%' }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    disabled={isDisabled}
                    autoFocus
                    id="outlined-select-currency"
                    select
                    label="Genre Name"
                    name="bookGenre"
                    value={formData.bookGenre || ''}
                    error={!isFieldValid('bookGenre')}
                    helperText={getFieldError('bookGenre')}
                    onChange={handleChange}
                  >
                    <MenuItem value="">Select Genre</MenuItem>
                    {genreList.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.genreName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={5}>
              <Stack spacing={5}>
                <TextField
                  disabled={isDisabled}
                  autoFocus
                  label="Book Cover Link"
                  name="bookCover"
                  value={formData.bookCover}
                  onChange={handleChange}
                  error={!isFieldValid('bookCover')}
                  helperText={getFieldError('bookCover')}
                  sx={{ width: '100%' }}
                />
                <Card sx={{ minHeight: 200 }}>
                  <StyledProductImg alt={'book cover'} src={formData.bookCover} />
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {book ? (
            isDisabled ? (
              <Button variant="contained" onClick={() => handleEdit()}>
                Edit
              </Button>
            ) : (
              <Button variant="contained" onClick={() => handleUpdateBook()}>
                Save
              </Button>
            )
          ) : (
            <Button variant="contained" onClick={() => handleAddBook()}>
              Add
            </Button>
          )}
          <Button variant="contained" onClick={() => handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
