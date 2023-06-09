import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Label from '../../../components/label/Label';
//
import { showErrorToast, showSuccessToast } from '../../../utils/toastUtil';
import { LoginFormValidationSchema } from '../../../utils/validation';
// components
import Iconify from '../../../components/iconify';
import { loginUser } from '../../../services/auth/authRequests';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    try {
      await LoginFormValidationSchema.validate(formData, { abortEarly: false });

      setIsLoading(true);

      loginUser(formData, dispatch)
        .then((res) => {
          if (res) {
            showSuccessToast('Login successful');
            navigate('/dashboard', { replace: true });
          } else {
            showErrorToast('Login failed');
            setOpen(true);
            setFormData({
              username: '',
              password: '',
            });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } catch (error) {
      const fieldErrors = {};
      error.inner.forEach((validationError) => {
        fieldErrors[validationError.path] = validationError.message;
      });
      setErrors(fieldErrors);
    }
  };

  const isFieldValid = (fieldName) => !errors[fieldName];

  const getFieldError = (fieldName) => errors[fieldName] || '';

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          error={!isFieldValid('username')}
          helperText={getFieldError('username')}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!isFieldValid('password')}
          helperText={getFieldError('password')}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {open && <Label color={'error'}>Wrong Username or Password</Label>}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        disabled={isLoading}
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}
