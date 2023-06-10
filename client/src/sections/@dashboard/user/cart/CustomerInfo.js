import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { addOrder } from '../../../../services/user/order/orderRequest';
import { showSuccessToast, showErrorToast } from '../../../../utils/toastUtil';
import { cartListSelector } from '../../../../redux/selectors';
import { CustomerInfoFormValidationSchema } from '../../../../utils/validation';

const CustomerInfo = () => {
  const token = localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cartList = useSelector(cartListSelector);

  const [formData, setFormData] = useState({
    address: '',
    phone_number: '',
    notes: '',
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

  const handleCheckOut = async () => {
    try {
      await CustomerInfoFormValidationSchema.validate(formData, { abortEarly: false });
      const body = {
        status: 'PENDING',
        address: formData.address,
        phone_number: formData.phone_number,
        notes: formData.notes,
        user: { id: currentUser.id },
      };
      addOrder(token, body, dispatch).then((res) => {
        if (res) {
          showSuccessToast('Add Order Successfully');
          setFormData({
            address: '',
            phone_number: '',
            notes: '',
          });
          setErrors({});
          // navigate("/dashboard/order")
        } else {
          showErrorToast('Add Order Failed');
        }
      });
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((validationError) => {
        fieldErrors[validationError.path] = validationError.message;
      });
      setErrors(fieldErrors);
    }
  };

  return (
    <Paper sx={{ padding: 5 }}>
      <Stack spacing={5}>
        <Typography variant="h3">CustomerInfo</Typography>
        <TextField
          autoFocus
          label="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          error={!isFieldValid('phone_number')}
          helperText={getFieldError('phone_number')}
        />
        <TextField
          autoFocus
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={!isFieldValid('address')}
          helperText={getFieldError('address')}
        />

        <TextField
          autoFocus
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          error={!isFieldValid('notes')}
          helperText={getFieldError('notes')}
        />

        {pathname.includes('cart') && (
          <Button variant="contained" onClick={() => handleCheckOut()} disabled={cartList.length === 0}>
            Checkout
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default CustomerInfo;
