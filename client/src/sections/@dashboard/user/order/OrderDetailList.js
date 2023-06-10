import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
  Card,
} from '@mui/material';
import Label from '../../../../components/label/Label';

const OrderDetailList = ({ detailList }) => (
  <Paper>
    <TableContainer>
      <Table>
        <TableBody>
          {detailList.map((detail) => {
            console.log(detail);
            const { id, quantity, book, order } = detail;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Stack alignItems="center">
                    <Card sx={{ width: 150, height: 150 }}>
                      <img
                        src={detail?.book?.bookCover || 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png'}
                        alt={detail?.book?.bookTitle || 'not found'}
                      />
                    </Card>
                  </Stack>
                </TableCell>

                <TableCell>
                  {book ? (
                    <Stack spacing={5}>
                      <Stack>
                        <Typography align="left" variant="subtitle1">
                          Tên sách: {detail?.book?.bookTitle}
                        </Typography>
                        <Typography align="left" variant="subtitle2">
                          Tác giả: {detail?.book?.bookAuthor}
                        </Typography>
                        <Typography align="left" variant="subtitle2">
                          Thể loại: {detail?.book?.bookGenre?.genreName || 'Undefined'}
                        </Typography>
                        <Typography align="left" variant="subtitle2">
                          Số lượng: {quantity}
                        </Typography>
                      </Stack>
                      <Label color={order.status === 'PENDING' ? 'success' : 'error'}>
                        <Typography align="left" variant="subtitle2">
                          {order.status}
                        </Typography>
                      </Label>
                    </Stack>
                  ) : (
                    <Label color="error" sx={{ width: '100%' }}>
                      <Typography align="left" variant="subtitle1">
                        Sách không còn tồn tại trên hệ thống
                      </Typography>
                    </Label>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
);

export default OrderDetailList;
