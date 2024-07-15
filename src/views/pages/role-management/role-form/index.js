/* eslint-disable react/prop-types */
import { Button, Stack, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Typography, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { Form, Field, FieldArray } from 'formik';
import React, { useEffect } from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { styled, useTheme } from '@mui/material/styles';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import PropTypes from 'prop-types';

const Android12Switch = styled(Switch)(() => ({
  padding: 8,
  width: 110,
  height: 49,
  overflow: 'hidden',
  borderRadius: 30,
  '& .MuiSwitch-track': {
    borderRadius: 30,
    '&::before, &::after': {
      // content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16
    },
    '&::before': {
      content: '"On"',
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
      //   theme.palette.getContrastText(theme.palette.primary.main)
      // )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 20,
      color: '#fff'
    },
    '&::after': {
      content: '"Off"',
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
      //   theme.palette.getContrastText(theme.palette.primary.main)
      // )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 28,
      color: '#fff'
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    height: 27,
    margin: 2,
    left: 0,
    position: 'relative',
    borderRadius: 20,
    width: 48
  },
  '& .Mui-checked .MuiSwitch-thumb': {
    boxShadow: 'none',
    height: 27,
    margin: 2,
    left: 20,
    position: 'relative',
    width: 48
  }
}));

function RoleManagementForm({
  errors,
  handleBlur,
  handleChange,
  touched,
  values,
  // isSubmitting,
  // setValues,
  setFieldValue,
  roleDetails,
  permissionData,
  isLoadingRole
}) {
  const theme = useTheme();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));

  useEffect(() => {
    let newObjects = permissionData?.flatMap((e) => Array(e.status).fill({ id: e.id, permission: e.permission, status: e.status }));

    if (roleDetails) {
      setFieldValue('roleName', roleDetails.name);
      for (let index = 0; index < newObjects.length; index++) {
        const element = newObjects[index];
        if (element.id === 0) {
          element.status = roleDetails?.permissions?.allow_edit_machine;
        }
        if (element.id === 1) {
          element.status = roleDetails?.permissions?.allow_add_org;
        }
        if (element.id === 2) {
          element.status = roleDetails?.permissions?.allow_edit_org;
        }
        if (element.id === 3) {
          element.status = roleDetails?.permissions?.allow_add_user;
        }
        if (element.id === 4) {
          element.status = roleDetails?.permissions?.allow_edit_user;
        }
        if (element.id === 5) {
          element.status = roleDetails?.permissions?.allow_add_role;
        }
        if (element.id === 6) {
          element.status = roleDetails?.permissions?.allow_edit_role;
        }
      }
      if (roleDetails?.permissions?.allow_edit_machine == false) {
        newObjects.splice(
          newObjects.findIndex((a) => a.id === permissionData[0].id),
          1
        );
      }
      if (roleDetails?.permissions?.allow_add_org == false) {
        newObjects.splice(
          newObjects.findIndex((a) => a.id === permissionData[1].id),
          1
        );
      }
      if (roleDetails?.permissions?.allow_edit_org == false) {
        newObjects.splice(
          newObjects.findIndex((a) => a.id === permissionData[2].id),
          1
        );
      }
      if (roleDetails?.permissions?.allow_add_user == false) {
        newObjects.splice(
          newObjects.findIndex((a) => a.id === permissionData[3].id),
          1
        );
      }
      if (roleDetails?.permissions?.allow_edit_user == false) {
        newObjects.splice(
          newObjects.findIndex((a) => a.id === permissionData[4].id),
          1
        );
      }
      if (roleDetails?.permissions?.allow_add_role == false) {
        newObjects.splice(
          newObjects.findIndex((a) => a.id === permissionData[5].id),
          1
        );
      }
      if (roleDetails?.permissions?.allow_edit_role == false) {
        newObjects.splice(
          newObjects.findIndex((a) => a.id === permissionData[6].id),
          1
        );
      }

      setFieldValue('permission', newObjects);
    }
  }, [setFieldValue, roleDetails, permissionData]);

  return (
    <Form>
      <Grid container spacing={gridSpacing} sx={{ alignContent: 'center' }}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
                Role details
              </Typography>
              <FormControl fullWidth error={Boolean(touched.roleName && errors.roleName)} sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-login">Role Name</InputLabel>
                <Field
                  name="roleName"
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-email-login"
                      type="text"
                      value={values.roleName}
                      name="roleName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Role Name"
                      inputProps={{}}
                      autoComplete="off"
                    />
                  )}
                />

                {touched.roleName && errors.roleName && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-email-login"
                    sx={{
                      fontSize: '13.8px'
                    }}
                  >
                    {errors.roleName}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
                Permission
              </Typography>
              <Grid container spacing={1} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                <FieldArray name="permission">
                  {({ push, remove }) => (
                    <>
                      {permissionData.map((data, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.permission && errors.permission)}
                            sx={{ ...theme.typography.customInput }}
                          >
                            <FormGroup>
                              <FormControlLabel
                                name={`permission.${index}.permission`}
                                control={
                                  <Android12Switch
                                    disabled={
                                      permissionData[index].id === 0
                                        ? !userData?.role?.permissions?.allow_edit_machine
                                        : permissionData[index].id === 1
                                        ? !userData?.role?.permissions?.allow_add_org
                                        : permissionData[index].id === 2
                                        ? !userData?.role?.permissions?.allow_edit_org
                                        : permissionData[index].id === 3
                                        ? !userData?.role?.permissions?.allow_add_user
                                        : permissionData[index].id === 4
                                        ? !userData?.role?.permissions?.allow_edit_user
                                        : permissionData[index].id === 5
                                        ? !userData?.role?.permissions?.allow_add_role
                                        : permissionData[index].id === 6
                                        ? !userData?.role?.permissions?.allow_edit_role
                                        : false
                                    }
                                    checked={values.permission.findIndex((obj) => obj?.id == data.id && obj?.status) >= 0 ? true : false}
                                    // checked={values?.permission[index]?.status}
                                    sx={{ m: 1 }}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        push({ id: data.id, permission: data.permission, status: e.target.checked });
                                      } else {
                                        const targetIndex = values.permission.findIndex((obj) => obj?.id == data.id);
                                        remove(targetIndex);
                                      }
                                    }}
                                  />
                                }
                                label={data.permission}
                              />
                            </FormGroup>
                          </FormControl>
                        </Grid>
                      ))}
                    </>
                  )}
                </FieldArray>
                {touched.permission && errors.permission && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.permission}
                  </FormHelperText>
                )}
              </Grid>
              <Grid container spacing={gridSpacing} columns={{ xs: 4, sm: 8, md: 12 }}>
                <FieldArray name="permission">
                  {() => (
                    <>
                      <Stack
                        spacing={2}
                        direction="row"
                        style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 12 }}
                      >
                        <Button
                          name="selectAll"
                          variant="text"
                          onClick={() => {
                            if (userOrgId == 'C2') {
                              permissionData?.map((item) => (item.status = true));
                            } else {
                              permissionData?.map((item) => {
                                if (item.id === 0 && userData?.role?.permissions?.allow_edit_machine == false) {
                                  return (item.status = false);
                                } else if (item.id === 1 && userData?.role?.permissions?.allow_add_org == false) {
                                  return (item.status = false);
                                } else if (item.id === 2 && userData?.role?.permissions?.allow_edit_org == false) {
                                  return (item.status = false);
                                } else if (item.id === 4 && userData?.role?.permissions?.allow_edit_user == false) {
                                  return (item.status = false);
                                } else {
                                  return (item.status = true);
                                }
                              });
                            }

                            setFieldValue('permission', permissionData);
                          }}
                        >
                          Select All
                        </Button>
                        <Button
                          name="reset"
                          variant="text"
                          style={{ color: 'red' }}
                          onClick={() => {
                            // setValues((prev) => ({ ...prev, permission: [] }));
                            setFieldValue('permission', []);
                          }}
                        >
                          Reset
                        </Button>
                      </Stack>
                    </>
                  )}
                </FieldArray>
              </Grid>
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
                // disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                style={{
                  color: 'white',
                  minWidth: '200px',
                  margin: '0px auto'
                }}
                disabled={isLoadingRole}
              >
                {isLoadingRole ? (
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
}

RoleManagementForm.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  touched: PropTypes.object,
  values: PropTypes.object,
  isSubmitting: PropTypes.Boolean,
  setValues: PropTypes.func
};

export default RoleManagementForm;
