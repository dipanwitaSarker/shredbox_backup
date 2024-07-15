// import { useState } from 'react';
// import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  // Checkbox,
  // Divider,
  FormControl,
  // FormControlLabel,
  FormHelperText,
  // Grid,
  InputLabel,
  OutlinedInput
  // Stack,
  // Typography
  // useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
// import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// route
// import { useNavigate } from 'react-router-dom';
// ============================|| FIREBASE - LOGIN ||============================ //
// import { userLogin } from 'store/actions/userAction';
// import { useDispatch } from 'react-redux';

import { useForgotPassword } from 'hooks/useAuthHooks';

const AuthForgotPassword = ({ ...others }) => {
  const theme = useTheme();

  const { mutate: forgotPassword, isPending: isLoadingForgotPassword } = useForgotPassword();

  return (
    <>
      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email address').required('Email Address is required')
        })}
        onSubmit={async (values) => {
          const submitData = {
            email: values.email
          };
          forgotPassword(submitData);

        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
                inputProps={{}}
                autoComplete="off"
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                  sx={{
                    fontSize: '13.8px'
                  }}
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isLoadingForgotPassword}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{
                    color: 'white'
                  }}
                >
                  {isLoadingForgotPassword ? (
                    <>
                      <CircularProgress
                        sx={{
                          color: 'white',
                          height: 20,
                          width: 20
                        }}
                      />
                    </>
                  ) : (
                    ' Send Link'
                  )}
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthForgotPassword;
