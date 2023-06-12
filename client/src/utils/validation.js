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

export const BookFormValidationSchema = Yup.object().shape({
  bookTitle: Yup.string().required('Title is required'),
  bookAuthor: Yup.string().required('Author is required'),
  bookCover: Yup.string().required('Book Cover is required'),
  bookPages: Yup.number()
  .required('Pages is required')
  .min(0, 'Pages must be greater than or equal to 0'),
  bookPlot: Yup.string().required('Book Plot is required'),
  bookReleaseDate: Yup.string().required('Book Release Date is required'),
  bookGenre: Yup.string().required('Book Genre is required'),
});

export const ReviewFormValidationSchema = Yup.object().shape({
  cmt: Yup.string().required('Comment is required'),
});

export const CustomerInfoFormValidationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  phone_number: Yup.string()
    .required('Phone Number is required')
    .matches(/^\d+$/, 'Phone Number must be a valid number')
    .matches(/^0/, 'Số điện thoại phải bắt đầu bằng số 0')
    .min(10, 'Phone Number must be at least 10 digits')
    .max(12, 'Phone Number can have maximum 12 digits'),
  notes: Yup.string().required('Note is required'),
});
