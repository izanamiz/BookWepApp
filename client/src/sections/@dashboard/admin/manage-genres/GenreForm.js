import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify/Iconify';
import { addGenre, updateGenre } from '../../../../services/genres/genresRequest';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtil';
import { GenreFormValidationSchema } from '../../../../utils/validation';

export default function GenreForm({ genreName, genreId }) {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    genre_name: genreName || '',
  });

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const handleAddGenre = async () => {
    try {
      await GenreFormValidationSchema.validate(formData, { abortEarly: false });

      addGenre(token, formData, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Add new Genre Successfully');
        } else {
          showErrorToast('Add new Genre Failed');
        }
      });
      setOpen(false);
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((validationError) => {
        fieldErrors[validationError.path] = validationError.message;
      });
      setErrors(fieldErrors);
    }
  };

  const handleUpdateGenre = async () => {
    try {
      await GenreFormValidationSchema.validate(formData, { abortEarly: false });

      updateGenre(token, genreId, formData, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Update Successfully');
        } else {
          showErrorToast('Update Failed');
        }
      });
      setOpen(false);
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((validationError) => {
        fieldErrors[validationError.path] = validationError.message;
      });
      setErrors(fieldErrors);
      console.log(fieldErrors)
    }
  };

  const isFieldValid = (fieldName) => !errors[fieldName];

  const getFieldError = (fieldName) => errors[fieldName] || '';

  return (
    <div>
      {genreId ? (
        <Label color="success" onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
          Update
        </Label>
      ) : (
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickOpen}>
          New Genre
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{genreId ? 'Update' : 'Add new Genre'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {genreId ? (
                `Bạn chắc chắn muốn thay đổi thể loại ${genreName}?`
            ) : (
              'Bạn chắc chắn muốn thêm thể loại mới ?'
            )}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            name="genre_name"
            label="Genre Name"
            value={formData.genre_name}
            onChange={handleChange}
            error={!isFieldValid('genre_name')}
            helperText={getFieldError('genre_name')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          {genreId ? (
            <Button onClick={handleUpdateGenre}>Đồng ý</Button>
          ) : (
            <Button onClick={handleAddGenre}>Đồng ý</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
