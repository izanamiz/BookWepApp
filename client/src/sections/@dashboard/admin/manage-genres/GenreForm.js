import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Label from '../../../../components/label/Label';

export default function GenreForm({ genreName = '', genreId }) {
  console.log(genreName);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [genre, setGenre] = useState(genreName);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setGenre(e.target.value);
  };

  return (
    <div>
      <Label color="success" onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
        Update
      </Label>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn chắc chắn muốn thay đổi thể loại <strong>{genreName}</strong> ?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            variant="standard"
            name="genre_name"
            label="Genre Name"
            value={genre}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleClose}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
