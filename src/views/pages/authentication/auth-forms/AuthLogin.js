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
  OutlinedInput,
  Typography
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

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import Google from 'assets/images/icons/social-google.svg';

// route
import { Link, useNavigate } from 'react-router-dom';
// ============================|| FIREBASE - LOGIN ||============================ //
import { userLogin } from 'store/actions/userAction';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/system';

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  // const scriptedRef = useScriptRef();
  // const store = useSelector((store) => store);
  const dispatch = useDispatch();
  
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  // const [checked, setChecked] = useState(true);
  const navigate = useNavigate();
  // const googleHandler = async () => {
  //   console.error('Login');
  // };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // console.log('Loading', isLoading);
  return (
    <>
      <Formik
        initialValues={{
          email: '',
          // code: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email address').required('Email Address is required'),
          //email: Yup.string().email('Must be a valid email').max(50).required('Email is required'),
          //  code: Yup.string().required('Company Code is required').max(10, 'Company code must be 8 characters'),
          // password: Yup.string().max(255).required('Password is required')
          password: Yup.string()
            .min(8, 'Password must be minimum 8 characters')
            .max(10, 'Password must be maximum 10 characters')
            .matches(
              /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
              'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
            )
            .required('Password is required')
        })}
        onSubmit={async (values) => {
          // try {
          //   if (scriptedRef.current) {
          //     setStatus({ success: true });
          //     setSubmitting(false);
          //   }
          // } catch (err) {
          //   console.error(err);
          //   if (scriptedRef.current) {
          //     setStatus({ success: false });
          //     setErrors({ submit: err.message });
          //     setSubmitting(false);
          //   }
          // }
          dispatch(userLogin(values, navigate, setIsLoading));
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

            {/* code */}
            {/* <FormControl fullWidth error={Boolean(touched.code && errors.code)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-code-login">Company Code</InputLabel>
              <OutlinedInput
                id="outlined-adornment-code-login"
                type="code"
                value={values.code}
                name="code"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Company Code"
                inputProps={{}}
                autoComplete="off"
              />
              {touched.code && errors.code && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-code-login"
                  sx={{
                    fontSize: '13.8px'
                  }}
                >
                  {errors.code}
                </FormHelperText>
              )}
            </FormControl> */}

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
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                  sx={{
                    fontSize: '13.8px'
                  }}
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: 'none', cursor: 'pointer', textAlign: 'right', marginLeft: 'auto' }}
                component={Link}
                to="/forgot-password"
              >
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isLoading}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{
                    color: 'white'
                  }}
                >
                  {isLoading ? (
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
                    ' Sign in'
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

export default FirebaseLogin;
