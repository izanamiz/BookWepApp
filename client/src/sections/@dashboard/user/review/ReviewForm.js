import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Rating,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify/Iconify';
import { addReview, deleteReview, getAllReviews, updateReview } from '../../../../services/user/reviews/reviewsRequest';
import { showErrorToast, showSuccessToast } from '../../../../utils/toastUtil';
import { ReviewFormValidationSchema } from '../../../../utils/validation';

const ReviewForm = ({ reviewId, stars, comment, bookId, userId }) => {
  // 0: add, 1:update, 2: delete
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(0);
  const [rating, setRating] = useState(stars || 0);
  // const [reviewing, setReviewing] = useState(comment || '');

  const [formData, setFormData] = useState({
    cmt: comment || '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isFieldValid = (fieldName) => !errors[fieldName];

  const getFieldError = (fieldName) => errors[fieldName] || '';

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

  // const handleReviewing = (e) => {
  //   setReviewing(e.target.value);
  // };

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
  const handleUpdateReview = async () => {
    try {
      await ReviewFormValidationSchema.validate(formData, { abortEarly: false });

      const body = {
        stars: rating,
        // comment: reviewing,
        comment: formData.cmt,
        book: { id: bookId },
        user: { id: currentUser.id },
      };

      updateReview(token, reviewId, body, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Update review Successfully');
          setRating(0);
          // setReviewing('');
          setFormData({ ...formData, cmt: '' });
          setErrors({});
        } else {
          showErrorToast('Update review Failed');
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
  const handleAddReview = async () => {
    try {
      await ReviewFormValidationSchema.validate(formData, { abortEarly: false });
      const body = {
        stars: rating,
        // comment: reviewing,
        comment: formData.cmt,
        book: { id: bookId },
        user: { id: currentUser.id },
      };
      addReview(token, body, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Add review Successfully');
          setRating(0);
          // setReviewing('');
          setFormData({ ...formData, cmt: '' });
          setErrors({});
        } else {
          showErrorToast('Add review Failed');
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
                name="cmt"
                label="Comment"
                // value={reviewing}
                // onChange={handleReviewing}
                value={formData.cmt}
                onChange={handleChange}
                error={!isFieldValid('cmt')}
                helperText={getFieldError('cmt')}
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
