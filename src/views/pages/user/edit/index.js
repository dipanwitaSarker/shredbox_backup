import { Formik } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import { Typography } from '@mui/material';
import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';

import UserForm from '../user-form';
import { useState, useEffect } from 'react';
import FormView from 'ui-component/cards/Skeleton/FormView';
import { useGetUserById, useGetUserEdited } from 'hooks/useUserHooks';
import { useParams } from 'react-router-dom';
import 'yup-phone';

// import { gridSpacing } from 'store/constant';
const UserEdit = () => {
  let { id } = useParams();
  const { data: userDetails } = useGetUserById({
    id: id.slice(1)
  });

  const { mutate: updatedUser, isPending: isLoadingUpdateUser } = useGetUserEdited();

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
          <BreadcrumbsForPage name={`Edit User ${id}`} obj={{ title: 'Users', title2: `Edit User ${id}`, url: '/dashboard/users' }} />
          <MainCard>
            <Formik
              initialValues={{
                fname: '',
                lname: '',
                email: '',
                // password: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                country: '',
                role: '',

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
                email: Yup.string().email('Invalid email address').required(' User email is required'),
                phone: Yup.string() // Validates for numerical value
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890') // Validates against negative values
                  .required('Please enter your phone number')
                // password: Yup.string().max(255).required(' User password is required'),
                // password: Yup.string()
                //   .matches(
                //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                //     'Password must contain at least 8 characters, one letter, and one number'
                //   )
                //   .max(255)
                //   .required('User password is required'),
              })}
              onSubmit={async (value) => {
              
                const submitData = {
                  user: {
                    id: id.slice(1),
                    enable: true,
                    firstName: value.fname.trim(),
                    lastName: value.lname.trim(),
                    email: value.email.trim(),
                    phone: value.phone
                    // password: value.password,
                    // address: value.address,
                    // city: value.city,
                    // state: value.state,
                    // country: value.country
                  }
                };
                updatedUser(submitData);
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
                  setFieldValue={setFieldValue}
                  userDetails={userDetails?.user}
                  isLoadingUser={isLoadingUpdateUser}
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

export default UserEdit;
