import { Formik } from 'formik';
import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import FormView from 'ui-component/cards/Skeleton/FormView';
import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import RecyclerForm from '../recycler-form';
import * as Yup from 'yup';
import 'yup-phone';
import { useRecyclerAdd } from 'hooks/useRecycleHooks';

const RecyclerAdd = () => {
  const [isLoading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const { mutate: addRecycle, isPending: isLoadingRecycle } = useRecyclerAdd();

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
            name="Add Recycler Organization"
            obj={{ title: 'All Recycler Organizations', title2: 'Add Recycler Organization', url: '/dashboard/recycler' }}
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

                RecyclerName: '',
                RecyclerWeb: '',

                title: '',
                firstName: '',
                lastName: '',
                designation: '',

                secondaryTitle: '',
                secondaryFirstName: '',
                secondaryLastName: '',
                secondaryDesignation: '',

                // RecycleNotes: '',

                // RecyclerCode: '',
                recycler_radius: '',
                isChecked: false,
                submit: null
              }}
              validationSchema={Yup.object().shape({
                RecyclerName: Yup.string()
                  .max(50, 'Recycler Name must be at most 50 characters')
                  .required('Recycler Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Recycler Name should not be in any special character'),
                // RecyclerCode: Yup.string().max(30, 'Must be of 30 characters').trim().required('Recycler Code is required'),

                RecyclerWeb: Yup.string().url('Please enter a valid Recycler Website Address'),
                // RecycleNotes: Yup.string().max(150, 'Must be of 150 characters').trim(),

                // associateEmpName: Yup.string().max(30, ' Must be of 30 characters').trim().required('Primary contact name is required '),
                associateEmpEmail: Yup.string().email('Invalid email address').required('Employee Email is required'),

                associateEmpPhone: Yup.string()
                  .required('Employee Phone is required')
                  .phone('US', true, 'Must be a valid Employee Phone Number. ex.: +1 212-456-7890'),
                // associateEmpOfficePhone: Yup.string()
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890')
                //   .required('Primary contact number is required'),
                associateEmpAdd: Yup.string()
                  .max(150, 'Employee Address must be of 150 characters')
                  .trim()
                  .required('Employee Address is required'),

                EmpFullAddress: Yup.string().max(150, 'Must be of 150 characters').trim().required(' Address is required'),
                EmpCity: Yup.string().max(50, 'Must be of 50 characters').trim().required('City is required'),
                EmpState: Yup.string().max(50, 'Must be of 50 characters').trim(),
                EmpCountry: Yup.string().max(50, 'Must be of 50 characters').trim(),
                EmpPostal_Code: Yup.string().trim(),

                // SecondaryEmpName: Yup.string().max(30, ' Must be of 30 characters').trim(),

                // SecondaryEmpPhone: Yup.string().max(50, 'Must be 50 characters '),
                // SecondaryEmpPhone: Yup.string()
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),
                SecondaryEmpPhone: Yup.string().test('not-negative', 'Employee Phone  cannot be negative', (value) => {
                  if (value && typeof value === 'string') {
                    return !value.startsWith('-');
                    //  return !/^-\d*|-\d+$/.test(value);
                  }
                  return true;
                }),
                // Yup.string() // Validates for numerical value
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),

                SecondaryEmpAdd: Yup.string().max(150, 'Employee Address must be of 30 characters').trim(),

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

                secondaryTitle: Yup.string().max(5, 'Prefix must be be of 5 characters').trim(),
                secondaryFirstName: Yup.string()
                  .max(50, 'Employee First Name must be at most 50 characters')
                  // .required('First Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Employee First Name should not be in any special character'),

                secondaryLastName: Yup.string()
                  .max(50, 'Employee Last Name must be at most 50 characters')
                  // .required('Last Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Employee Last Name should not be in any special character'),

                secondaryDesignation: Yup.string().max(50, ' Employee Title must be of 50 characters').trim(),
                // SecondaryEmpOfficePhone: Yup.string().test('not-negative', 'Secondary Phone number cannot be negative', (value) => {
                //   if (value && typeof value === 'string') {
                //     return !value.startsWith('-');
                //     //  return !/^-\d*|-\d+$/.test(value);
                //   }
                //   return true;
                // }),
                // SecondaryEmpAdd: Yup.string().max(150, 'Must be of 30 characters').trim(),
                SecondaryEmpEmail: Yup.string().email('Invalid email address'),
                recycler_radius: Yup.number()
                  .positive('Recycler Service Radius must contain a positive number')
                  .integer('Recycler Service Radius should contain an integer')
                  .when('areSeatsLimited', {
                    is: 'yes',
                    then: Yup.number().required().typeError('Recycler Service Radius must be a number'),
                    otherwise: Yup.number().notRequired().typeError('Recycler Service Radius must be a number')
                  })
              })}
              onSubmit={async (value, { resetForm }) => {
                const submitData = {
                  organizationName: value.RecyclerName.trim(),
                  website: value.RecyclerWeb.trim(),
                  createdBy: userData?.type,
                  serviceRadius: value.recycler_radius.trim(),
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

                addRecycle(submitData);
                resetForm({});
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <RecyclerForm
                  btnName="Add"
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  isLoadingRecycle={isLoadingRecycle}
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

export default RecyclerAdd;
