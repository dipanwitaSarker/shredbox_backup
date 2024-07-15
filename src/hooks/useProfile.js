import { useQuery } from '@tanstack/react-query';
import { endpoints } from 'endpoints/endpoints';
import axiosInstance from 'utils/axiosInstance';

export const useGetProfileData = ({ orgID, userID }) => {
  return useQuery({
    queryKey: ['getProfileData', orgID, userID],
    queryFn: async () => {
      return await axiosInstance
        .get(`${endpoints.users}/details?organizationId=${orgID}&userId=${userID}`)
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
