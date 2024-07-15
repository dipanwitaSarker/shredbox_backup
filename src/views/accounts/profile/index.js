import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import MainCard from 'ui-component/cards/MainCard';
import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';
import 'yup-phone';
import FormView from 'ui-component/cards/Skeleton/FormView';
import ProfileForm from './profile-form';
import { useGetProfileById, useProfileUpdate } from 'hooks/useProfileHooks';
// import { useParams } from 'react-router';
function Profile() {
  const [isLoading, setLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log('🚀 ~ userData:', userData);

  const { mutate: updatedProfile, isPending: isLoadingProfileUpdate } = useProfileUpdate();
  const { data: profileDetails } = useGetProfileById();
  // console.log('🚀 ~ Profile ~ profileDetails:', profileDetails);

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
          <BreadcrumbsForPage name="Profile" obj={{ title: 'Profile', title2: '', url: '' }} />
          <MainCard title="Profile">
            <Formik
              initialValues={{
                fname: '',
                lname: '',
                email: '',
                phone: '',
                title: '',
                prefix: '',
                address: '',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                fname: Yup.string().max(50, 'First name must be at most 50 characters').required('First name is required').trim(),
                lname: Yup.string().max(50, 'First name must be at most 50 characters').required('Last name is required').trim(),

                email: Yup.string().email('Invalid email address').required('Email address is required'),
                phone: Yup.string() // Validates for numerical value
                  .phone('US', true, 'Must be a valid phone number. ex.: +1 212-456-7890'),
                address: Yup.string().max(150, 'Must be of 150 characters').trim().required('Address is required'),
                prefix: Yup.string().max(5, 'Must be of 5 characters').required('Title is required').trim(),
                title: Yup.string()
                  .max(50, 'Must be of 50 characters')
                  .required('Designation is required')

                  .trim()
              })}
              onSubmit={async (value) => {
                const submitData = {
                  id: userData?.id,
                  firstName: value.fname,
                  lastName: value.lname,
                  email: value.email,
                  phone: value.phone,
                  prefix: value.prefix,
                  title: value.title,
                  address: value.address
                };
                updatedProfile(submitData);
                // console.log('val', value);
              }}
            >
              {({ errors, handleBlur, handleChange, isSubmitting, touched, values, setFieldValue }) => (
                <ProfileForm
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  isLoadingProfileUpdate={isLoadingProfileUpdate}
                  profileDetails={profileDetails.user}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
}

export default Profile;
