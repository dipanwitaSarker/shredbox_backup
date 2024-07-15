import React from 'react';
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
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
  //   Stack,
  //   Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useChangePassword } from 'hooks/useChangePasswordHooks';
// import { useSearchParams } from 'react-router-dom';

const ResetPasswordForm = ({ ...others }) => {
  const theme = useTheme();
  const userData = JSON.parse(localStorage.getItem('userData'));
  // console.log('🚀 ~ userData:', userData);
  // const [searchParams] = useSearchParams();
  // console.log('🚀 ~ ResetPasswordForm ~ searchParams:', searchParams);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: changePassword, isPending: isLoadingChangePassword } = useChangePassword();

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showconfirmPassword);
  };

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Formik
      initialValues={{
        old_password: '',
        new_password: '',
        confirm_password: ''
      }}
      validationSchema={Yup.object().shape({
        old_password: Yup.string()
          .min(8, 'Password must be minimum 8 characters')
          .max(10, 'Password must be maximum 10 characters')
          .matches(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
          )
          .required('Old Password is required'),
        new_password: Yup.string()
          .min(8, 'Password must be minimum 8 characters')
          .max(10, 'Password must be maximum 10 characters')
          .matches(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
          )
          .required(' New Password is required'),

        confirm_password: Yup.string()
          .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
          .min(8, 'Password must be minimum 8 characters')
          .max(10, 'Password must be maximum 10 characters')
          .matches(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
          )
          .required('Confirm Password is required')
      })}
      onSubmit={async (values, { resetForm }) => {
        const data = {
          id: userData?.id,
          oldPassword: values.old_password,
          newPassword: values.confirm_password
        };
        // console.log('🚀 ~ onSubmit={ ~ data:', data);

        changePassword(data);
        resetForm({});
      }}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => (
        <Form {...others}>
          <FormControl fullWidth error={Boolean(touched.old_password && errors.old_password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-old_password"> Old Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-old-password"
              type={showOldPassword ? 'text' : 'password'}
              value={values.old_password}
              name="old_password"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle old_password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownOldPassword}
                    edge="end"
                    size="large"
                  >
                    {showOldPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
              inputProps={{}}
            />
            {touched.old_password && errors.old_password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.old_password}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.new_password && errors.new_password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-new_password-login">New Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.new_password}
              name="new_password"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new_password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label=" New Password"
              inputProps={{}}
            />
            {touched.new_password && errors.new_password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.new_password}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.confirm_password && errors.confirm_password)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-confirm_password-login">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm_password-login"
              type={showconfirmPassword ? 'text' : 'password'}
              value={values.confirm_password}
              name="confirm_password"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm_password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                    size="large"
                  >
                    {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
              inputProps={{}}
            />
            {touched.confirm_password && errors.confirm_password && (
              <FormHelperText error id="standard-weight-helper-confirm_password-login">
                {errors.confirm_password}
              </FormHelperText>
            )}
          </FormControl>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={isLoadingChangePassword}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                style={{
                  color: 'white'
                }}
              >
                {isLoadingChangePassword ? (
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
                  <> Submit</>
                )}
              </Button>
            </AnimateButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
