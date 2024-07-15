import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
import { endpoints } from 'endpoints/endpoints';
import { useNavigate } from 'react-router';
export const useCreatePassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      // console.log('🚀 ~ mutationFn: ~ data:', data);
      return await axiosInstance
        .post(`${endpoints.users}/reset-password `, data)
        .then((res) => {
          if (res?.status == 200) {
            toastConfig.type = 'success';
            setToast(toastConfig, res?.data.message);
            navigate(`/`);
          } else {
            toastConfig.type = 'error';
            setToast(toastConfig, res?.data.message);
          }

          return res;
        })
        .catch((error) => {
          toastConfig.type = 'error';
          setToast(toastConfig, error.response.data.message);
        });
    },

    onError: ({ error }) => {
      return error;
    },
    onSettled: ({ data }) => {
      return data;
    }
  });
};


// Forgot Password

export const useForgotPassword = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      // console.log('🚀 ~ mutationFn: ~ data:', data);
      return await axiosInstance
        .put(`${endpoints.users}/forgot-password`, data)
        .then((res) => {
          if (res?.status == 200) {
            toastConfig.type = 'success';
            setToast(toastConfig, res?.data.success);
            //   navigate(`/`);
          } else {
            toastConfig.type = 'error';
            setToast(toastConfig, error?.response?.data?.error);
          }

          return res;
        })
        .catch((error) => {
          toastConfig.type = 'error';
          setToast(toastConfig, error?.response?.data?.error);
        });
    },

    onError: ({ error }) => {
      return error;
    },
    onSettled: ({ data }) => {
      return data;
    }
  });
};

