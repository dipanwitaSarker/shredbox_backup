/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  // MenuItem,
  OutlinedInput,
  // Select,
  Typography,
  Box,
  Select,
  MenuItem
  // Stack
} from '@mui/material';
import { Form } from 'formik';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useEffect } from 'react';
// import { useGetRecycleList } from 'hooks/useRecycleHooks';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const EnterpriseForm = ({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  // isSubmitting,
  touched,
  values,
  isLoadingEnterprise,
  setFieldValue,
  setValues,
  enterpriseDetails,
  btnName,
  id
  // userDetails
}) => {
  // const { data: allRecyclerList } = useGetRecycleList({
  //   limit: '500',
  //   sortOrder: 'asc',
  //   sortField: 'name',
  //   previous: '0',
  //   current: '1',
  //   first: '',
  //   last: ''
  // });

  // console.log(errors);
  const theme = useTheme();
  useEffect(() => {
    if (enterpriseDetails) {
      setFieldValue('EnterpriseName', enterpriseDetails?.organizationName ? enterpriseDetails?.organizationName : '');
      setFieldValue('EnterpriseWeb', enterpriseDetails?.website ? enterpriseDetails?.website : '');
      setFieldValue('isChecked', enterpriseDetails?.isChecked ? enterpriseDetails?.isChecked : false);
      setFieldValue('isEnable', enterpriseDetails?.enabled);
      //address
      setFieldValue('EmpFullAddress', enterpriseDetails?.address?.fullAddress ? enterpriseDetails?.address?.fullAddress : '');
      setFieldValue('EmpState', enterpriseDetails?.address?.state ? enterpriseDetails?.address?.state : '');
      setFieldValue('EmpCity', enterpriseDetails?.address?.city ? enterpriseDetails?.address?.city : '');
      setFieldValue('EmpCountry', enterpriseDetails?.address?.country ? enterpriseDetails?.address?.country : '');
      setFieldValue('EmpPostal_Code', enterpriseDetails?.address?.zip ? enterpriseDetails?.address?.zip : '');
      setFieldValue('addressId', enterpriseDetails?.address?.id);

      //secondary
      setFieldValue('SecondaryId', enterpriseDetails?.secondaryContact?.id);
      setFieldValue('secondaryTitle', enterpriseDetails?.secondaryContact?.prefix ? enterpriseDetails?.secondaryContact?.prefix : '');
      setFieldValue(
        'secondaryFirstName',
        enterpriseDetails?.secondaryContact?.firstName ? enterpriseDetails?.secondaryContact?.firstName : ''
      );
      setFieldValue(
        'secondaryLastName',
        enterpriseDetails?.secondaryContact?.lastName ? enterpriseDetails?.secondaryContact?.lastName : ''
      );
      setFieldValue('secondaryDesignation', enterpriseDetails?.secondaryContact?.title ? enterpriseDetails?.secondaryContact?.title : '');
      setFieldValue('SecondaryEmpEmail', enterpriseDetails?.secondaryContact?.email ? enterpriseDetails?.secondaryContact?.email : '');
      setFieldValue('SecondaryEmpPhone', enterpriseDetails?.secondaryContact?.phone ? enterpriseDetails?.secondaryContact?.phone : '');
      setFieldValue('SecondaryEmpAdd', enterpriseDetails?.secondaryContact?.address ? enterpriseDetails?.secondaryContact?.address : '');

      //primary
      setFieldValue('primaryId', enterpriseDetails?.primaryContact?.id);
      setFieldValue('title', enterpriseDetails?.primaryContact?.prefix ? enterpriseDetails?.primaryContact?.prefix : '');
      setFieldValue('firstName', enterpriseDetails?.primaryContact?.firstName ? enterpriseDetails?.primaryContact?.firstName : '');
      setFieldValue('lastName', enterpriseDetails?.primaryContact?.lastName ? enterpriseDetails?.primaryContact?.lastName : '');
      setFieldValue('designation', enterpriseDetails?.primaryContact?.title ? enterpriseDetails?.primaryContact?.title : '');
      setFieldValue('associateEmpEmail', enterpriseDetails?.primaryContact?.email ? enterpriseDetails?.primaryContact?.email : '');
      setFieldValue('associateEmpPhone', enterpriseDetails?.primaryContact?.phone ? enterpriseDetails?.primaryContact?.phone : '');
      setFieldValue('associateEmpAdd', enterpriseDetails?.primaryContact?.address ? enterpriseDetails?.primaryContact?.address : '');
    }
  }, [enterpriseDetails, setFieldValue]);

  const initializeFieldValue = (id) => {
    let base = {
      user_firstname: values.users[`${id}`][`user_firstname`] || '',
      user_email: values.users[`${id}`][`user_email`] || '',
      rfid_code: values.users[`${id}`][`rfid_code`] || '',
      user_lastname: values.users[`${id}`][`user_lastname`] || ''
    };

    setValues((prev) => ({
      ...prev,
      users: prev.users.map((item, i) => {
        if (i == id) {
          return base;
        } else return item;
      })
    }));
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={gridSpacing} sx={{ alignContent: 'center' }}>
          <Grid item xs={12}>
            <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
              Enterprise Organization details
            </Typography>

            <Grid container spacing={gridSpacing}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.EnterpriseName && errors.EnterpriseName)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-email-login"> Enterprise Name *</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={values.EnterpriseName}
                    name="EnterpriseName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label=" Enterprise Name *"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.EnterpriseName && errors.EnterpriseName && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                      sx={{
                        fontSize: '13.8px'
                      }}
                    >
                      {errors.EnterpriseName}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid item lg={6} md={6} sm={6} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.EnterpriseCode && errors.EnterpriseCode)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login"> Enterprise Code *</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.EnterpriseCode}
                      name="EnterpriseCode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Enterprise Code *"
                      inputProps={{}}
                      autoComplete="off"
                    />
                    {touched.EnterpriseCode && errors.EnterpriseCode && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.EnterpriseCode}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid> */}
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.EnterpriseWeb && errors.EnterpriseWeb)}
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-email-login"> Enterprise Website Address</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email-login"
                    type="text"
                    value={values.EnterpriseWeb}
                    name="EnterpriseWeb"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label=" Enterprise Web"
                    inputProps={{}}
                    autoComplete="off"
                  />
                  {touched.EnterpriseWeb && errors.EnterpriseWeb && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-email-login"
                      sx={{
                        fontSize: '13.8px'
                      }}
                    >
                      {errors.EnterpriseWeb}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* Enterprise Notes */}
              {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.EnterpriseNotes && errors.EnterpriseNotes)}
                    sx={{ ...theme.typography.customInput }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login" id="enterprise-notes-outline">
                      {' '}
                      Enterprise Notes
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.EnterpriseNotes}
                      name="EnterpriseNotes"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label=" Enterprise Notes"
                      inputProps={{}}
                      autoComplete="off"
                      multiline
                      rows={4}
                    />
                    {touched.EnterpriseNotes && errors.EnterpriseNotes && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                        sx={{
                          fontSize: '13.8px'
                        }}
                      >
                        {errors.EnterpriseNotes}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            {/* Primary Contact */}
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
                              id="standard-weight-helper-text-prefix"
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

                        <FormControl
                          fullWidth
                          error={Boolean(touched.lastName && errors.lastName)}
                          sx={{ ...theme.typography.customInput }}
                        >
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
                        {/* Associate Employee Email */}
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
                          <InputLabel htmlFor="outlined-adornment-email"> Employee Email *</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-email"
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
                        {/* Office Phone */}
                        {/* <FormControl
                        fullWidth
                        error={Boolean(touched.associateEmpOfficePhone && errors.associateEmpOfficePhone)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-email-login"> Employee Office Phone *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-login"
                          type="text"
                          value={values.associateEmpOfficePhone}
                          name="associateEmpOfficePhone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label=" Employee Office Phone *"
                          inputProps={{}}
                          autoComplete="off"
                        />

                        {touched.associateEmpOfficePhone && errors.associateEmpOfficePhone && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.associateEmpOfficePhone}
                          </FormHelperText>
                        )}
                      </FormControl> */}

                        {/* Associate Employee Address */}

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
                                // setFieldValue('SecondaryEmpName', values.associateEmpName);
                                // setFieldValue('SecondaryEmpEmail', values.associateEmpEmail);
                                // setFieldValue('SecondaryEmpPhone', values.associateEmpPhone);
                                // setFieldValue('SecondaryEmpOfficePhone', values.associateEmpOfficePhone);
                                // setFieldValue('SecondaryEmpAdd', values.associateEmpAdd);
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
                                // setFieldValue('SecondaryEmpName', values.SecondaryEmpName);
                                // setFieldValue('SecondaryEmpEmail', values.SecondaryEmpEmail);
                                // setFieldValue('SecondaryEmpPhone', values.SecondaryEmpPhone);
                                // setFieldValue('SecondaryEmpOfficePhone', values.SecondaryEmpOfficePhone);
                                // setFieldValue('SecondaryEmpAdd', values.SecondaryEmpAdd);
                              }
                            }}
                            value={values.isChecked}
                          />
                          <Typography component="h4" variant="h3" sx={{ color: '#fff' }}>
                            Secondary Contact
                          </Typography>
                        </Box>
                      </FormControl>

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
                        {/* <FormControl
                        fullWidth
                        error={Boolean(touched.SecondaryEmpOfficePhone && errors.SecondaryEmpOfficePhone)}
                        sx={{ ...theme.typography.customInput }}
                      >
                        <InputLabel htmlFor="outlined-adornment-email-login"> Employee Office Phone</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email-login"
                          type="text"
                          value={values.SecondaryEmpOfficePhone}
                          // value={values.isChecked ? values.associateEmpPhone : values.SecondaryEmpOfficePhone}
                          name="SecondaryEmpOfficePhone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Associate Employee Office Phone"
                          inputProps={{}}
                          autoComplete="off"
                        />
                        {touched.SecondaryEmpOfficePhone && errors.SecondaryEmpOfficePhone && (
                          <FormHelperText
                            error
                            id="standard-weight-helper-text-email-login"
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.SecondaryEmpOfficePhone}
                          </FormHelperText>
                        )}
                      </FormControl> */}

                        {/* Secondary Address */}
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
                            label="Employee Phone"
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
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <div style={{ border: '1px solid #6fd74b', borderRadius: '6px' }}>
                  <Typography
                    component="h4"
                    variant="h2"
                    sx={{ mb: 2, padding: '10px 15px', background: '#6fd74b', color: '#fff', fontWeight: '500', fontSize: '24px' }}
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

                          {/* {console.log(values.EmpState)} */}
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

                          {/* {console.log(values.EmpCountry)} */}
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

              {!id && (
                <>
                  {[0, 1, 2, 3].map((item, i) => (
                    <Grid item xs={12} md={6} key={i}>
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
                              User {item + 1}
                            </Typography>
                          </Box>
                        </FormControl>
                        <div style={{ padding: '10px 15px 15px' }}>
                          <FormControl
                            fullWidth
                            // error={Boolean(touched[`users[${item}].user_name`] && errors.users[item].user_name)}
                            // error={Boolean(touched.users?.[item]?.user_name && errors.users?.[item]?.user_name)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel
                              htmlFor={`outlined-adornment-${item}`}
                              // error={Boolean(touched[`users[${item}].user_name`] && errors.users[item].user_name)}
                              // error={Boolean(touched.users?.[item]?.user_name && errors.users?.[item]?.user_name)}
                            >
                              First Name *
                            </InputLabel>
                            <OutlinedInput
                              id={`outlined-adornment-${item}`}
                              type="text"
                              value={values.users[`${item}`][`user_firstname`] || ''}
                              name={`users[${item}].user_firstname`}
                              onMouseDown={() => initializeFieldValue(item)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="First Name *"
                              inputProps={{}}
                              autoComplete="off"
                              // error={Boolean(touched[`users[${item}].user_firstname`] && errors.users[item].user_firstname)}
                              // error={Boolean((touched.users?.[item].user_firstname && errors.users?.[item]?.user_firstname) || false)}
                            />
                            {/* {Boolean(touched.users?.[item]?.user_firstname && errors.users?.[item]?.user_firstname) && (
                          <FormHelperText
                            error
                            id={`standard-weight-helper-text-${item}`}
                            sx={{
                              fontSize: '13.8px'
                            }}
                          >
                            {errors.users?.[item].user_firstname}
                          </FormHelperText>
                        )} */}
                          </FormControl>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.users?.[item]?.user_lastname && errors.users?.[item]?.user_lastname)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel
                              htmlFor={`outlined-adornment-${item}`}
                              error={Boolean(touched.users?.[item]?.user_lastname && errors.users?.[item]?.user_lastname)}
                            >
                              Last Name *
                            </InputLabel>
                            <OutlinedInput
                              id={`outlined-adornment-${item}`}
                              type="text"
                              value={values.users[`${item}`][`user_lastname`] || ''}
                              name={`users[${item}].user_lastname`}
                              onMouseDown={() => initializeFieldValue(item)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Last Name *"
                              inputProps={{}}
                              autoComplete="off"
                              error={Boolean(touched.users?.[item]?.user_lastname && errors.users?.[item]?.user_lastname)}
                            />
                            {Boolean(touched.users?.[item]?.user_lastname && errors.users?.[item]?.user_lastname) && (
                              <FormHelperText
                                error
                                id={`standard-weight-helper-text-${item}`}
                                sx={{
                                  fontSize: '13.8px'
                                }}
                              >
                                {errors.users?.[item]?.user_lastname}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.users?.[item]?.user_email && errors.users?.[item]?.user_email)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel
                              htmlFor={`outlined-adornment-${item}`}
                              // error={Boolean(touched[`users[${item}].user_email`] && errors.users[item].user_email)}
                              error={Boolean(touched.users?.[item]?.user_email && errors.users?.[item]?.user_email)}
                            >
                              Email *
                            </InputLabel>
                            <OutlinedInput
                              id={`outlined-adornment-${item}`}
                              type="email"
                              value={values.users[`${item}`][`user_email`] || ''}
                              name={`users[${item}].user_email`}
                              onMouseDown={() => initializeFieldValue(item)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Email *"
                              inputProps={{}}
                              autoComplete="off"
                              // error={Boolean(touched[`users[${item}].user_email`] && errors.users[item].user_email)}
                              error={Boolean(touched.users?.[item]?.user_email && errors.users?.[item]?.user_email)}
                            />
                            {Boolean(touched.users?.[item]?.user_email && errors.users?.[item]?.user_email) && (
                              <FormHelperText
                                error
                                id={`standard-weight-helper-text-${item}`}
                                sx={{
                                  fontSize: '13.8px'
                                }}
                              >
                                {errors.users?.[item]?.user_email}
                              </FormHelperText>
                            )}
                          </FormControl>

                          <FormControl
                            fullWidth
                            // error={Boolean(touched[`users[${item}].rfid_code`] && errors.users[item].rfid_code)}
                            error={Boolean(touched.users?.[item]?.rfid_code && errors.users?.[item]?.rfid_code)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <InputLabel
                              htmlFor={`outlined-adornment-${item}`}
                              // error={Boolean(touched[`users[${item}].rfid_code`] && errors.users[item].rfid_code)}
                              error={Boolean(touched.users?.[item]?.rfid_code && errors.users?.[item]?.rfid_code)}
                            >
                              RFID Code
                            </InputLabel>
                            <OutlinedInput
                              id={`outlined-adornment-${item}`}
                              type="text"
                              value={values.users[`${item}`][`rfid_code`] || ''}
                              name={`users[${item}].rfid_code`}
                              onMouseDown={() => initializeFieldValue(item)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              label="Employee Cell Phone *"
                              inputProps={{}}
                              autoComplete="off"
                            />

                            {Boolean(touched.users?.[item]?.rfid_code && errors.users?.[item]?.rfid_code) && (
                              <FormHelperText
                                error
                                id={`standard-weight-helper-text-${item}`}
                                sx={{
                                  fontSize: '13.8px'
                                }}
                              >
                                {errors.users?.[item]?.rfid_code}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </>
              )}
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
                    `${btnName} Enterprise`
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

export default EnterpriseForm;
