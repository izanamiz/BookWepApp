import { toast } from 'react-toastify';

const style = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  }

export const showSuccessToast = (message) => {
  toast.success(message, style);
};

export const showErrorToast = (message) => {
  toast.error(message, style);
};

export const showInfoToast = (message) => {
  toast.info(message, style);
};

export const showWarningToast = (message) => {
  toast.warning(message, style);
};

export const showLoadingToast = (message) => {
  toast.info(message, { autoClose: false }, style);
};
