import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid, Box } from '@mui/material';
import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { gridSpacing } from 'store/constant';
import { useParams } from 'react-router-dom';

// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import parse from 'autosuggest-highlight/parse';
// import match from 'autosuggest-highlight/match';
// import CorporateFareIcon from '@mui/icons-material/CorporateFare';
// import { organizationExamples } from 'views/pages/ExampleConstants';
import { useState } from 'react';
import CustomeMap from 'utils/CustomeMap';
import { useGetMachineById, useMachineEdit } from 'hooks/useMachineHooks';
import MachineForm from '../machine-form';
// import { useEffect } from 'react';

const MachineEdit = () => {
  let { id } = useParams();
  const { data: machineDetails } = useGetMachineById({
    id: id.slice(1)
  });
  // const [orgName, setOrgName] = useState('');
  const { mutate: editMachine, isPending: isLoadingMachine } = useMachineEdit();

  const [machineLatLng, setMachineLatLng] = useState({
    lat: '',
    lng: '',
    label: ''
  });

  // console.log('🚀 ~ MachineEdit ~ machineDetails:', machineDetails);

  // console.log('🚀 ~ MachineEdit ~ machineLatLng:', machineLatLng);

  return (
    <>
      <BreadcrumbsForPage
        name={`Edit Machines ${id}`}
        obj={{ title: 'All Machines', title2: `Edit Machines ${id}`, url: '/dashboard/machines' }}
      />
      <MainCard title={`Edit Machines ${id}`}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Formik
                  initialValues={{
                    location: '',
                    placeId: '',
                    latitude: '',
                    organization: '',
                    // organizationID: '',
                    longitude: '',
                    submit: null
                  }}
                  validationSchema={Yup.object()
                    .shape({
                      location: Yup.string(),
                      organization: Yup.string()
                    })
                    .test({
                      test: function (values) {
                        const { location, organization } = values;
                        if ((location === '' || location === undefined) && (organization === '' || organization === undefined)) {
                          return this.createError({
                            message: 'At least one of Location or Organization is required',
                            path: 'submit'
                          });
                        }

                        return true;
                      }
                    })}
                  onSubmit={(values) => {
                    if (values?.placeId) {
                      const MachineEditByLocation = {
                        machine_id: id.slice(1),
                        location: {
                          address: values?.location,
                          placeId: values?.placeId,
                          coOrdinates: {
                            latitude: values?.latitude,
                            longitude: values?.longitude
                          }
                        }
                      };
                      editMachine(MachineEditByLocation);
                    } else {
                      console.log(values?.organization?.split('-'));
                      const MachineEditByOrg = {
                        machine_id: id.slice(1),
                        organization: { id: values?.organization?.split('-')[0], name: values?.organization?.split('-')[1] }
                      };
                      editMachine(MachineEditByOrg);
                    }
                  }}
                >
                  {({
                    values,
                    setValues,
                    errors,
                    // isSubmitting,
                    handleSubmit,
                    touched,
                    handleBlur,
                    handleChange,
                    setFieldValue
                  }) => (
                    <MachineForm
                      values={values}
                      setValues={setValues}
                      errors={errors}
                      // isSubmitting,
                      handleSubmit={handleSubmit}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                      machineDetails={machineDetails?.machine}
                      setMachineLatLng={setMachineLatLng}
                      isLoadingMachine={isLoadingMachine}
                    />
                  )}
                </Formik>
              </Grid>

              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Box>
                  <CustomeMap machineLatLng={machineLatLng} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default MachineEdit;
