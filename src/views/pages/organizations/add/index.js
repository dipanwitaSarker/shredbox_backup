import { Formik } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';

import OrganizationForm from '../organization-form';
import { useState } from 'react';
import { useEffect } from 'react';
import FormView from 'ui-component/cards/Skeleton/FormView';
import { useOrganizationAdd } from 'hooks/useOrganizationHooks';

const OrganizationAdd = () => {
  const [isLoading, setLoading] = useState(true);
  // const [checked, setChecked] = useState(false);
  // const [asMainPOC, setAsMainPOC] = useState(false);
  // const [asSecPOC, setSecPOC] = useState(false);

  const { mutate: addOrg, isPending: isLoadingOrg } = useOrganizationAdd();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <FormView />
        </>
      ) : (
        <>
          <BreadcrumbsForPage
            name="Add Organization"
            obj={{ title: 'All Organizations', title2: 'Add Organization', url: '/dashboard/organizations' }}
          />
          <MainCard>
            <Formik
              initialValues={{
                associateEmpName: '',
                associateEmpEmail: '',
                associateEmpPhone: '',
                SecondaryEmpName: '',
                SecondaryEmpEmail: '',
                SecondaryEmpPhone: '',
                OrganizationName: '',
                OrganizationWeb: '',
                OrganizationPhone: '',
                OrganizationAddress: '',
                OrganizationCity: '',
                OrganizationState: 'California',
                OrganizationCountry: 'USA',

                isChecked: false,
                submit: null
              }}
              validationSchema={Yup.object().shape({
                OrganizationName: Yup.string()
                  .max(50, 'Organization Name must be at most 50 characters')
                  .required('Organization Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Organization Name should not be in any special character'),
                // OrganizationPhone: Yup.string()
                //   // .required('Organization phone number is required')
                //   .test('not-negative', 'Organization phone number cannot be negative', (value) => {
                //     // Check if value is defined and not null
                //     if (value && typeof value === 'string') {
                //       return !value.startsWith('-');
                //     }
                //     return true;
                //   })
                //   .min(5, 'Organization Phone number must be more than 5')
                //   .max(16, 'Organization Phone number must be less than 16'),
                OrganizationPhone: Yup.string() // Validates for numerical value
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),
                OrganizationAddress: Yup.string().max(150, 'Must be 150 characters').trim(),
                OrganizationWeb: Yup.string().url('Please enter a valid Url'),
                associateEmpName: Yup.string().max(30, ' Must be of 50 characters').trim().required('Primary contact name is required '),
                associateEmpEmail: Yup.string().email('Invalid email address').required('Primary contact email is required'),

                // associateEmpPhone: Yup.string()
                //   .required('Primary Phone number is required')
                //   .test('not-negative', 'Primary Phone number cannot be negative', (value) => {
                //     // Check if value is defined and not null
                //     if (value && typeof value === 'string') {
                //       return !value.startsWith('-');
                //       //  return !/^-\d*|-\d+$/.test(value);
                //     }
                //     return true; // Allow empty or non-string values
                //   })

                //   .min(5, 'Primary Phone number must be more than 5')
                //   .max(16, 'Primary Phone number must be less than 16'),
                associateEmpPhone: Yup.string() // Validates for numerical value
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890')
                  .required('Primary contact number is required'),
                SecondaryEmpName: Yup.string().max(30, ' Must be of 50 characters').trim(),
                // SecondaryEmpPhone: Yup.string().max(50, 'Must be 50 characters '),
                // SecondaryEmpPhone: Yup.string()
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),
                SecondaryEmpPhone: Yup.string().test('not-negative', 'Secondary Phone number cannot be negative', (value) => {
                  if (value && typeof value === 'string') {
                    return !value.startsWith('-');
                    //  return !/^-\d*|-\d+$/.test(value);
                  }
                  return true;
                }),

                SecondaryEmpEmail: Yup.string().email('Invalid email address')
              })}
              onSubmit={async (value, { resetForm }) => {
                const submitData = {
                  name: value.OrganizationName.trim(),
                  websiteUrl: value.OrganizationWeb.trim(),
                  phone: value.OrganizationPhone.trim(),
                  isChecked: value.isChecked,
                  address: {
                    details: value.OrganizationAddress.trim(),
                    city: value.OrganizationCity.trim(),
                    state: value.OrganizationState.trim(),
                    country: value.OrganizationCountry.trim()
                  },
                  contact: {
                    primary: {
                      employeeName: value.associateEmpName.trim(),
                      employeeEmail: value.associateEmpEmail.trim(),
                      employeePhone: value.associateEmpPhone.trim()
                    },
                    secondary: {
                      employeeName: value.SecondaryEmpName.trim(),
                      employeeEmail: value.SecondaryEmpEmail.trim(),
                      employeePhone: value.SecondaryEmpPhone.trim()
                    }
                  }
                };
                addOrg(submitData);
                resetForm({});
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <OrganizationForm
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  isLoadingOrg={isLoadingOrg}
                  setFieldValue={setFieldValue}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
};

export default OrganizationAdd;
