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
import { useUserAdd } from 'hooks/useUserHooks';

// import { useUserAdd } from 'hooks/useUserHooks';
// import { gridSpacing } from 'store/constant';
const UserAdd = () => {
  const [isLoading, setLoading] = useState(true);
  const { mutate: addingUser, isPending: isLoadingUser } = useUserAdd();

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
          <BreadcrumbsForPage name="Add User" obj={{ title: 'Users', title2: 'Add User', url: '/dashboard/users' }} />
          <MainCard>
            <Formik
              initialValues={{
                fname: '',
                lname: '',
                email: '',
                password: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                country: '',
                // role: '',

                submit: null
              }}
              validationSchema={Yup.object().shape({
                fname: Yup.string()
                  .max(50)
                  .required(' User first name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')
                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'User first name should not be in any special character'),
                lname: Yup.string()
                  .max(50)
                  .required(' User last name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')
                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'User last name should not be in any special character'),
                // email: Yup.string().max(255).required(' User email is required'),
                email: Yup.string().email('Invalid email address').required(' User email is required'),
                // phone: Yup.string().max(255).required(' User phone is required'),
                // password: Yup.string().max(255).required(' User password is required'),
                password: Yup.string()
                  .min(8, 'Password must be minimum 8 characters')
                  .max(10, 'Password must be maximum 10 characters')
                  .matches(
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                    'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
                  )
                  .required('User password is required'),
                phone: Yup.string() // Validates for numerical value
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890') // Validates against negative values
                  .required('Please enter your phone number')
                // role: Yup.string().max(255).required(' User role is required'),
                // phone: Yup.number('Must be a number type') // Validates for numerical value
                //   .positive('Must be a positive value') // Validates against negative values
                //   .required('Please enter a phone number. The field cannot be left blank.') // Sets it as a compulsory field
                //   .min(1, 'Hey! Your phone number must be greater than or equal to 1!') // Sets a minimum value});
              })}
              onSubmit={async (value, { resetForm }) => {
                const submitData = {
                  // organizationId: 'C2',
                  // roleId: value?.role,
                  user: {
                    firstName: value.fname.trim(),
                    lastName: value.lname.trim(),
                    email: value.email.trim(),
                    phone: value.phone,
                    password: value.password,
                    address: value.address,
                    city: value.city,
                    state: value.state,
                    country: value.country
                  }
                };
                addingUser(submitData);
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
