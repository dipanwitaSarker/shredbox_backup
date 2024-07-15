import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
// import { useNavigate } from 'react-router-dom';
import { endpoints } from 'endpoints/endpoints';

export const useEnterpriseAdd = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .post(`${endpoints.enterprises}/create`, data)
        .then((res) => {
          if (res?.status == 200) {
            toastConfig.type = 'success';
            setToast(toastConfig, res?.data.success);
          } else {
            toastConfig.type = 'error';
            setToast(toastConfig, error?.response?.data?.error);
          }
          // navigate(`/dashboard/organizations`);
          return res;
        })
        .catch((error) => {
          toastConfig.type = 'error';
          setToast(toastConfig, error?.response?.data?.error);
        });
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries('getEnterpriseData');
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

export const useGetEnterpriseList = ({ limit, sortOrder, sortField, current, previous, first, last }) => {
  return useQuery({
    queryKey: ['getEnterpriseData', limit, sortOrder, sortField, current, previous, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.enterprises}/all?limit=${limit}&sortOrder=${sortOrder}&sortField=${sortField}&current=${current}&previous=${previous}&first=${first}&last=${last}`
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

// for Editing Organizations

export const useGetEnterpriseById = ({ id }) => {
  return useQuery({
    queryKey: ['getEnterpriseDetailsById', id],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.enterprises}/details?id=${id}`)
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

//Submiting Edited Organisations to List

export const useGetEnterpriseEditedList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.enterprises}/update `, data)
        .then((res) => {
          if (res?.status == 200) {
            toastConfig.type = 'success';
            setToast(toastConfig, res?.data.success);
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
      queryClient.refetchQueries('getEnterpriseData');
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

///Enterprise update Status

export const useEnterpriseStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.enterprises}/update-status`, data)
        .then((res) => {
          if (res?.status == 200) {
            toastConfig.type = 'success';
            // setToast(toastConfig, res?.data.success);
          } else {
            toastConfig.type = 'error';
            // setToast(toastConfig, error?.response?.data?.error);
          }

          return res;
        })
        .catch((error) => {
          toastConfig.type = 'error';
          setToast(toastConfig, error?.response?.data?.error);
        });
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries('getEnterpriseData');
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
