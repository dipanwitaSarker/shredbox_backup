import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,

  headers: {
    'Content-Type': 'application/json'
  }
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (window.localStorage) {
//       const token = storageInstance?.getStorage('authDataToken');
//       if (token) {
//         config.headers.Authorization = 'Bearer ' + token;
//       }
//       const selectedCurrency = window.localStorage.getItem('selectedCurrency');
//       if (selectedCurrency) {
//         config.headers.currency = selectedCurrency;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
export default axiosInstance;
