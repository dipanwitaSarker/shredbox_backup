import { Form } from 'formik';
import React from 'react';
import { gridSpacing } from 'store/constant';
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  Button,
  CircularProgress,
  Select,
  MenuItem
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import AnimateButton from 'ui-component/extended/AnimateButton';
import { useEffect } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import { useGetProfileData } from 'hooks/useProfile';

const ProfileForm = ({
  errors,
  handleBlur,
  handleChange,

  isSubmitting,
  touched,
  values,
  setFieldValue,
  isLoadingProfileUpdate,
  profileDetails
}) => {
  const theme = useTheme();
  // const userData = JSON.parse(localStorage.getItem('userData'));
  // console.log('🚀 ~ userData:', userData);
  // const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));
  // const { data: profileDetails, isLoading: isProfileLoading } = useGetProfileData({
  //   orgID: userOrgId,
  //   userID: userData?.id
  // });
  // console.log('🚀 ~ ProfileForm ~ profileDetails:', profileDetails);
  useEffect(() => {
    if (profileDetails) {
      setFieldValue('fname', profileDetails?.firstName);
      setFieldValue('lname', profileDetails?.lastName);
      setFieldValue('email', profileDetails?.email);
      setFieldValue('phone', profileDetails?.phone);
      setFieldValue('title', profileDetails?.title);
      setFieldValue('prefix', profileDetails?.prefix);
      setFieldValue('address', profileDetails?.address);
    }
  }, []);
  return (
    <>
      <Form>
        <Grid container spacing={gridSpacing} sx={{ alignContent: 'center' }}>
          <Grid item xs={12}>
            <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
              Profile Details
            </Typography>
            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                {/* <FormControl fullWidth error={Boolean(touched.prefix && errors.prefix)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-prefix"> Choose Prefix</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-prefix"
                    type="text"
                    value={values.prefix}
                    name="prefix"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Choose Prefix"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.prefix && errors.prefix && (
                    <FormHelperText error id="standard-weight-helper-text-prefix">
                      {errors.prefix}
                    </FormHelperText>
                  )}
                </FormControl> */}
                <FormControl fullWidth error={Boolean(touched.title && errors.title)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-prefix" id="retailer-primary-title">
                    {' '}
                    Choose Prefix
                  </InputLabel>

                  <Select
                    label="Choose  Prefix "
                    value={values.prefix}
                    onChange={handleChange}
                    name="prefix"
                    inputProps={{ 'aria-label': 'Without label' }}
                    labelId="retailer-primary-title-label"
                  >
                    <MenuItem value={'Mr.'}>Mr.</MenuItem>
                    <MenuItem value={'Mrs.'}>Mrs.</MenuItem>
                  </Select>

                  {touched.prefix && errors.prefix && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-prefix"
                      sx={{
                        fontSize: '13.8px'
                      }}
                    >
                      {errors.prefix}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.fname && errors.fname)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-fname"> First name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-fname"
                    type="text"
                    value={values.fname}
                    name="fname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="First Name"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.fname && errors.fname && (
                    <FormHelperText error id="standard-weight-helper-text-fname">
                      {errors.fname}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.lname && errors.lname)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-lname"> Last Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-lname"
                    type="text"
                    value={values.lname}
                    name="lname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Last Name"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.lname && errors.lname && (
                    <FormHelperText error id="standard-weight-helper-text-lname">
                      {errors.lname}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.title && errors.title)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-title"> Title</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Title"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.title && errors.title && (
                    <FormHelperText error id="standard-weight-helper-text-title">
                      {errors.title}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email"> Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="text"
                    value={values.email}
                    name="email"
                    disabled
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Email"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="standard-weight-helper-text-email">
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-number"> Phone</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-number"
                    type="text"
                    value={values.phone}
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Phone"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.phone && errors.phone && (
                    <FormHelperText error id="standard-weight-helper-text-number">
                      {errors.phone}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.address && errors.address)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-address"> Address</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-address"
                    type="text"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label="Address"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error id="standard-weight-helper-text-number">
                      {errors.address}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 5, justifyContent: 'center', textAlign: 'center' }}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{
                    color: 'white',
                    minWidth: '200px',
                    margin: '0px auto'
                  }}
                >
                  {isLoadingProfileUpdate ? (
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
                    'Update Profile'
                  )}
                </Button>
              </AnimateButton>
            </Box>
          </Grid>
        </Grid>
      </Form>
    </>
  );
};

export default ProfileForm;
