import { Formik } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';

import { useParams } from 'react-router-dom';
import OrganizationForm from '../organization-form';
import FormView from 'ui-component/cards/Skeleton/FormView';
import { useState, useEffect } from 'react';
import { useGetOrgById, useGetOrgEditedList } from 'hooks/useOrganizationHooks';

const OrganizationEdit = () => {
  let { id } = useParams();
  const { data: orgDetails } = useGetOrgById({
    id: id.slice(1)
  });
  const { mutate: updatedOrg, isPending: isLoadingUpdatedOrg } = useGetOrgEditedList();

  const [isLoading, setLoading] = useState(true);

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
            name={`Edit Organization ${id}`}
            obj={{ title: 'All Organizations', title2: `Edit Organization ${id}`, url: '/dashboard/organizations' }}
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
                // associateEmpName: Yup.string().max(255).required(' Employee name is required'),
                // associateEmpEmail: Yup.string().max(255).required(' Employee email is required'),
                // associateEmpPhone: Yup.string().max(255).required(' Employee Phone is required'),
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
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'), // Validates against negative values
                // .required('Organization phone number is required'),
                OrganizationAddress: Yup.string().max(150, 'Must be 150 characters').trim(),
                OrganizationWeb: Yup.string().url('Please enter a valid Url').trim(),
                associateEmpName: Yup.string().max(30, ' Must be of 30 characters').trim().required('Primary contact name is required '),
                associateEmpEmail: Yup.string().email('Invalid email address').required('Primary contact email is required'),

                associateEmpPhone: Yup.string() // Validates for numerical value
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890')
                  .required('Primary contact number is required'),
                SecondaryEmpName: Yup.string().max(30, ' Must be of 50 characters').trim(),
                // SecondaryEmpPhone: Yup.string().max(50, 'Must be 50 characters '),
                // SecondaryEmpPhone: Yup.string() // Validates for numerical value
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),
                SecondaryEmpPhone: Yup.string().test('not-negative', 'Secondary Phone number cannot be negative', (value) => {
                  if (value && typeof value === 'string') {
                    return !value.startsWith('-');
                    //  return !/^-\d*|-\d+$/.test(value);
                  }
                  return true;
                }),
                SecondaryEmpEmail: Yup.string().email('Invalid email address')

                // associateEmpName: Yup.string().max(50, ' Must be of 50 characters').trim(),
                // associateEmpEmail: Yup.string().email('Invalid email address').required(' Email is required'),
                // SecondaryEmpName: Yup.string().max(50, 'Must be 50 characters ').trim(),
                // SecondaryEmpEmail: Yup.string().email('Invalid email address').required(' Email is required'),
                //
              })}
              onSubmit={async (value) => {
                const submitData = {
                  name: value.OrganizationName.trim(),
                  id: id.slice(1),
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
                updatedOrg(submitData);
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
                  setFieldValue={setFieldValue}
                  orgDetails={orgDetails?.organization}
                  isLoadingOrg={isLoadingUpdatedOrg}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
};

export default OrganizationEdit;
