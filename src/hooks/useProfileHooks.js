import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from 'endpoints/endpoints';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.users}/update`, data)
        .then((res) => {
          if (res?.status == 200) {
            // console.log("🚀 ~ .then ~ res:", res)
            toastConfig.type = 'success';
            setToast(toastConfig, res?.data.success);
            // localStorage.setItem('userData', JSON.stringify(res?.data?.user));
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
    onSuccess: ({ data }) => {
      queryClient.refetchQueries('getProfileDataById');
      return data;
    },
    onError: ({ error }) => {
      return error;
    },
    onSettled: ({ data }) => {
      return data;
    }
  });
};

export const useGetProfileById = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return useQuery({
    queryKey: ['getProfileDataById'],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.users}/details?id=${userData.id}`)

        .then((res) => {
          // console.log("RRRRRRRR:", res)
          if (res?.status == 200) {
            return res?.data;
          } else {
            return [];
          }
        })
        .catch((e) => {
          toastConfig.type = 'error';
          setToast(toastConfig, e.response.data.e);
          console.log(e);
        });
    },
    onSuccess: ({ data }) => {
      return data;
    },
    // refetchInterval: 30000
  });
};

