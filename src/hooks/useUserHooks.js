import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
import { endpoints } from 'endpoints/endpoints';
export const useUserAddUnderOrg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .post(`${endpoints.organizations}/users/add`, data)
        .then((res) => {
          if (res?.status == 200) {
            if (res?.data?.status === false) {
              toastConfig.type = 'error';
              setToast(toastConfig, res?.data.message);
            } else {
              toastConfig.type = 'success';
              setToast(toastConfig, res?.data.message);
            }
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
      queryClient.refetchQueries('getUserDataUnderOrg');
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

//All Users List

export const useGetUserListUnderOrg = ({ sortOrder, sortField, current, previous, limit, first, last }) => {
  const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));

  return useQuery({
    queryKey: ['getUserDataUnderOrg', sortOrder, sortField, current, previous, limit, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.organizations}/users/all?&limit=${limit}&previous=${previous}&current=${current}&sortField=${sortField}&sortOrder=${sortOrder}&first=${first}&last=${last}&organizationId=${userOrgId}`
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

// Role By Id

export const useGetUserByIdUnderOrg = ({ id }) => {
  const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));

  return useQuery({
    queryKey: ['getUserDetailsIdUnderOrg', id],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.organizations}/users/details?organizationId=${userOrgId}&userId=${id}`)
        .then((res) => {
          if (res?.status == 200) {
            return res?.data;
          } else {
            return [];
          }
        })
        .catch((e) => {
          toastConfig.type = 'error';
          setToast(toastConfig, e.response.data.message);
          console.log(e);
        });
    },
    onSuccess: ({ data }) => {
      return data;
    }
  });
};

// User Edit Api

export const useGetUserEditedListUnderOrg = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.organizations}/users/update`, data)
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
      queryClient.refetchQueries('getUserDataUnderOrg');

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

// UserUpdataeStatus Under org

export const useUserUpdateStatusUnderOrg = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.organizations}/users/update/status`, data)
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
      queryClient.refetchQueries('getUserDataUnderOrg');
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

//users outside organization

export const useUserAdd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .post(`${endpoints.users}/add`, data)
        .then((res) => {
          if (res?.status == 200) {
            if (res?.data?.status === false) {
              toastConfig.type = 'error';
              setToast(toastConfig, res?.data.message);
            } else {
              toastConfig.type = 'success';
              setToast(toastConfig, res?.data.message);
            }
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
      queryClient.refetchQueries('getUserOutsideOrg');
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

//All Users Outside Org

export const useGetUserList = ({ sortOrder, sortField, current, previous, limit, first, last }) => {
  return useQuery({
    queryKey: ['getUserOutsideOrg', sortOrder, sortField, current, previous, limit, first, last],
    queryFn: async () => {
      return await axiosInstance
        .get(
          `${endpoints.users}/all?&limit=${limit}&previous=${previous}&current=${current}&sortField=${sortField}&sortOrder=${sortOrder}&first=${first}&last=${last}`
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

// edit without org
export const useGetUserEdited = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.users}/update`, data)
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
      queryClient.refetchQueries('getUserOutsideOrg');

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

// get details by id
export const useGetUserById = ({ id }) => {
  return useQuery({
    queryKey: ['getUserDetailsIdOutsideOrg', id],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.users}/details/${id}`)
        .then((res) => {
          if (res?.status == 200) {
            return res?.data;
          } else {
            return [];
          }
        })
        .catch((e) => {
          toastConfig.type = 'error';
          setToast(toastConfig, e.response.data.message);
          console.log(e);
        });
    },
    onSuccess: ({ data }) => {
      return data;
    }
  });
};

// update user status
export const useUserUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axiosInstance
        .put(`${endpoints.users}/update/status`, data)
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
      queryClient.refetchQueries('getUserOutsideOrg');
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
