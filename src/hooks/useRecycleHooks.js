import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
import { endpoints } from 'endpoints/endpoints';

// Add Recycle
export const useRecyclerAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .post(`${endpoints.recylers}/create`, data)
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
      queryClient.refetchQueries('getRecycleData');
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

//List Api

export const useGetRecycleList = ({ limit, sortOrder, sortField, current, previous, first, last }) => {
  return useQuery({
    queryKey: ['getRecycleData', limit, sortOrder, sortField, current, previous, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.recylers}/all?previous=${previous}&current=${current}&sortField=${sortField}&sortOrder=${sortOrder}&limit=${limit}&first=${first}&last=${last}`
        )
        // .get(`${endpoints.recylers}/all?previous=0&current=1&sortField=id&sortOrder=asc&limit=5`)

        // previous=0&current=1&sortField=id&sortOrder=asc&limit=5
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
//for Editing
export const useGetRecycleId = ({ id }) => {
  return useQuery({
    queryKey: ['getRecycleDetailsById', id],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.recylers}/details?id=${id}`)
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
          console.log(e);
        });
    },
    onSuccess: ({ data }) => {
      return data;
    }
  });
};

// Submitted Edited List

export const UseGetRecycleEditedList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.recylers}/update `, data)
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
      queryClient.refetchQueries('getRecycleData');
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

// Recycler update status

export const useRecyclerStatusUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.recylers}/update-status`, data)
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
      queryClient.refetchQueries('getRecycleData');
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

/// Recycler User List

export const useGetRecyclerUserList = ({ limit, sortOrder, sortField, current, previous, type }) => {
  return useQuery({
    queryKey: ['getRecyclerUserData', limit, sortOrder, sortField, current, previous, type],
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
