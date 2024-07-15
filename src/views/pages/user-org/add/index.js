import { Formik } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import { Typography } from '@mui/material';
import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';
import UserForm from '../user-form';
import { useState } from 'react';
import { useEffect } from 'react';

import FormView from 'ui-component/cards/Skeleton/FormView';
import { useUserAddUnderOrg } from 'hooks/useUserHooks';

// import { useUserAdd } from 'hooks/useUserHooks';
// import { gridSpacing } from 'store/constant';
const UserAdd = () => {
  const [isLoading, setLoading] = useState(true);
  const { mutate: addUser, isPending: isLoadingUser } = useUserAddUnderOrg();

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
            name="Add Organizations User"
            obj={{ title: 'Organizations Users', title2: 'Add Organizations User', url: '/dashboard/organizations/user-org' }}
          />
          <MainCard>
            <Formik
              initialValues={{
                fname: '',
                lname: '',
                email: '',
                password: '',
                phone: '',
                role: '',

                submit: null
              }}
              validationSchema={Yup.object().shape({
                fname: Yup.string()
                  .max(30, 'Organization User first name must be maximum 30 characters')
                  .required(' Organization User first name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')
                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Organization User first name should not be in any special character'),
                lname: Yup.string()
                  .max(30, 'Organization User last name must be maximum 30 characters')
                  .required('Organization User last name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')
                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Organization User last name should not be in any special character'),
                email: Yup.string().email('Invalid email address').required(' Organization User email is required'),

                password: Yup.string()
                  .min(8, 'Password must be minimum 8 characters')
                  .max(10, 'Password must be maximum 10 characters')
                  .matches(
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                    'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
                  )
                  .required('Organization User password is required'),

                role: Yup.string().required('Organization User role is required'),
                phone: Yup.string() // Validates for numerical value
                  .required('Organization User phone number is required') // Sets it as a compulsory field
                  .phone('US', true, ' Organization User must be a valid phone number. ex.: +1 212-456-7890') // Validates against negative values
                // .min(10, ' phone number must be greater than or equal to 10!') // Sets a minimum value});
              })}
              onSubmit={async (value, { resetForm }) => {
                const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));
                const submitData = {
                  organizationId: userOrgId,
                  roleId: value?.role,
                  user: {
                    firstName: value.fname.trim(),
                    lastName: value.lname.trim(),
                    email: value.email,
                    phone: value.phone,
                    password: value.password,
                    address: value.address,
                    city: value.city,
                    state: value.state,
                    country: value.country
                  }
                };
                addUser(submitData);
                resetForm({});
          
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <UserForm
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  isLoadingUser={isLoadingUser}
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

export default UserAdd;
