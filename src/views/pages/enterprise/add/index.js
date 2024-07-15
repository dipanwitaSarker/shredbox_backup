import { Formik } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';

import { useState } from 'react';
import { useEffect } from 'react';
import FormView from 'ui-component/cards/Skeleton/FormView';

import EnterpriseForm from '../enterprise-form';
import { useEnterpriseAdd } from 'hooks/useEnterpriseHooks';
// import { useOrganizationAdd } from 'hooks/useOrganizationHooks';

const EnterpriseAdd = () => {
  const [isLoading, setLoading] = useState(true);
  // const userData = JSON.parse(localStorage.getItem('userData'));
  const { mutate: addEnterprise, isPending: isLoadingEnterprise } = useEnterpriseAdd();

  const validationSchema = {
    EnterpriseName: Yup.string()
      .max(50, 'Enterprise Name must be at most 50 characters')
      .required('Enterprise Name is required')
      .trim()
      .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

      .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Enterprise Name should not be in any special character'),

    EnterpriseWeb: Yup.string().url('Please enter a valid Enterprise Website Address'),

    associateEmpEmail: Yup.string().email('Invalid email address').required('Employee Email is required'),
    associateEmpAdd: Yup.string().max(150, 'Employee Address must be of 30 characters').trim().required('Employee Address is required'),
    associateEmpPhone: Yup.string() // Validates for numerical value
      .required('Employee Phone is required')
      .phone('US', true, 'Must be a valid Employee Phone Number. ex.: +1 212-456-7890'),
    // associateEmpOfficePhone: Yup.string() // Validates for numerical value
    //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890')
    //   .required('Primary contact number is required'),

    EmpFullAddress: Yup.string().max(150, 'Must be of 150 characters').trim().required('Address is required'),
    EmpCity: Yup.string().max(50, 'Must be of 50 characters').trim().required('City is required'),
    EmpState: Yup.string().max(50, 'Must be of 50 characters').trim(),
    EmpCountry: Yup.string().max(50, 'Must be of 50 characters').trim(),
    EmpPostal_Code: Yup.string().trim(),

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
      .max(50, ' Employee Title must be of 50 characters')
      .required('Employee Title is required')

      .trim(),

    secondaryTitle: Yup.string().max(5, 'Prefix must be  of 5 characters').trim(),
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

    secondaryDesignation: Yup.string().max(50, ' Employee Title must be of 50 characters').trim(),

    // SecondaryEmpName: Yup.string().max(30, ' Must be of 30 characters').trim(),

    SecondaryEmpPhone: Yup.string().test('not-negative', 'Employee Phone cannot be negative', (value) => {
      if (value && typeof value === 'string') {
        return !value.startsWith('-');
        //  return !/^-\d*|-\d+$/.test(value);
      }
      return true;
    }),
    // SecondaryEmpOfficePhone: Yup.string().test('not-negative', 'Secondary Phone number cannot be negative', (value) => {
    //   if (value && typeof value === 'string') {
    //     return !value.startsWith('-');
    //     //  return !/^-\d*|-\d+$/.test(value);
    //   }
    //   return true;
    // })

    SecondaryEmpAdd: Yup.string().max(150, 'Employee Address must be of 30 characters').trim(),
    SecondaryEmpEmail: Yup.string().email('Invalid email address'),
    users: Yup.array().of(
      Yup.object().shape(
        {
          user_firstname: Yup.string()
            .max(30, 'Must be of 30 characters')
            .when(['rfid_code', 'user_email', 'user_lastname'], {
              is: (dep_1, dep_2, dep_3) => dep_1 || dep_2 || dep_3,
              then: Yup.string().required('First Name is required'),
              otherwise: Yup.string().notRequired()
            }),
          user_lastname: Yup.string()
            .max(30, 'Must be of 30 characters')
            .when(['rfid_code', 'user_email', 'user_firstname'], {
              is: (dep_1, dep_2, dep_3) => dep_1 || dep_2 || dep_3,
              then: Yup.string().required('Last Name is required'),
              otherwise: Yup.string().notRequired()
            }),

          user_email: Yup.string()
            .email('Invalid email address')
            .when(['rfid_code', 'user_firstname', 'user_lastname'], {
              is: (dep_1, dep_2, dep_3) => dep_1 || dep_2 || dep_3,
              then: Yup.string().required('Email is required'),
              otherwise: Yup.string().notRequired()
            }),

          rfid_code: Yup.string().when(['user_email', 'user_firstname', 'user_lastname'], {
            is: (dep_1, dep_2, dep_3) => dep_1 || dep_2 || dep_3,
            then: Yup.string().max(30, 'Must be of 30 characters').required('RFID Code is required'),
            otherwise: Yup.string().notRequired()
          })
        },
        [
          ['rfid_code', 'user_email'],
          ['rfid_code', 'user_firstname'],
          ['user_email', 'user_firstname'],
          ['rfid_code', 'user_lastname'],
          ['user_email', 'user_lastname'],
          ['user_firstname', 'user_lastname']
        ]
      )
    )
  };

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
            name="Add Enterprise Organization"
            obj={{ title: 'All Enterprise Organizations ', title2: 'Add Enterprise Organization', url: '/dashboard/enterprise' }}
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

                EnterpriseName: '',
                // EnterpriseCode: '',
                EnterpriseWeb: '',

                // EnterpriseNotes: '',
                recycler: '',

                title: '',
                firstName: '',
                lastName: '',
                designation: '',

                secondaryTitle: '',
                secondaryFirstName: '',
                secondaryLastName: '',
                secondaryDesignation: '',
                isChecked: false,
                users: [
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' },
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' },
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' },
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' }
                ],

                submit: null
              }}
              validationSchema={Yup.object().shape(validationSchema)}
              onSubmit={async (value, { resetForm }) => {
                // console.log('Submitted value', value);
                const _usr = value.users.filter((i) => i.user_firstname != '');
                const submitData = {
                  organizationName: value?.EnterpriseName,
                  website: value?.EnterpriseWeb,
                  isChecked: value?.isChecked,
                  address: {
                    fullAddress: value?.EmpFullAddress,

                    state: value?.EmpState,
                    city: value?.EmpCity,
                    country: value?.EmpCountry,
                    zip: value?.EmpPostal_Code
                  },
                  contact: {
                    primary: {
                      prefix: value?.title,
                      firstName: value?.firstName.trim(),
                      lastName: value?.lastName.trim(),
                      title: value?.designation,
                      email: value?.associateEmpEmail.trim(),
                      phone: value?.associateEmpPhone,
                      address: value?.associateEmpAdd.trim()
                    },
                    secondary: {
                      prefix: value?.secondaryTitle,
                      firstName: value?.secondaryFirstName.trim(),
                      lastName: value?.secondaryLastName.trim(),
                      title: value?.secondaryDesignation,
                      email: value?.SecondaryEmpEmail.trim(),
                      phone: value?.SecondaryEmpPhone.trim(),
                      address: value?.SecondaryEmpAdd.trim()
                    }
                  },
                  users: _usr
                };

                // console.log('Users', submitData);
                addEnterprise(submitData);
                resetForm({});
                // addEnterprise(submitData);
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue, setValues }) => (
                <EnterpriseForm
                  btnName="Add"
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  isLoadingEnterprise={isLoadingEnterprise}
                  setFieldValue={setFieldValue}
                  setValues={setValues}
                  id={''}
                  // userDetails ={userDetails}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
};

export default EnterpriseAdd;
