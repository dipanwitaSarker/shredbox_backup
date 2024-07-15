import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
// import { useNavigate } from 'react-router-dom';
import { endpoints } from 'endpoints/endpoints';

export const useOrganizationAdd = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .post(`${endpoints.organizations}/add`, data)
        .then((res) => {
          if (res?.status == 200) {
            toastConfig.type = 'success';
            setToast(toastConfig, res?.data.message);
          } else {
            toastConfig.type = 'error';
            setToast(toastConfig, res?.data.message);
          }
          // navigate(`/dashboard/organizations`);
          return res;
        })
        .catch((error) => {
          toastConfig.type = 'error';
          setToast(toastConfig, error.response.data.message);
        });
    },
    onSuccess: ({ data }) => {
      queryClient.refetchQueries('getOrgData');
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

export const useGetOrgList = ({ limit, sortOrder, sortField, current, previous, first, last }) => {
  return useQuery({
    queryKey: ['getOrgData', limit, sortOrder, sortField, current, previous, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.organizations}/all?limit=${limit}&sortOrder=${sortOrder}&sortField=${sortField}&current=${current}&previous=${previous}&first=${first}&last=${last}`
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

export const useGetOrgById = ({ id }) => {
  return useQuery({
    queryKey: ['getDetailsById', id],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.organizations}/${id}`)
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

export const useGetOrgEditedList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.organizations}/update `, data)
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
      queryClient.refetchQueries('getOrgData');
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
