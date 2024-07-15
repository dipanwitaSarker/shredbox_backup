import { useState } from 'react';
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
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
  //   Stack,
  //   Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import AnimateButton from 'ui-component/extended/AnimateButton';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSearchParams } from 'react-router-dom';
import { useCreatePassword } from 'hooks/useAuthHooks';

const RedirectingEmail = ({ ...others }) => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();


  const { mutate: createPassword, isPending: isLoadingPassword } = useCreatePassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showconfirmPassword);
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
        // email: '',
        // code: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        // email: Yup.string().email('Must be a valid email').max(50).required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be minimum 8 characters')
          .max(10, 'Password must be maximum 10 characters')
          .matches(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
          )
          .required('Password is required'),
        // code: Yup.string().required('Company Code is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
          // userId: searchParams.get('userId'),
          // id: searchParams.get('org'),
          // password: values.confirmPassword
          id: searchParams.get('id'),

          password: values.confirmPassword
        };

        createPassword(data);
        resetForm({});
        // Confirm Password
      }}
    >
      {({ errors, handleBlur, handleChange, touched, values }) => (
        <Form {...others}>
          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-confirm_password-login">Confirm Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm_password-login"
              type={showconfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              name="confirmPassword"
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
            {touched.confirmPassword && errors.confirmPassword && (
              <FormHelperText error id="standard-weight-helper-confirm_password-login">
                {errors.confirmPassword}
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
                disabled={isLoadingPassword}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                style={{
                  color: 'white'
                }}
              >
                {isLoadingPassword ? (
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

export default RedirectingEmail;
