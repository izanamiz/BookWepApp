import * as Yup from 'yup';

export const LoginFormValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export const RegisterFormValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').min(6, 'Username must be at least 6 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export const GenreFormValidationSchema = Yup.object().shape({
  genre_name: Yup.string().required('Genre name is required'),
});

