import React from 'react';
import { Formik } from 'formik';

import MainCard from 'ui-component/cards/MainCard';

import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';

import { useParams } from 'react-router-dom';
import FormView from 'ui-component/cards/Skeleton/FormView';
import { useState, useEffect } from 'react';
// import { useGetOrgById } from 'hooks/useOrganizationHooks';
import RetailerForm from '../retailer-form';
import { useGetRetailerById, useGetRetailerEditedList } from 'hooks/useRetailerHooks';

const RetailerEdit = () => {
  let { id } = useParams();
  const { data: retailerDetails } = useGetRetailerById({
    id: id.slice(1)
  });
  // console.log('🚀 ~ retailerDetails:', retailerDetails);
  const { mutate: updatedRetailer, isPending: isLoadingUpdatedRetailer } = useGetRetailerEditedList();

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
            name={`Edit Retailer Organization ${id}`}
            obj={{ title: 'All Retailer Organizations', title2: 'Edit Retailer Organization', url: '/dashboard/retailer' }}
          />
          <MainCard>
            <Formik
              initialValues={{
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
                secondaryDesignation: '',
                primaryId: '',
                SecondaryId: '',
                addressId: ''
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

                // SecondaryEmpName: Yup.string().max(30, ' Must be of 50 characters').trim(),

                // SecondaryEmpPhone: Yup.string() // Validates for numerical value
                //   .phone('US', false, 'Must be a valid phone number. ex.: +1 212-456-7890')
                //   .notRequired(),

                SecondaryEmpPhone: Yup.string().test('not-negative', 'Secondary Phone number cannot be negative', (value) => {
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
                // }),
                SecondaryEmpAdd: Yup.string().max(150, 'Must be of 30 characters').trim(),
                SecondaryEmpEmail: Yup.string().email('Invalid email address'),

                title: Yup.string().max(5, 'Must be of 5 characters').required('Title is required').trim(),
                firstName: Yup.string()
                  .max(50, 'First Name must be at most 50 characters')
                  .required('First Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'First Name should not be in any special character'),

                lastName: Yup.string()
                  .max(50, 'Last Name must be at most 50 characters')
                  .required('Last Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Last Name should not be in any special character'),

                designation: Yup.string()
                  .max(50, 'Must be of 50 characters')
                  .required('Designation is required')

                  .trim(),

                secondaryTitle: Yup.string().max(5, 'Must be of 5 characters').trim(),
                secondaryFirstName: Yup.string()
                  .max(50, 'First Name must be at most 50 characters')
                  // .required('First Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'First Name should not be in any special character'),

                secondaryLastName: Yup.string()
                  .max(50, 'Last Name must be at most 50 characters')
                  // .required('Last Name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')

                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Last Name should not be in any special character'),

                secondaryDesignation: Yup.string().max(50, 'Must be of 50 characters').trim()
              })}
              onSubmit={async (value) => {
                // const submitData = {
                //   name: value.RetailerName.trim(),
                //   website: value.RetailerWeb.trim(),
                //   notes: value.RetailerNotes.trim(),
                //   code: value.Retailercode.trim(),
                //   isChecked: value.isChecked,
                //   enabled: value.isEnable,
                //   id: id.slice(1),
                //   contact: {
                //     primary: {
                //       name: value.associateEmpName.trim(),
                //       email: value.associateEmpEmail.trim(),
                //       cellPhone: value.associateEmpPhone.trim(),
                //       officePhone: value.associateEmpOfficePhone.trim(),
                //       address: value.associateEmpAdd.trim()
                //     },
                //     secondary: {
                //       name: value.SecondaryEmpName.trim(),
                //       email: value.SecondaryEmpEmail.trim(),
                //       cellPhone: value.SecondaryEmpPhone.trim(),
                //       officePhone: value.SecondaryEmpOfficePhone.trim(),
                //       address: value.SecondaryEmpAdd.trim()
                //     }
                //   }
                // };
                const submitData = {
                  organizationName: value.RetailerName.trim(),
                  website: value.RetailerWeb.trim(),
                  isChecked: value.isChecked,
                  id: id.slice(1),

                  address: {
                    fullAddress: value.EmpFullAddress.trim(),
                    state: value.EmpState.trim(),
                    city: value.EmpCity.trim(),
                    country: value.EmpCountry.trim(),
                    zip: value.EmpPostal_Code.trim(),
                    id: value.addressId
                  },
                  contact: {
                    primary: {
                      prefix: value.title,
                      firstName: value.firstName.trim(),
                      lastName: value.lastName.trim(),
                      title: value.designation,
                      email: value.associateEmpEmail.trim(),
                      phone: value.associateEmpPhone.trim(),
                      address: value.associateEmpAdd.trim(),
                      id: value.primaryId
                    },
                    secondary: {
                      prefix: value.secondaryTitle.trim(),
                      firstName: value.secondaryFirstName.trim(),
                      lastName: value.secondaryLastName.trim(),
                      title: value.secondaryDesignation,
                      email: value.SecondaryEmpEmail.trim(),
                      phone: value.SecondaryEmpPhone.trim(),
                      address: value.SecondaryEmpAdd.trim(),
                      id: value.SecondaryId
                    }
                  }
                };

                updatedRetailer(submitData);
             
                // updatedOrg(submitData);
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <RetailerForm
                  btnName="Update"
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  retailerDetails={retailerDetails?.retailer}
                  isLoadingRetailer={isLoadingUpdatedRetailer}
                  id={id}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
};

export default RetailerEdit;
