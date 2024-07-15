import React from 'react';
import { Formik } from 'formik';

import MainCard from 'ui-component/cards/MainCard';

import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';

import { useParams } from 'react-router-dom';
import FormView from 'ui-component/cards/Skeleton/FormView';
import { useState, useEffect } from 'react';
// import { useGetOrgById, useGetOrgEditedList } from 'hooks/useOrganizationHooks';

import EnterpriseForm from '../enterprise-form';
import { useGetEnterpriseById, useGetEnterpriseEditedList } from 'hooks/useEnterpriseHooks';

const EnterpriseEdit = () => {
  let { id } = useParams();
  const { data: enterpriseDetails } = useGetEnterpriseById({
    id: id.slice(1)
  });
  // const userData = JSON.parse(localStorage.getItem('userData'));

  // console.log('🚀 ~ enterpriseDetails:', enterpriseDetails);

  const { mutate: updatedEnterprise, isPending: isLoadingEnterprise } = useGetEnterpriseEditedList();

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
            name={`Edit Enterprise Organization ${id}`}
            obj={{ title: 'All Enterprise Organizations', title2: `Edit Enterprise Organization ${id}`, url: '/dashboard/enterprise' }}
          />
          <MainCard>
            <Formik
              initialValues={{
                //    associateEmpName: '',
                associateEmpEmail: '',
                associateEmpPhone: '',
                // associateEmpOfficePhone: '',
                associateEmpAdd: '',

                EmpFullAddress: '',
                EmpCity: '',
                EmpState: '',
                EmpCountry: '',
                EmpPostal_Code: '',

                //  SecondaryEmpName: '',
                SecondaryEmpEmail: '',
                SecondaryEmpPhone: '',
                //SecondaryEmpOfficePhone: '',
                SecondaryEmpAdd: '',

                EnterpriseName: '',
                //EnterpriseCode: '',
                EnterpriseWeb: '',

                // EnterpriseNotes: '',

                title: '',
                firstName: '',
                lastName: '',
                designation: '',

                secondaryTitle: '',
                secondaryFirstName: '',
                secondaryLastName: '',
                secondaryDesignation: '',
                users: [
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' },
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' },
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' },
                  { user_firstname: '', user_email: '', rfid_code: '', user_lastname: '' }
                ],
                isChecked: false,
                primaryId: '',
                SecondaryId: '',
                addressId: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                EnterpriseName: Yup.string()
                  .max(50, 'Enterprise Name must be at most 50 characters')
                  .required('Enterprise Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Enterprise Name should not be in any special character'),
                // EnterpriseCode: Yup.string().max(30, 'Must be of 30 characters').trim().required('Enterprise Code is required'),

                EnterpriseWeb: Yup.string().url('Please enter a valid Enterprise Website Address'),

                associateEmpEmail: Yup.string().email('Invalid email address').required('Employee Email is required'),

                associateEmpPhone: Yup.string() // Validates for numerical value
                  .required('Employee Phone is required')
                  .phone('US', true, 'Must be a valid Employee Phone Number. ex.: +1 212-456-7890'),

                associateEmpAdd: Yup.string().max(150, ' Employee Address must be of 30 characters').trim().required('Employee Address is required'),

                EmpFullAddress: Yup.string().max(150, 'Must be of 150 characters').trim().required(' Full Address is required'),
                EmpCity: Yup.string().max(50, 'Must be of 50 characters').trim().required('City is required'),
                EmpState: Yup.string().max(50, 'Must be of 50 characters').trim(),
                EmpCountry: Yup.string().max(50, 'Must be of 50 characters').trim(),
                EmpPostal_Code: Yup.string().trim(),

                title: Yup.string().max(5, 'Must be of 5 characters').required('Prefix is required').trim(),
                firstName: Yup.string()
                  .max(50, 'Employee First Name  must be at most 50 characters')
                  .required('Employee First Name  is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Employee First Name  should not be in any special character'),

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
                secondaryTitle: Yup.string().max(5, 'Prefix must be of 5 characters').trim(),
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

                //SecondaryEmpName: Yup.string().max(30, ' Must be of 50 characters').trim(),
                // SecondaryEmpPhone: Yup.string().max(50, 'Must be 50 characters '),
                // SecondaryEmpPhone: Yup.string()
                //   .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),
                SecondaryEmpPhone: Yup.string().test('not-negative', 'Employee Phone cannot be negative', (value) => {
                  if (value && typeof value === 'string') {
                    return !value.startsWith('-');
                    //  return !/^-\d*|-\d+$/.test(value);
                  }
                  return true;
                }),

                SecondaryEmpEmail: Yup.string().email('Invalid email address'),

                // SecondaryEmpOfficePhone: Yup.string().test('not-negative', 'Secondary Office Phone number cannot be negative', (value) => {
                //   if (value && typeof value === 'string') {
                //     return !value.startsWith('-');
                //     //  return !/^-\d*|-\d+$/.test(value);
                //   }
                //   return true;
                // }),
                SecondaryEmpAdd: Yup.string().max(150, 'Employee Address must be of 30 characters').trim()
              })}
              onSubmit={async (value) => {
                const submitData = {
                  organizationName: value?.EnterpriseName,
                  website: value?.EnterpriseWeb,
                  isChecked: value?.isChecked,
                  id: id.slice(1),

                  address: {
                    fullAddress: value?.EmpFullAddress,
                    state: value?.EmpState,
                    city: value?.EmpCity,
                    country: value?.EmpCountry,
                    zip: value?.EmpPostal_Code,
                    id: value.addressId
                  },
                  contact: {
                    primary: {
                      prefix: value?.title,
                      firstName: value?.firstName.trim(),
                      lastName: value?.lastName.trim(),
                      title: value?.designation,
                      email: value?.associateEmpEmail.trim(),
                      phone: value?.associateEmpPhone,
                      address: value?.associateEmpAdd.trim(),
                      id: value.primaryId
                    },
                    secondary: {
                      prefix: value?.secondaryTitle,
                      firstName: value?.secondaryFirstName.trim(),
                      lastName: value?.secondaryLastName.trim(),
                      title: value?.secondaryDesignation,
                      email: value?.SecondaryEmpEmail.trim(),
                      phone: value?.SecondaryEmpPhone.trim(),
                      address: value?.SecondaryEmpAdd.trim(),
                      id: value.SecondaryId
                    }
                  }
                };
                // console.log('🚀 ~ onSubmit={ ~ submitData:', submitData);
                updatedEnterprise(submitData);
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <EnterpriseForm
                  btnName="Update"
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  enterpriseDetails={enterpriseDetails?.enterprise}
                  isLoadingEnterprise={isLoadingEnterprise}
                  id={id.slice(1)}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
};

export default EnterpriseEdit;
