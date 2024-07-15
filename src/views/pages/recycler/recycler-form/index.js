import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  // MenuItem,
  OutlinedInput,
  Select,
  // TextField,
  // Select,
  Typography
} from '@mui/material';

import { Box } from '@mui/system';
import { Form } from 'formik';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useEffect } from 'react';
const RecyclerForm = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,

  touched,
  values,
  isLoadingEnterprise,
  setFieldValue,
  recycleDetails,
  btnName
  // id
}) => {
  const theme = useTheme();
  useEffect(() => {
    if (recycleDetails) {
      setFieldValue('RecyclerName', recycleDetails?.organizationName);

      setFieldValue('RecyclerWeb', recycleDetails?.website ? recycleDetails?.website : '');

      setFieldValue('title', recycleDetails?.primaryContact?.prefix);
      setFieldValue('firstName', recycleDetails?.primaryContact?.firstName);

      setFieldValue('lastName', recycleDetails?.primaryContact?.lastName);
      setFieldValue('designation', recycleDetails?.primaryContact?.title);
      setFieldValue('associateEmpEmail', recycleDetails?.primaryContact?.email);
      setFieldValue('associateEmpPhone', recycleDetails?.primaryContact?.phone);
      setFieldValue('associateEmpAdd', recycleDetails?.primaryContact?.address);
      setFieldValue('primaryId', recycleDetails?.primaryContact?.id);

      setFieldValue('recycler_radius', recycleDetails?.serviceRadius);

      setFieldValue('isChecked', recycleDetails?.isChecked);

      setFieldValue('secondaryTitle', recycleDetails?.secondaryContact?.prefix);
      setFieldValue('secondaryFirstName', recycleDetails?.secondaryContact?.firstName);

      setFieldValue('secondaryLastName', recycleDetails?.secondaryContact?.lastName);
      setFieldValue('secondaryDesignation', recycleDetails?.secondaryContact?.title);
      setFieldValue('SecondaryEmpEmail', recycleDetails?.secondaryContact?.email);
      setFieldValue('SecondaryEmpPhone', recycleDetails?.secondaryContact?.phone);
      setFieldValue('SecondaryEmpAdd', recycleDetails?.secondaryContact?.address);
      setFieldValue('SecondaryId', recycleDetails?.secondaryContact?.id);

      setFieldValue('EmpFullAddress', recycleDetails?.address?.fullAddress ? recycleDetails?.address?.fullAddress : '');
      setFieldValue('EmpCity', recycleDetails?.address?.city ? recycleDetails?.address?.city : '');
      setFieldValue('EmpState', recycleDetails?.address?.state ? recycleDetails?.address?.state : '');
      setFieldValue('EmpCountry', recycleDetails?.address?.country ? recycleDetails?.address?.country : '');
      setFieldValue('EmpPostal_Code', recycleDetails?.address?.zip ? recycleDetails?.address?.zip : '');
      setFieldValue('addressId', recycleDetails?.address?.id);
    }
  }, [setFieldValue, recycleDetails]);
  return (
    <>
      <>
        <Form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={gridSpacing} sx={{ alignContent: 'center' }}>
            <Grid item xs={12}>
              <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
                Recycler Organization details
              </Typography>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.RecyclerName && errors.RecyclerName)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Recycler Name *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.RecyclerName}
                      name="RecyclerName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Recycler Name *"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.RecyclerName && errors.RecyclerName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.RecyclerName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.RecyclerCode && errors.RecyclerCode)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Recycler Code *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.RecyclerCode}
                      name="RecyclerCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Recycler Code *"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.RecyclerCode && errors.RecyclerCode && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.RecyclerCode}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.RecyclerWeb && errors.RecyclerWeb)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Recycler Website Address</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.RecyclerWeb}
                      name="RecyclerWeb"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Recycler Web"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.RecyclerWeb && errors.RecyclerWeb && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.RecyclerWeb}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.recycler_radius && errors.recycler_radius)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-service-radius"> Recycler Service Radius</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-service-radius"
                      type="text"
                      value={values.recycler_radius}
                      name="recycler_radius"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Recycler Service Radius"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.recycler_radius && errors.recycler_radius && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.recycler_radius}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                {/* <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.RecyclerCity && errors.RecyclerCity)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Recycler City</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.RecyclerCity}
                      name="RecyclerCity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization City"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.RecyclerCity && errors.RecyclerCity && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.RecyclerCity}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

                {/* <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.RecyclerState && errors.RecyclerState)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Recycler State</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.RecyclerState}
                      name="RecyclerState"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization State"
                      inputProps={{}}
                      autoComplete="off"
                    />

                    {touched.RecyclerState && errors.RecyclerState && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.RecyclerState}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}

                {/* <Grid item lg={6} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.RecyclerCountry && errors.RecyclerCountry)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Recycler Country</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.RecyclerCountry}
                      name="RecyclerCountry"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Organization Country"
                      inputProps={{}}
                      autoComplete="off"
                    />

                    {touched.RecyclerCountry && errors.RecyclerCountry && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.RecyclerCountry}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                  <div style={{ border: '1px solid #6fd74b', borderRadius: '6px' }}>
                    <FormControl sx={{ width: '100%', display: 'block', padding: '18px 15px 20px', background: '#6fd74b' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '-5px',
                          color: '#fff',
                          fontWeight: '500',
                          fontSize: '24px',
                          width: '100%'
                        }}
                      >
                        <Typography component="h4" variant="h3" sx={{ color: '#fff' }}>
                          Primary Contact
                        </Typography>
                      </Box>
                    </FormControl>
                    {/* Associate Employee name */}
                    <div style={{ padding: '10px 15px 15px' }}>
                      <FormControl fullWidth error={Boolean(touched.title && errors.title)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-prefix" id="retailer-primary-title">
                          {' '}
                          Choose Prefix *
                        </InputLabel>

                        <Select
                          label="Choose  Prefix *"
                          value={values.title}
                          onChange={handleChange}
                          name="title"
                          inputProps={{ 'aria-label': 'Without label' }}
                          labelId="retailer-primary-title-label"
                        >
                          <MenuItem value={'Mr.'}>Mr.</MenuItem>
                          <MenuItem value={'Mrs.'}>Mrs.</MenuItem>
                        </Select>
                        {/* 
                        <OutlinedInput
                      id="outlined-adornment-prefix"
                      type="text"
                      value={values.title}
                      name="title"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Choose Prefix *"
                      inputProps={{}}
                      autoComplete="off"
                    /> */}

                        {touched.title && errors.title && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.title}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.firstName && errors.firstName)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-first-name"> Employee First Name *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-first-name"
                          type="text"
                          value={values.firstName}
                          name="firstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label=" Employee First Name"
                          inputProps={{}}
                          autoComplete="off"
                        />
                        {touched.firstName && errors.firstName && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-first-name"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.firstName}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-last-name"> Employee Last Name *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-last-name"
                          type="text"
                          value={values.lastName}
                          name="lastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label=" Employee Last Name"
                          inputProps={{}}
                          autoComplete="off"
                        />
                        {touched.lastName && errors.lastName && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.lastName}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.designation && errors.designation)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-designation" id="retailer-primary-designation">
                          {' '}
                          Employee Title *
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-designation"
                          type="text"
                          value={values.designation}
                          name="designation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Employee Title"
                          inputProps={{}}
                          autoComplete="off"
                        />

                        {/* <Select
                          label="Choose  Title *"
                          value={values.designation}
                          onChange={handleChange}
                          name="designation"
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          labelId="outlined-adornment-designation-label"
                          // id="outlined-adornment-designation"
                        > */}
                        {/* {allRecyclerList?.recyclers?.map((item, i) => (
                        <MenuItem value={item?.id} key={i}>
                          {item.name}
                        </MenuItem>
                      ))} */}
                        {/* <MenuItem value={''}>Select </MenuItem> */}
                        {/* <MenuItem value={'Ceo'}>Ceo</MenuItem>
                          <MenuItem value={'Manager'}>Manager</MenuItem>
                        </Select> */}
                        {touched.designation && errors.designation && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.designation}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.associateEmpEmail && errors.associateEmpEmail)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-email-login"> Employee Email *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-login"
                          type="email"
                          value={values.associateEmpEmail}
                          name="associateEmpEmail"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label=" Employee Email *"
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
                        <InputLabel htmlFor="outlined-adornment-email-phone"> Employee Phone *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-phone"
                          type="text"
                          value={values.associateEmpPhone}
                          name="associateEmpPhone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Associate Employee Phone"
                          inputProps={{}}
                          autoComplete="off"
                        />

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

                      <FormControl
                        fullWidth
                        error={Boolean(touched.associateEmpAdd && errors.associateEmpAdd)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-address-primary">Employee Address *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-address-primary"
                          type="text"
                          value={values.associateEmpAdd}
                          name="associateEmpAdd"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Address Details *"
                          inputProps={{}}
                          autoComplete="off"
                        />
                        {touched.associateEmpAdd && errors.associateEmpAdd && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.associateEmpAdd}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    {/* <FormControl
                    fullWidth
                    error={Boolean(touched.associateEmpAdd && errors.associateEmpAdd)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login">Address Details *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.associateEmpAdd}
                      name="associateEmpAdd"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Address Details *"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.associateEmpAdd && errors.associateEmpAdd && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.associateEmpAdd}
                      </FormHelperText>
                    )}
                  </FormControl> */}
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={{ border: '1px solid #6fd74b', borderRadius: '6px' }}>
                    <FormControl sx={{ width: '100%', display: 'block', padding: '10px 15px', background: '#6fd74b' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '-5px',
                          color: '#fff',
                          fontWeight: '500',
                          fontSize: '24px',
                          width: '100%'
                        }}
                      >
                        <Checkbox
                          sx={{ color: '#fff!important', borderColor: '#fff' }}
                          // defaultChecked={false}
                          checked={values.isChecked}
                          name="isChecked"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            setFieldValue('isChecked', e.target.checked);
                            if (e.target.checked) {
                              setFieldValue('secondaryTitle', values.title);
                              setFieldValue('secondaryFirstName', values.firstName);
                              setFieldValue('secondaryLastName', values.lastName);
                              setFieldValue('secondaryDesignation', values.designation),
                                setFieldValue('SecondaryEmpEmail', values.associateEmpEmail),
                                setFieldValue('SecondaryEmpPhone', values.associateEmpPhone);
                              setFieldValue('SecondaryEmpAdd', values.associateEmpAdd);
                            } else {
                              setFieldValue('secondaryTitle', values.secondaryTitle);
                              setFieldValue('secondaryFirstName', values.secondaryFirstName);
                              setFieldValue('secondaryLastName', values.secondaryLastName);
                              setFieldValue('secondaryDesignation', values.secondaryDesignation),
                                setFieldValue('SecondaryEmpEmail', values.SecondaryEmpEmail),
                                setFieldValue('SecondaryEmpPhone', values.SecondaryEmpPhone);
                              setFieldValue('SecondaryEmpAdd', values.SecondaryEmpAdd);
                            }
                          }}
                          value={values.isChecked}
                        />
                        <Typography component="h4" variant="h3" sx={{ color: '#fff' }}>
                          Secondary Contact
                        </Typography>
                      </Box>
                    </FormControl>
                    {/* Associate Employee name */}
                    <div style={{ padding: '10px 15px 15px' }}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.secondaryTitle && errors.secondaryTitle)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-email-title" id="retailer-secondary-title">
                          {' '}
                          Choose Prefix{' '}
                        </InputLabel>
                        {/* <OutlinedInput
                      id="outlined-adornment-email-title"
                      type="text"
                      value={values.secondaryTitle}
                      name="secondaryTitle"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Choose Prefix"
                      inputProps={{}}
                      autoComplete="off"
                    /> */}
                        <Select
                          label="Choose  Prefix *"
                          value={values.secondaryTitle}
                          onChange={handleChange}
                          name="secondaryTitle"
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          labelId="outlined-adornment-state"
                          id="outlined-adornment-state"
                        >
                          {/* {allRecyclerList?.recyclers?.map((item, i) => (
                        <MenuItem value={item?.id} key={i}>
                          {item.name}
                        </MenuItem>
                      ))} */}
                          {/* <MenuItem value={''}>Select </MenuItem> */}
                          <MenuItem value={'Mr.'}>Mr.</MenuItem>
                          <MenuItem value={'Mrs.'}>Mrs.</MenuItem>
                        </Select>

                        {touched.secondaryTitle && errors.secondaryTitle && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-title"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.secondaryTitle}
                          </FormHelperText>
                        )}
                      </FormControl>
                      {/* Associate Employee Email */}

                      <FormControl
                        fullWidth
                        error={Boolean(touched.secondaryFirstName && errors.secondaryFirstName)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-firstname"> Employee First Name</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-firstname"
                          type="text"
                          value={values.secondaryFirstName}
                          name="secondaryFirstName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label=" Employee First Name"
                          inputProps={{}}
                          autoComplete="off"
                        />
                        {touched.secondaryFirstName && errors.secondaryFirstName && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.secondaryFirstName}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.secondaryLastName && errors.secondaryLastName)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-lastname"> Employee Last Name</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-lastname"
                          type="text"
                          value={values.secondaryLastName}
                          name="secondaryLastName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label=" Employee Last Name"
                          inputProps={{}}
                          autoComplete="off"
                        />
                        {touched.secondaryLastName && errors.secondaryLastName && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.secondaryLastName}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.secondaryDesignation && errors.secondaryDesignation)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-secondary-designation" id="retailer-secondary-designation">
                          {' '}
                          Employee Title{' '}
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-secondary-designation"
                          type="text"
                          value={values.secondaryDesignation}
                          name="secondaryDesignation"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Employee Title"
                          inputProps={{}}
                          autoComplete="off"
                        />

                        {/* <Select
                          label="Choose  Title"
                          value={values.secondaryDesignation}
                          onChange={handleChange}
                          name="secondaryDesignation"
                          inputProps={{ 'aria-label': 'Without label' }}
                          labelId="retailer-primary-secondary-designation-label"
                          // id="outlined-adornment-email-secondary-designation"
                        > */}
                        {/* {allRecyclerList?.recyclers?.map((item, i) => (
                        <MenuItem value={item?.id} key={i}>
                          {item.name}
                        </MenuItem>
                      ))} */}
                        {/* <MenuItem value={''}>none</MenuItem> */}
                        {/* <MenuItem value={'Ceo'}>Ceo</MenuItem>
                          <MenuItem value={'Manager'}>Manager</MenuItem>
                        </Select> */}
                        {touched.secondaryDesignation && errors.secondaryDesignation && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.secondaryDesignation}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={Boolean(touched.SecondaryEmpEmail && errors.SecondaryEmpEmail)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-secondary-email"> Employee Email</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-secondary-email"
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
                        <InputLabel htmlFor="outlined-adornment-phone-login"> Employee Phone</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-phone-login"
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

                      <FormControl
                        fullWidth
                        error={Boolean(touched.SecondaryEmpAdd && errors.SecondaryEmpAdd)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-secondary-address"> Employee Address </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-secondary-address"
                          type="text"
                          value={values.SecondaryEmpAdd}
                          name="SecondaryEmpAdd"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Address Details"
                          inputProps={{}}
                          autoComplete="off"
                        />
                        {touched.SecondaryEmpAdd && errors.SecondaryEmpAdd && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.SecondaryEmpAdd}
                          </FormHelperText>
                        )}
                      </FormControl>
                      {/*  */}
                    </div>
                  </div>
                </Grid>
              </Grid>
              {/* Address Field For Primary Contact */}

              <Grid item xs={12}>
                <div style={{ border: '1px solid #6fd74b', borderRadius: '6px', marginTop: '22px' }}>
                  <Typography
                    component="h4"
                    variant="h2"
                    // sx={{ mb: 2 }}
                    sx={{ mb: 2, padding: '10px 15px ', background: '#6fd74b', color: '#fff', fontWeight: '500', fontSize: '24px' }}
                  >
                    Address
                  </Typography>
                  <div style={{ padding: '10px 15px 15px' }}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.EmpFullAddress && errors.EmpFullAddress)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <InputLabel
                            htmlFor="outlined-adornment-full-address"
                            id="notes-recycler-textarea"
                            style={{
                              top: '14px !important'
                            }}
                          >
                            Address *
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-full-address"
                            type="text"
                            value={values.EmpFullAddress}
                            name="EmpFullAddress"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Address *"
                            inputProps={{}}
                            autoComplete="off"
                            rows={3}
                            multiline
                          />
                          {touched.EmpFullAddress && errors.EmpFullAddress && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                              sx={{
                                fontSize: '13.8px'
                              }}
                            >
                              {errors.EmpFullAddress}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <FormControl fullWidth error={Boolean(touched.EmpCity && errors.EmpCity)} sx={{ ...theme.typography.customInput }}>
                          <InputLabel htmlFor="outlined-adornment-email-city"> City *</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email-city"
                            type="email"
                            value={values.EmpCity}
                            name="EmpCity"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label=" City *"
                            inputProps={{}}
                            autoComplete="off"
                          />
                          {touched.EmpCity && errors.EmpCity && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                              sx={{
                                fontSize: '13.8px'
                              }}
                            >
                              {errors.EmpCity}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>

                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.EmpState && errors.EmpState)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <InputLabel htmlFor="outlined-adornment-email-state"> State</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email-state"
                            type="text"
                            value={values.EmpState}
                            name="EmpState"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="State"
                            inputProps={{}}
                            autoComplete="off"
                          />

                      
                          {touched.EmpState && errors.EmpState && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                              sx={{
                                fontSize: '13.8px'
                              }}
                            >
                              {errors.EmpState}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.EmpCountry && errors.EmpCountry)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <InputLabel htmlFor="outlined-adornment-email-country">Country</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email-country"
                            type="text"
                            value={values.EmpCountry}
                            name="EmpCountry"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Country"
                            inputProps={{}}
                            autoComplete="off"
                          />

                 
                          {touched.EmpCountry && errors.EmpCountry && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                              sx={{
                                fontSize: '13.8px'
                              }}
                            >
                              {errors.EmpCountry}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.EmpPostal_Code && errors.EmpPostal_Code)}
                          sx={{ ...theme.typography.customInput }}
                        >
                          <InputLabel htmlFor="outlined-adornment-email-code">Postal Code</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email-code"
                            type="text"
                            value={values.EmpPostal_Code}
                            name="EmpPostal_Code"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Postal Code"
                            inputProps={{}}
                            autoComplete="off"
                          />
                          {touched.EmpPostal_Code && errors.EmpPostal_Code && (
                            <FormHelperText
                              error
                              id="standard-weight-helper-text-email-login"
                              sx={{
                                fontSize: '13.8px'
                              }}
                            >
                              {errors.EmpPostal_Code}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </div>
                </div>
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
                    disabled={isLoadingEnterprise}
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
                    {isLoadingEnterprise ? (
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
                      `${btnName} Recycler`
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

export default RecyclerForm;
