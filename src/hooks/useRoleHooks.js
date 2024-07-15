import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
import { endpoints } from 'endpoints/endpoints';
export const useRoleAdd = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .post(`${endpoints.roles}/add`, data)
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
      queryClient.refetchQueries('getRoleData');
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

export const useGetRoleList = ({ sortOrder, sortField, current, previous, limit, first, last }) => {
  const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));

  return useQuery({
    queryKey: ['getRoleData', sortOrder, sortField, current, previous, limit, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.roles}/all?&limit=${limit}&previous=${previous}&current=${current}&sortField=${sortField}&sortOrder=${sortOrder}&first=${first}&last=${last}&organizationId=${userOrgId}`
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

//get Role Id

export const useGetRoleById = ({ id }) => {
  const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));

  return useQuery({
    queryKey: ['getDetailsById', id],
    queryFn: async () => {
      return await axiosInstance
        .post(`${endpoints.roles}/details`, {
          organizationId: userOrgId,
          roleId: id
        })
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

//Updated Role

export const useGetRoleEditedList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      return await axiosInstance
        .put(`${endpoints.roles}/update `, data)
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
      queryClient.refetchQueries('getRoleData');

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
