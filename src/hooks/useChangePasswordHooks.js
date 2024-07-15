import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
import { endpoints } from 'endpoints/endpoints';
// import { useNavigate } from 'react-router';
export const useChangePassword = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      // console.log('🚀 ~ mutationFn: ~ data:', data);
      return await axiosInstance
        .put(`${endpoints.users}/change-password`, data)
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
