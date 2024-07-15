import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import { Form } from 'formik';
import { useGetRoleList } from 'hooks/useRoleHooks';
import { useEffect } from 'react';
const UserForm = ({ errors, handleBlur, handleChange, touched, values, isLoadingUser, setFieldValue, userDetailsUnderOrg, id }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { data: allRoleList } = useGetRoleList({
    limit: '500',
    sortOrder: 'asc',
    sortField: 'name',
    previous: '0',
    current: '1',
    first: '',
    last: ''
  });
  const theme = useTheme();
  useEffect(() => {
    if (userDetailsUnderOrg) {
      setFieldValue('fname', userDetailsUnderOrg?.firstName);
      setFieldValue('lname', userDetailsUnderOrg?.lastName);
      // setFieldValue('fname', 'Dipanwita');
      // setFieldValue('lname', 'fname');
      setFieldValue('email', userDetailsUnderOrg?.email);
      // setFieldValue('password', userDetailsUnderOrg?.password);
      setFieldValue('phone', userDetailsUnderOrg?.phone);
      setFieldValue('role', userDetailsUnderOrg?.role?.id);
    }
  }, [setFieldValue, userDetailsUnderOrg]);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Form>
      <Grid container spacing={gridSpacing} sx={{ alignContent: 'center' }}>
        <Grid item xs={12}>
          <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
            Organizations User details
          </Typography>
          <Grid container spacing={gridSpacing}>
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
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-fname"
                    sx={{
                      fontSize: '13.8px'
                    }}
                  >
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
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-lname"
                    sx={{
                      fontSize: '13.8px'
                    }}
                  >
                    {errors.lname}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email"
                  inputProps={{}}
                  autoComplete="off"
                />
                {touched.email && errors.email && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email"
                    sx={{
                      fontSize: '13.8px'
                    }}
                  >
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {id !== '' ? ( ///for User edit part id is coming(not blank) so password field is off as per requirements
              <></>
            ) : (
              //for User add part id is not present so showing the password field as per requirments
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-pass"> Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-pass"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    autoComplete="off"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-pass"
                      sx={{
                        fontSize: '13.8px'
                      }}
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}

            <Grid item lg={6} md={12} sm={12} xs={12}>
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
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-number"
                    sx={{
                      fontSize: '13.8px'
                    }}
                  >
                    {errors.phone}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* <Grid item lg={6} md={12} sm={12} xs={12}>
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
                  <FormHelperText error id="standard-weight-helper-text-address">
                    {errors.address}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}

            {/* <Grid item lg={6} md={12} sm={12} xs={12}>
              <FormControl fullWidth error={Boolean(touched.city && errors.city)} sx={{ ...theme.typography.customInput }}>
               

                <Select
                  value={values.city}
                  onChange={handleChange}
                  name="city"
                  displayEmpty
                  // inputProps={{ 'aria-label': 'Without label' }}
                  labelId="outlined-adornment-city"
                  id="outlined-adornment-city"
                >
                  <MenuItem value="">Select Your City</MenuItem>
                  <MenuItem value="San Francisco">San Francisco</MenuItem>
                </Select>

                {touched.city && errors.city && (
                  <FormHelperText error id="standard-weight-helper-text-city">
                    {errors.city}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}

            {/* <Grid item lg={6} md={12} sm={12} xs={12}>
              <FormControl fullWidth error={Boolean(touched.state && errors.state)} sx={{ ...theme.typography.customInput }}>
                <Select
                  value={values.state}
                  onChange={handleChange}
                  name="state"
                  displayEmpty
                  // inputProps={{ 'aria-label': 'Without label' }}
                  labelId="outlined-adornment-state"
                  id="outlined-adornment-state"
                >
                  <MenuItem value="">Select Your State</MenuItem>
                  <MenuItem value="California">California</MenuItem>
                </Select>
                {touched.state && errors.state && (
                  <FormHelperText error id="standard-weight-helper-text-state">
                    {errors.state}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}

            {/* <Grid item lg={6} md={12} sm={12} xs={12}>
              <FormControl fullWidth error={Boolean(touched.country && errors.country)} sx={{ ...theme.typography.customInput }}>
             

                <Select
                  value={values.country}
                  onChange={handleChange}
                  name="country"
                  displayEmpty
                  // inputProps={{ 'aria-label': 'Without label' }}
                  labelId="outlined-adornment-state"
                  id="outlined-adornment-state"
                >
                  <MenuItem value="">Select Your Country</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                </Select>
                {touched.country && errors.country && (
                  <FormHelperText error id="standard-weight-helper-text-state">
                    {errors.country}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid> */}
            {userDetailsUnderOrg?.role?.name !== 'Super Admin' && (
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <FormControl fullWidth error={Boolean(touched.role && errors.role)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-email-login" className="select-lebel">
                    Role
                  </InputLabel>

                  <Select
                    style={{ height: '60px' }}
                    value={values.role}
                    onChange={handleChange}
                    name="role"
                    // placeholder='trytui'

                    // inputProps={{ 'aria-label': 'Without label' }}
                    labelId="outlined-adornment-state"
                    id="outlined-adornment-state"
                  >
                    <MenuItem value="">Select Your Role</MenuItem>

                    {allRoleList?.roles?.map((val, i) => (
                      <MenuItem value={val?.id} key={i}>
                        {val?.name}
                      </MenuItem>
                    ))}
                    {/* <MenuItem value={'Director'}>Managing Director</MenuItem>
                  <MenuItem value={'Manager'}>HR Manager</MenuItem>
                  <MenuItem value={'Program Manager'}>Program Manager</MenuItem> */}
                  </Select>
                  {touched.role && errors.role && (
                    <FormHelperText
                      error
                      id="standard-weight-helper-text-state"
                      sx={{
                        fontSize: '13.8px'
                      }}
                    >
                      {errors.role}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
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
                disabled={isLoadingUser}
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
                {isLoadingUser ? (
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
                  ' Submit'
                )}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
};

UserForm.propTypes = {
  touched: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool
};
export default UserForm;
