import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { endpoints } from 'endpoints/endpoints';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';

export const useGetMachineList = ({ limit, sortOrder, sortField, current, previous, first, last }) => {
  return useQuery({
    queryKey: ['getMachineData', limit, sortOrder, sortField, current, previous, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.machines}/all?previous=${previous}&current=${current}&sortField=${sortField}&limit=${limit}&sortOrder=${sortOrder}&first=${first}&last=${last}`
        )
        .then((res) => {
          if (res?.status == 200) {
            return res?.data;
          } else {
            return [];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSuccess: ({ data }) => {
      return data;
    }
  });
};


//Submiting Edited Manchine to List

export const useMachineEdit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.machines}/update `, data)
        .then((res) => {
          if (res?.status == 200) {
            toastConfig.type = 'success';
            setToast(toastConfig, res?.data.message);
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
    onSuccess: ({ data }) => {
      queryClient.refetchQueries('getMachineData');
      // queryClient.refetchQueries('getDetailsById');
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



export const useGetMachineById = ({ id }) => {
  return useQuery({
    queryKey: ['getMachineDetailsById', id],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.machines}/details?id=${id}`)
        .then((res) => {
          if (res?.status == 200) {
            return res?.data;
          } else {
            return [];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onSuccess: ({ data }) => {
      return data;
    }
  });
};