// import axiosInstance from 'utils/axiosInstance';
// import setAuthToken from 'store/helper/setAuthToken';
import axiosInstance from 'utils/axiosInstance';
import { setToast, toastConfig } from 'utils/commonUtil';
import { endpoints } from 'endpoints/endpoints';
export const userLoginHelper = (data) => {
  return {
    type: 'SET_USER_AUTH',
    payload: data
  };
};

const userLogoutHelper = (data) => {
  return {
    type: 'DELETE_USERS_DATA',
    payload: data
  };
};

export const userLogin = (loginCredentials, history, setIsLoading) => {
  return async (dispatch) => {
    try {
      setIsLoading(true);
      // localStorage.setItem('userJwtToken', true);
      // history('/dashboard/default');
      //  setIsLoading(false);
      await axiosInstance
        .post(`${endpoints.users}/login`, loginCredentials)
        .then((res) => {
          console.log('Res', res);
          if (res.status === 200) {
            setIsLoading(false);

            localStorage.setItem('userJwtToken', res?.data?.token);
            dispatch(userLoginHelper(res.data?.user));
            localStorage.setItem('userData', JSON.stringify(res?.data?.user));
            localStorage.setItem('userOrgId', JSON.stringify(res?.data?.user?.id));
            localStorage.setItem('userOrgName', JSON.stringify(res?.data?.user?.organizationName));

            toastConfig.type = 'success';
            setToast(toastConfig, 'Successfully login!');
            history('/dashboard/default');
          }
        })
        .catch(() => {
          setIsLoading(false);
          // console.log('err--->' + err);
          toastConfig.type = 'error';
          setToast(toastConfig, 'Opps! Invalid Credentials !');
        });
    } catch (err) {
      if (err.response) {
        const message = { message: err.response.data.message };
        dispatch({
          type: 'SET_LOGIN_ERRORS',
          payload: message
        });
      } else {
        const message = { message: err };
        // console.log(message);
        dispatch({
          type: 'SET_LOGIN_ERRORS',
          payload: message
        });
      }
    }
  };
};

export const userLogout = (history) => {
  return (dispatch) => {
    localStorage.removeItem('userJwtToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('userOrgId');
    localStorage.removeItem('userOrgName');
    // setAuthToken(false);
    dispatch(userLogoutHelper({}));
    history('/');
  };
};
