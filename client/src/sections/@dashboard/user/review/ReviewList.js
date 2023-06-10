import {
  Paper,
  Typography,
  Avatar,
  Stack,
  Rating,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Table,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reviewListSelector } from '../../../../redux/selectors';

import { getAllReviews } from '../../../../services/user/reviews/reviewsRequest';
import ReviewForm from './ReviewForm';
import { fDate, momentDate } from '../../../../utils/formatTime';

const ReviewList = () => {
  const token = localStorage.getItem('token');

  const { bookId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const reviewList = useSelector(reviewListSelector);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getAllReviews(token, dispatch);
    }
  }, []);

  return (
    <Paper sx={{ padding: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ReviewForm bookId={bookId-0}/>
      </Box>

      <TableContainer>
        <Table>
          <TableBody>
            {reviewList
              .filter((val) => val?.book?.id === bookId - 0)
              .map((review, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Stack alignItems="center" spacing={1}>
                        <Typography sx={{ fontSize: 12 }}>{review?.user?.username}</Typography>
                        <Avatar />
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Rating name="read-only" value={review?.stars} readOnly />
                      <Typography sx={{ fontSize: 12 }}>{momentDate(review?.createdAt)}</Typography>

                      <Stack spacing={1} paddingTop={1}>
                        <Typography variant="subtitile2">{review?.comment}</Typography>

                        <ReviewForm
                          reviewId={review?.id}
                          stars={review?.stars}
                          comment={review?.comment}
                          bookId={bookId-0}
                          userId={review.user.id}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReviewList;
