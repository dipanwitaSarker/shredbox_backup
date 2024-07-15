import { Formik } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import { Typography } from '@mui/material';
import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';

import UserForm from '../user-form';
import { useState, useEffect } from 'react';
import FormView from 'ui-component/cards/Skeleton/FormView';
import { useGetUserByIdUnderOrg, useGetUserEditedListUnderOrg } from 'hooks/useUserHooks';
import { useParams } from 'react-router-dom';

// import { gridSpacing } from 'store/constant';
const UserEdit = () => {
  let { id } = useParams();

  const { data: userDetailsUnderOrg } = useGetUserByIdUnderOrg({
    id: id.slice(1)
  });

  const { mutate: updatedUserUnderOrg, isPending: isLoadingUpdateUserUnderOrg } = useGetUserEditedListUnderOrg();

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
            name={`Edit Organizations User ${id}`}
            obj={{ title: 'Organizations Users', title2: `Edit Organizations User ${id}`, url: '/dashboard/organizations' }}
          />
          <MainCard>
            <Formik
              initialValues={{
                fname: '',
                lname: '',
                email: '',
                // password: '',
                phone: '',
                role: '',

                submit: null
              }}
              validationSchema={Yup.object().shape({
                fname: Yup.string()
                  .max(30, 'First name must be maximum 30 characters')
                  .required(' User first name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')
                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'User first name should not be in any special character'),

                lname: Yup.string()
                  .max(30, 'Last name must be maximum 30 characters')
                  .required(' User last name is required')
                  .trim()
                  .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')
                  .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'User last name should not be in any special character'),
                email: Yup.string().email('Invalid email address').required('User email is required'),

                // password: Yup.string().max(255).required(' User password is required'),
                // password: Yup.string()
                //   .matches(
                //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                //     'Password must contain at least 8 characters, one letter, and one number'
                //   )
                //   .max(255)
                //   .required('User password is required'),
                phone: Yup.string() // Validates for numerical value
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890') // Validates against negative values
                  .required('Please enter your phone number'), // Sets it as a compulsory field
                // .min(10, ' phone number must be greater than or equal to 10!') // Sets a minimum value});
                role: Yup.string().max(50).required(' User role is required')
              })}
              onSubmit={async (value) => {
                const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));

                const submitData = {
                  organizationId: userOrgId,
                  roleId: value?.role,
                  // id: id.slice(1),
                  user: {
                    id: id.slice(1),
                    enable: true,
                    firstName: value.fname.trim(),
                    lastName: value.lname.trim(),
                    email: value.email,
                    phone: value.phone
                    // password: value.password,
                    // address: value.address,
                    // city: value.city,
                    // state: value.state,
                    // country: value.country
                  }
                };
                updatedUserUnderOrg(submitData);
               
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
                  userDetailsUnderOrg={userDetailsUnderOrg?.user}
                  id={id}
                  isLoadingUser={isLoadingUpdateUserUnderOrg}
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
