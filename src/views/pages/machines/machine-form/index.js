import { FormControl, FormHelperText, Box, Divider, Grid, Button, CircularProgress, Select, InputLabel, MenuItem } from '@mui/material';
import { Field, Form } from 'formik';
import { useGetOrgList } from 'hooks/useOrganizationHooks';
import React, { useEffect } from 'react';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useTheme } from '@mui/material/styles';
import GoogleMaps from 'utils/google-place-api-autocomplete';

const MachineForm = ({
  values,
  setValues,
  errors,
  // isSubmitting,
  handleSubmit,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  setMachineLatLng,
  isLoadingMachine,
  machineDetails
}) => {
  // console.log('🚀 ~ errors:', errors);
  const theme = useTheme();

  const { data: allOrgList } = useGetOrgList({
    limit: 100,
    sortOrder: 'asc',
    sortField: 'name',
    previous: 0,
    current: 1
  });

  useEffect(() => {
    if (machineDetails) {
      if (machineDetails?.location) {
        setFieldValue('location', machineDetails?.location?.address);
        // setPickLocation(machineDetails?.location?.address);
        setFieldValue('placeId', machineDetails?.location?.place_id);
        setFieldValue('latitude', machineDetails?.location?.coOrdinates?.latitude);
        setFieldValue('longitude', machineDetails?.location?.coOrdinates?.longitude);
        setMachineLatLng((prev) => {
          return {
            ...prev,
            lat: machineDetails?.location?.coOrdinates?.latitude,
            lng: machineDetails?.location?.coOrdinates?.longitude,
            label: machineDetails?.location?.address
          };
        });
      }

      if (machineDetails?.organization) {
        setFieldValue('organization', `${machineDetails?.organization?.id}-${machineDetails?.organization?.name}`);
      }
    }
  }, [machineDetails, setFieldValue]);

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          error={Boolean(touched.location && errors.location)}
          // sx={{ ...theme.typography.customInput }}
        >
          <Field
            name="location"
            render={({ field }) => (
              <GoogleMaps
                {...field}
                values={values}
                setValues={setValues}
                handleChange={handleChange}
                onBlur={handleBlur}
                setFieldValue={setFieldValue}
                setMachineLatLng={setMachineLatLng}
                machineDetails={machineDetails}
              />
            )}
          />

          {touched.location && errors.location && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors.location}
            </FormHelperText>
          )}
        </FormControl>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', width: '100' }}>
          <Grid item xs={12}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

              <Button
                variant="outlined"
                sx={{
                  cursor: 'unset',
                  m: 2,
                  py: 0.5,
                  px: 7,
                  borderColor: `${theme.palette.grey[100]} !important`,
                  color: `${theme.palette.grey[900]}!important`,
                  fontWeight: 500,
                  borderRadius: `${10}px`
                }}
                disableRipple
                disabled
              >
                OR
              </Button>

              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            </Box>
          </Grid>
        </Box>

        <FormControl
          fullWidth
          error={Boolean(touched.organization && errors.organization)}
          // sx={{ ...theme.typography.customInput }}
        >
          <InputLabel htmlFor="outlined-adornment-email-login">Associate Organization</InputLabel>

          <Select
            label="Associate Organization"
            value={values.organization}
            disabled={values?.location !== '' ? true : false}
            onChange={handleChange}
            name="organization"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            labelId="outlined-adornment-state"
            id="outlined-adornment-state"
          >
            <MenuItem>Select Organization</MenuItem>
            {allOrgList?.organizations?.map((item, i) => (
              <MenuItem value={`${item?.id}-${item?.name}`} key={i}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {touched.organization && errors.organization && (
          <FormHelperText error id="standard-weight-helper-text-email-login">
            {errors.organization}
          </FormHelperText>
        )}

        <Box sx={{ mt: 5, justifyContent: 'center' }}>
          {(errors.location && errors.organization) ||
            (errors.submit && (
              <Box sx={{}}>
                <FormHelperText error>
                  Selection is required between Machine Location and Associate Organization. Both can not be null.
                </FormHelperText>
              </Box>
            ))}
          <AnimateButton>
            <Button
              disableElevation
              disabled={isLoadingMachine}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
              style={{
                color: 'white'
              }}
            >
              {isLoadingMachine ? (
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
      </Form>
    </>
  );
};

export default MachineForm;
