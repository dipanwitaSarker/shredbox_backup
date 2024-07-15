import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useGetOrgList } from 'hooks/useOrganizationHooks';
import React from 'react';
import { useTheme } from '@mui/material/styles';

const MachineSelect = () => {
  const { data: allOrgList } = useGetOrgList({
    limit: 100,
    sortOrder: 'asc',
    sortField: 'name',
    previous: 0,
    current: 1
  });
  const theme = useTheme();

  return (
    <>
      {' '}
      <FormControl
        fullWidth
        error={Boolean(touched.organization && errors.organization)}
        // sx={{ ...theme.typography.customInput }}
      >
        <InputLabel htmlFor="outlined-adornment-email-login">Associate Organization</InputLabel>
        {/* <Autocomplete
      name="organization"
      id="highlights-demo"
      sx={{ width: '100%' }}
      value={values.organization}
      disabled={values?.location !== '' ? true : false}
      options={allOrgList?.organizations?.length > 0 ? allOrgList?.organizations : []}
      // getOptionLabel={(option) => option?.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Associate Organization"
          margin="normal"
          value={orgName}
          onChange={(e) => {
            setOrgName(e.target.value);
            setFieldValue('organization', e.target.value);
          }}
        />
      )}
      onChange={(event, newValue) => {
        // setValues((prev) => ({ ...prev, organization: newValue?.label }));
        if (newValue) {
          setFieldValue('organization', newValue?.name);
          setFieldValue('organizationID', newValue?.id);
          setOrgName(newValue?.name);
        } else {
          setFieldValue('organization', '');
          setFieldValue('organizationID', '');
        }
      }}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <Box {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <CorporateFareIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box key={index} component="span" sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}>
                    {part.text}
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>
        );
      }}
    /> */}
        <Select
          value={values.organization}
          disabled={values?.location !== '' ? true : false}
          onChange={handleChange}
          name="organization"
          // displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          labelId="outlined-adornment-state"
          id="outlined-adornment-state"
        >
          {allOrgList?.organizations?.map((item, i) => (
            <MenuItem value={`${item?.id}-${item?.name}`} key={i}>
              {item.name}
            </MenuItem>
          ))}
          {/* {allOrgList?.organizations?.length > 0 ? (
        <>
          {allOrgList?.organizations?.map((item, i) => (
            <MenuItem value={`${item?.id}-${item?.name}`} key={i}>
              {item.name}
            </MenuItem>
          ))}
        </>
      ) : (
        <MenuItem>No data found!</MenuItem>
      )} */}
        </Select>
      </FormControl>
    </>
  );
};

export default MachineSelect;
