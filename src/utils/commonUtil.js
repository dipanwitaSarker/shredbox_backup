import { toast } from 'react-toastify';

export const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  type: 'info',
  progress: undefined
};

export const setToast = (config, message) => {
  toast(message, config);
};
// export const roundOff = (num) => {
//   return +(Math.round(num + 'e+2') + 'e-2');
// };

// export const roundOffTwo = (num) => {
//   return +parseFloat(num).toFixed(2);
// };
