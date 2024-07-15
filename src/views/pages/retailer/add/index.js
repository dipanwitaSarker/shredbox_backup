import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import FormView from 'ui-component/cards/Skeleton/FormView';
import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import RetailerForm from '../retailer-form';
import * as Yup from 'yup';
import 'yup-phone';
import { useRetailerAdd } from 'hooks/useRetailerHooks';

const RetailerAdd = () => {
  const [isLoading, setLoading] = useState(true);
  // const userData = JSON.parse(localStorage.getItem('userData'));
  // console.log('🚀 ~ userData:', userData?.type);
  // const [checked, setChecked] = useState(false);
  // const [asMainPOC, setAsMainPOC] = useState(false);
  // const [asSecPOC, setSecPOC] = useState(false);

  const { mutate: addRetailer, isPending: isLoadingRetailer } = useRetailerAdd();

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
            name="Add Retailer Organization"
            obj={{ title: 'All Retailer Organizations', title2: 'Add Retailer Organizations', url: '/dashboard/retailer' }}
          />
          <MainCard>
            <Formik
              initialValues={{
                // associateEmpName: '',
                associateEmpEmail: '',
                associateEmpPhone: '',
                // associateEmpOfficePhone: '',
                associateEmpAdd: '',

                EmpFullAddress: '',
                EmpCity: '',
                EmpState: '',
                EmpCountry: '',
                EmpPostal_Code: '',

                // SecondaryEmpName: '',
                SecondaryEmpEmail: '',
                SecondaryEmpPhone: '',
                // SecondaryEmpOfficePhone: '',
                SecondaryEmpAdd: '',

                RetailerName: '',
                // Retailercode: '',
                RetailerWeb: '',
                // RetailerNotes: '',

                isChecked: false,
                submit: null,

                title: '',
                firstName: '',
                lastName: '',
                designation: '',

                secondaryTitle: '',
                secondaryFirstName: '',
                secondaryLastName: '',
                secondaryDesignation: ''
              }}
              validationSchema={Yup.object().shape({
                RetailerName: Yup.string()
                  .max(50, 'Retailer Name must be at most 50 characters')
                  .required('Retailer Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Retailer Name should not be in any special character'),
                // Retailercode: Yup.string().max(30, 'Must be of 30 characters').trim().required('Retailer Code is required'),
                // RetailerPhone: Yup.string() // Validates for numerical value
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),

                RetailerWeb: Yup.string().url('Please enter a valid Retailer Website Address'),
                // RetailerNotes: Yup.string().max(150, 'Must be of 150 characters').trim(),
                // associateEmpName: Yup.string().max(30, ' Must be of 50 characters').trim().required('Primary contact name is required '),
                associateEmpEmail: Yup.string().email('Invalid email address').required('Employee Email is required'),

                associateEmpPhone: Yup.string() // Validates for numerical value
                  .required('Employee Phone is required')
                  .phone('US', true, 'Must be a valid Employee Phone Number. ex.: +1 212-456-7890'),
                // associateEmpOfficePhone: Yup.string()
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890')
                //   .required('Primary contact number is required'),

                associateEmpAdd: Yup.string().max(150, 'Must be of 150 characters').trim().required('Employee Address is required'),

                EmpFullAddress: Yup.string().max(150, 'Must be of 150 characters').trim().required('Address is required'),
                EmpCity: Yup.string().max(50, 'Must be of 50 characters').trim().required('City is required'),
                EmpState: Yup.string().max(50, 'Must be of 50 characters').trim(),
                EmpCountry: Yup.string().max(50, 'Must be of 50 characters').trim(),
                EmpPostal_Code: Yup.string().trim(),

                SecondaryEmpPhone: Yup.string().test('not-negative', 'Employee Phone number cannot be negative', (value) => {
                  if (value && typeof value === 'string') {
                    return !value.startsWith('-');
                    //  return !/^-\d*|-\d+$/.test(value);
                  }
                  return true;
                }),

                SecondaryEmpAdd: Yup.string().max(150, 'Employee Address must be of 30 characters').trim(),
                SecondaryEmpEmail: Yup.string().email('Invalid email address'),

                title: Yup.string().max(5, 'Must be of 5 characters').required('Prefix is required').trim(),
                firstName: Yup.string()
                  .max(50, 'Employee First Name must be at most 50 characters')
                  .required('Employee First Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Employee First Name should not be in any special character'),

                lastName: Yup.string()
                  .max(50, 'Employee Last Name must be at most 50 characters')
                  .required('Employee Last Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Employee Last Name should not be in any special character'),

                designation: Yup.string()
                  .max(50, 'Employee Title must be of 50 characters')
                  .required('Employee Title is required')

                  .trim(),

                secondaryTitle: Yup.string().max(5, ' Prefix must be of 5 characters').trim(),
                secondaryFirstName: Yup.string()
                  .max(50, 'Employee First Name must be at most 50 characters')
                  // .required('Employee First Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Employee First Name should not be in any special character'),

                secondaryLastName: Yup.string()
                  .max(50, 'Employee Last Name must be at most 50 characters')
                  // .required('Employee Last Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Employee Last Name should not be in any special character'),

                secondaryDesignation: Yup.string().max(50, 'Employee Title must be of 50 characters').trim()
              })}
              onSubmit={async (value, { resetForm }) => {
                const submitData = {
                  organizationName: value.RetailerName.trim(),
                  website: value.RetailerWeb.trim(),
                  isChecked: value.isChecked,
                  address: {
                    fullAddress: value.EmpFullAddress.trim(),
                    state: value.EmpState.trim(),
                    city: value.EmpCity.trim(),
                    country: value.EmpCountry.trim(),
                    zip: value.EmpPostal_Code.trim()
                  },
                  contact: {
                    primary: {
                      prefix: value.title,
                      firstName: value.firstName.trim(),
                      lastName: value.lastName.trim(),
                      title: value.designation,
                      email: value.associateEmpEmail.trim(),
                      phone: value.associateEmpPhone.trim(),
                      address: value.associateEmpAdd.trim()
                    },
                    secondary: {
                      prefix: value.secondaryTitle.trim(),
                      firstName: value.secondaryFirstName.trim(),
                      lastName: value.secondaryLastName.trim(),
                      title: value.secondaryDesignation,
                      email: value.SecondaryEmpEmail.trim(),
                      phone: value.SecondaryEmpPhone.trim(),
                      address: value.SecondaryEmpAdd.trim()
                    }
                  }
                };

                addRetailer(submitData);

                //

                resetForm({});
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <RetailerForm
                  btnName="Add"
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  isLoadingRetailer={isLoadingRetailer}
                  setFieldValue={setFieldValue}
                  id={''}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
};

export default RetailerAdd;
