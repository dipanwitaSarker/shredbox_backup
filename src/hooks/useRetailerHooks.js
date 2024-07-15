import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
// import { useNavigate } from 'react-router-dom';
import { endpoints } from 'endpoints/endpoints';

export const useRetailerAdd = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .post(`${endpoints.retailers}/create`, data)
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
      queryClient.refetchQueries('getRetailerData');
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

export const useGetRetailerList = ({ limit, sortOrder, sortField, current, previous, first, last }) => {
  return useQuery({
    queryKey: ['getRetailerData', limit, sortOrder, sortField, current, previous, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.retailers}/all?previous=${previous}&current=${current}&sortField=${sortField}&sortOrder=${sortOrder}&limit=${limit}&first=${first}&last=${last}`
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

export const useGetRetailerById = ({ id }) => {
  return useQuery({
    queryKey: ['getRetailerDetailsById', id],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.retailers}/details?id=${id}`)
        .then((res) => {
          if (res?.status == 200) {
            return res?.data;
          } else {
            return [];
          }
        })
        .catch((e) => {
          toastConfig.type = 'error';
          setToast(toastConfig, e.response.data.e);
        });
    },
    onSuccess: ({ data }) => {
      return data;
    }
  });
};

//Submiting Edited Organisations to List

export const useGetRetailerEditedList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.retailers}/update `, data)
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
      queryClient.refetchQueries('getRetailerData');
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

// Retailer update Status

export const useRetailerStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.retailers}/update-status`, data)
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
      queryClient.refetchQueries('getRetailerData');
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

/// Retailer user listing

export const useGetRetailerUserList = ({ limit, sortOrder, sortField, current, previous, type }) => {
  return useQuery({
    queryKey: ['getRetailerUserData', limit, sortOrder, sortField, current, previous, type],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.users}/all?previous=${previous}&current=${current}&sortField=${sortField}&sortOrder=${sortOrder}&limit=${limit}&type=${type}`
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
