import { Formik } from 'formik';
import React from 'react';
import MainCard from 'ui-component/cards/MainCard';

import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';
import * as Yup from 'yup';

import RoleManagementForm from 'views/pages/role-management/role-form';
import { useState, useEffect } from 'react';
import FormView from 'ui-component/cards/Skeleton/FormView';
import { useParams } from 'react-router-dom';
import { useGetRoleById, useGetRoleEditedList } from 'hooks/useRoleHooks';

const permissionData = [
  {
    permission: 'Allow to Edit Machine',
    id: 0,
    status: false
  },
  {
    permission: 'Allow to Add Org.',
    id: 1,
    status: false
  },
  {
    permission: 'Allow to Edit Org.',
    id: 2,
    status: false
  },
  {
    permission: 'Allow to Add Users',
    id: 3,
    status: false
  },
  {
    permission: 'Allow to Edit Users',
    id: 4,
    status: false
  },
  {
    permission: 'Allow to Add Role',
    id: 5,
    status: false
  },
  {
    permission: 'Allow to Edit Role',
    id: 6,
    status: false
  }
];
// {
//   "allow_add_role": true,
//   "allow_edit_role": true,
//   "allow_edit_org": false,
//   "allow_edit_user": true,
//   "allow_add_user": true,
//   "allow_add_org": false,
//   "allow_edit_machine": false
// }
const EditRole = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const { data: roleDetails } = useGetRoleById({
    id: id.slice(1)
  });

  const { mutate: updatedRole, isPending: isLoadingUpdatedRole } = useGetRoleEditedList();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

 
  return (
    <>
      {isLoading ? (
        <FormView />
      ) : (
        <>
          <BreadcrumbsForPage
            name={`Edit Role ${id}`}
            obj={{ title: 'Role Management', title2: `Edit Role ${id}`, url: '/dashboard/role-management' }}
          />
          <MainCard>
            <Formik
              initialValues={{
                roleName: '',
                permission: [],
                // organizationId:'',
                submit: null
              }}
              validationSchema={Yup.object().shape({
                roleName:
                  // Yup.string().max(255).required('Role name is required'),
                  Yup.string()
                    .max(50, 'Role name must be under 50 characters')
                    .required(' Role name is required')
                    .trim()
                    .matches(/^(?!\s+$).*/, 'Spaces should not be allowed!')
                    .matches(/^[^!@#$%^&*()_+\-=\\[\]{}:';"\\|,.<>\\?]*$/, 'Role name should not be in any special character'),
                permission: Yup.array().min(1, 'Atleast one permission is required').required('Atleast one permission is required')
              })}
              onSubmit={async (value) => {
                const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));

                const submitData = {
                  organizationId: userOrgId,
                  role: {
                    id: id?.slice(1),
                    name: value.roleName,
                    permissions: {
                      allow_edit_machine: false,
                      allow_add_org: false,
                      allow_edit_org: false,
                      allow_add_user: false,
                      allow_edit_user: false,
                      allow_add_role: false,
                      allow_edit_role: false
                    }
                  }
                };
                for (let index = 0; index < permissionData.length; index++) {
                  const elementI = permissionData[index];
                  for (let index = 0; index < value?.permission?.length; index++) {
                    const elementJ = value?.permission[index];
                    if (elementJ.id === 0) {
                      submitData.role.permissions.allow_edit_machine = elementJ.status;
                    }
                    if (elementI.id === elementJ.id) {
                      if (elementJ.id === 1) {
                        submitData.role.permissions.allow_add_org = elementJ.status;
                      }
                      if (elementJ.id === 2) {
                        submitData.role.permissions.allow_edit_org = elementJ.status;
                      }
                      if (elementJ.id === 3) {
                        submitData.role.permissions.allow_add_user = elementJ.status;
                      }
                      if (elementJ.id === 4) {
                        submitData.role.permissions.allow_edit_user = elementJ.status;
                      }
                      if (elementJ.id === 5) {
                        submitData.role.permissions.allow_add_role = elementJ.status;
                      }
                      if (elementJ.id === 6) {
                        submitData.role.permissions.allow_edit_role = elementJ.status;
                      }
                    }
                  }
                }
                updatedRole(submitData);
               
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <RoleManagementForm
                  errors={errors}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                  permissionData={permissionData}
                  roleDetails={roleDetails?.role}
                  isLoadingRole={isLoadingUpdatedRole}
                />
              )}
            </Formik>
          </MainCard>
        </>
      )}
    </>
  );
};

export default EditRole;