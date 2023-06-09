import * as React from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Label from '../../../../components/label/Label';
import { deleteBook } from '../../../../services/books/booksRequest';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtil';

export default function DeleteBook({ bookTitle, bookId }) {
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteBook(token, bookId, dispatch).then((res) => {
      if (res) {
        showSuccessToast('Delete Successfully');
      } else {
        showErrorToast('Delete Failed');
      }
    });
    setOpen(false);
  };
  return (
    <div>
      <Label color="error" onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
        Delete
      </Label>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn chắc chắn muốn xóa sách <strong>{bookTitle}</strong> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={handleDelete} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
