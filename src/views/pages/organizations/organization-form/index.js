import PropTypes from 'prop-types';

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  Checkbox,
  CircularProgress,
  Select,
  MenuItem
  // Select,
  // MenuItem
} from '@mui/material';
import { Box } from '@mui/system';
// import { Formik } from 'formik';
import React from 'react';
// import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
// import { Typography } from '@mui/material';
// import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
// import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';
import { Form } from 'formik';
import { useEffect } from 'react';
// import PhoneInput from 'react-phone-number-input';
// import PhoneInput from 'react-phone-number-input';
// import { gridSpacing } from 'store/constant';
const OrganizationForm = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  // isSubmitting,
  touched,
  values,
  isLoadingOrg,
  setFieldValue,
  orgDetails
}) => {
  const theme = useTheme();
  useEffect(() => {
    if (orgDetails) {
      setFieldValue('OrganizationName', orgDetails?.name);
      setFieldValue('OrganizationAddress', orgDetails?.address?.details);
      setFieldValue('OrganizationCity', orgDetails?.address?.city);

      setFieldValue('OrganizationWeb', orgDetails?.websiteUrl);
      setFieldValue('OrganizationPhone', orgDetails?.phone);

      setFieldValue('isChecked', orgDetails?.isChecked);
      setFieldValue('associateEmpName', orgDetails?.contact?.primary?.employeeName);
      setFieldValue('associateEmpEmail', orgDetails?.contact?.primary?.employeeEmail);
      setFieldValue('associateEmpPhone', orgDetails?.contact?.primary?.employeePhone);
      setFieldValue('SecondaryEmpName', orgDetails?.contact?.secondary?.employeeName);
      setFieldValue('SecondaryEmpEmail', orgDetails?.contact?.secondary?.employeeEmail);
      setFieldValue('SecondaryEmpPhone', orgDetails?.contact?.secondary?.employeePhone);
    }
  }, [orgDetails, setFieldValue]);
  return (
    <>
      <>
        <Form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing} sx={{ alignContent: 'center' }}>
            <Grid item xs={12}>
              <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
                Organization details
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={12} md={6} sm={6} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.OrganizationName && errors.OrganizationName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Organization Name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.OrganizationName}
                      name="OrganizationName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization Name"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.OrganizationName && errors.OrganizationName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.OrganizationName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.OrganizationWeb && errors.OrganizationWeb)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Organization Web</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.OrganizationWeb}
                      name="OrganizationWeb"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization Web"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.OrganizationWeb && errors.OrganizationWeb && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.OrganizationWeb}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.OrganizationPhone && errors.OrganizationPhone)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Organization Phone</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.OrganizationPhone}
                      name="OrganizationPhone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization Phone"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.OrganizationPhone && errors.OrganizationPhone && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.OrganizationPhone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.OrganizationAddress && errors.OrganizationAddress)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Organization Address</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.OrganizationAddress}
                      name="OrganizationAddress"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization Address"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.OrganizationAddress && errors.OrganizationAddress && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.OrganizationAddress}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.OrganizationCity && errors.OrganizationCity)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Organization City</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.OrganizationCity}
                      name="OrganizationCity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization City"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.OrganizationCity && errors.OrganizationCity && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.OrganizationCity}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.OrganizationState && errors.OrganizationState)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    {/* <InputLabel htmlFor="outlined-adornment-email-login"> Organization State</InputLabel> */}
                    {/* <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.OrganizationState}
                      name="OrganizationState"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization State"
                      inputProps={{}}
                      autoComplete="off"
                    /> */}

                    <Select
                      value={values.OrganizationState}
                      onChange={handleChange}
                      name="OrganizationState"
                      displayEmpty
                      // inputProps={{ 'aria-label': 'Without label' }}
                      labelId="outlined-adornment-state"
                      id="outlined-adornment-state"
                    >
                      <MenuItem value="California">California</MenuItem>
                    </Select>
                    {touched.OrganizationState && errors.OrganizationState && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.OrganizationState}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.OrganizationCountry && errors.OrganizationCountry)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    {/* <InputLabel htmlFor="outlined-adornment-email-login"> Organization Country</InputLabel> */}
                    {/* <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.OrganizationCountry}
                      name="OrganizationCountry"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization Country"
                      inputProps={{}}
                      autoComplete="off"
                    /> */}
                    <Select
                      value={values.OrganizationCountry}
                      onChange={handleChange}
                      name="OrganizationCountry"
                      displayEmpty
                      // inputProps={{ 'aria-label': 'Without label' }}
                      labelId="outlined-adornment-state"
                      id="outlined-adornment-state"
                      // defaultValue={'USA'}
                    >
                      <MenuItem value="USA">USA</MenuItem>
                    </Select>
                    {touched.country && errors.country && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.country}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <Typography component="h4" variant="h3" sx={{ mr: 1, pb: 1.8 }}>
                    Primary Contact
                  </Typography>

                  {/* Associate Employee name */}

                  <FormControl
                    fullWidth
                    error={Boolean(touched.associateEmpName && errors.associateEmpName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Employee name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.associateEmpName}
                      name="associateEmpName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Employee Name"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.associateEmpName && errors.associateEmpName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.associateEmpName}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {/* Associate Employee Email */}
                  <FormControl
                    fullWidth
                    error={Boolean(touched.associateEmpEmail && errors.associateEmpEmail)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Employee Email</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="email"
                      value={values.associateEmpEmail}
                      name="associateEmpEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Associate Employee Email"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.associateEmpEmail && errors.associateEmpEmail && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.associateEmpEmail}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {/* Associate Employee Phone */}
                  <FormControl
                    fullWidth
                    error={Boolean(touched.associateEmpPhone && errors.associateEmpPhone)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Employee Phone</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.associateEmpPhone}
                      name="associateEmpPhone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Associate Employee Phone"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {/* <PhoneInput
                      id="outlined-adornment-email-login"
                      placeholder="Enter phone number"
                      value={values.associateEmpPhone}
                      name="associateEmpPhone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Associate Employee Phone"
                      autoComplete="off"
                    
                    /> */}
                    {/* {console.log(values.associateEmpPhone)} */}
                    {touched.associateEmpPhone && errors.associateEmpPhone && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.associateEmpPhone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '-5px' }}>
                      <Checkbox
                        // defaultChecked={false}
                        checked={values.isChecked}
                        name="isChecked"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue('isChecked', e.target.checked);
                          if (e.target.checked) {
                            setFieldValue('SecondaryEmpName', values.associateEmpName);
                            setFieldValue('SecondaryEmpEmail', values.associateEmpEmail);
                            setFieldValue('SecondaryEmpPhone', values.associateEmpPhone);
                          } else {
                            setFieldValue('SecondaryEmpName', values.SecondaryEmpName);
                            setFieldValue('SecondaryEmpEmail', values.SecondaryEmpEmail);
                            setFieldValue('SecondaryEmpPhone', values.SecondaryEmpPhone);
                          }
                        }}
                        value={values.isChecked}
                      />
                      <Typography component="h4" variant="h3">
                        Secondary Contact
                      </Typography>
                    </Box>
                  </FormControl>
                  {/* Associate Employee name */}

                  <FormControl
                    fullWidth
                    error={Boolean(touched.SecondaryEmpName && errors.SecondaryEmpName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Employee name</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.SecondaryEmpName}
                      name="SecondaryEmpName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Associate Employee Name"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.SecondaryEmpName && errors.SecondaryEmpName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.SecondaryEmpName}
                      </FormHelperText>
                    )}
                  </FormControl>

                  {/* Associate Employee Email */}
                  <FormControl
                    fullWidth
                    error={Boolean(touched.SecondaryEmpEmail && errors.SecondaryEmpEmail)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Employee Email</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="email"
                      value={values.SecondaryEmpEmail}
                      // value={values.isChecked ? values.associateEmpEmail : values.SecondaryEmpEmail}
                      name="SecondaryEmpEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Associate Employee Email"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.SecondaryEmpEmail && errors.SecondaryEmpEmail && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.SecondaryEmpEmail}
                      </FormHelperText>
                    )}
                  </FormControl>
                  {/* Associate Employee Phone */}
                  <FormControl
                    fullWidth
                    error={Boolean(touched.SecondaryEmpPhone && errors.SecondaryEmpPhone)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Employee Phone</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.SecondaryEmpPhone}
                      // value={values.isChecked ? values.associateEmpPhone : values.SecondaryEmpPhone}
                      name="SecondaryEmpPhone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Associate Employee Phone"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.SecondaryEmpPhone && errors.SecondaryEmpPhone && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.SecondaryEmpPhone}
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
                    disabled={isLoadingOrg}
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
                    {isLoadingOrg ? (
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
                      'Submit'
                    )}
                  </Button>
                </AnimateButton>
              </Box>
            </Grid>
          </Grid>
        </Form>
      </>
      {/* </Formik> */}
      {/* </MainCard> */}
    </>
  );
};

OrganizationForm.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
};

export default OrganizationForm;
