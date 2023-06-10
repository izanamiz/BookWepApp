import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify/Iconify';
import { addReview, deleteReview, updateReview } from '../../../../services/user/reviews/reviewsRequest';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtil';

const ReviewForm = ({ reviewId, stars, comment, bookId, userId }) => {
  // 0: add, 1:update, 2: delete
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(0);
  const [rating, setRating] = useState(stars || 0);
  const [reviewing, setReviewing] = useState(comment || '');
  const [errors, setErrors] = useState(false);

  const handleClickOpen = (a) => {
    setAction(a);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRating = (e) => {
    setRating(e.target.value - 0);
  };

  const handleReviewing = (e) => {
    setReviewing(e.target.value);
    if (e.target.value) setErrors(false);
    else setErrors(true);
  };

  const handleDeleteReview = () => {
    deleteReview(token, reviewId, dispatch).then((res) => {
      if (res) {
        showSuccessToast('Delete review Successfully');
      } else {
        showErrorToast('Delete review Failed');
      }
    });
    setOpen(false);
  };
  const handleUpdateReview = () => {
    if (!errors) {
      const body = {
        stars: rating,
        comment: reviewing,
        book: { id: bookId },
        user: { id: currentUser.id },
      };

      updateReview(token, reviewId, body, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Update review Successfully');
          setRating(0);
          setReviewing('');
        } else {
          showErrorToast('Update review Failed');
        }
      });
      setOpen(false);
    }
  };
  const handleAddReview = () => {
    if (!errors) {
      const body = {
        stars: rating,
        comment: reviewing,
        book: { id: bookId },
        user: { id: currentUser.id },
      };
      addReview(token, body, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Add review Successfully');
          setRating(0);
          setReviewing('');
        } else {
          showErrorToast('Add review Failed');
        }
      });
      setOpen(false);
    }
  };

  return (
    <div>
      {currentUser.role === 'user' &&
        (reviewId ? (
          userId === currentUser.id && (
            <Stack direction="row" spacing={2}>
              <Label color="success" sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(1)}>
                Chỉnh sửa
              </Label>
              <Label color="error" sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(2)}>
                Xóa
              </Label>
            </Stack>
          )
        ) : (
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleClickOpen(0)}>
            New Review
          </Button>
        ))}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{reviewId ? (action === 1 ? 'Update' : 'Delete') : 'Add new Comment'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {reviewId
              ? action === 1
                ? 'Bạn chắc chắn muốn thay đổi cmt này chứ?'
                : 'Bạn chắc chắn muốn xóa cmt này chứ'
              : 'Bạn chắc chắn muốn thêm đánh giá mới ?'}
          </DialogContentText>

          {action !== 2 && (
            <>
              <Rating name="simple-controlled" value={rating} onChange={handleRating} />
              <TextField
                autoFocus
                margin="dense"
                fullWidth
                variant="standard"
                name="comment"
                label="Comment..."
                value={reviewing}
                onChange={handleReviewing}
                required
                error={errors}
                helperText={'Không được để trống'}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          {reviewId ? (
            (action === 1 && <Button onClick={handleUpdateReview}>Đồng ý</Button>) ||
            (action === 2 && <Button onClick={handleDeleteReview}>Đồng ý</Button>)
          ) : (
            <Button onClick={handleAddReview}>Đồng ý</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReviewForm;
