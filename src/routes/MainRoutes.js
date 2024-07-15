import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

//  page routing
const MachinePage = Loadable(lazy(() => import('views/pages/machines')));
const MachineEditPage = Loadable(lazy(() => import('views/pages/machines/edit')));
const OrganizationPage = Loadable(lazy(() => import('views/pages/organizations')));
const OrganizationEditPage = Loadable(lazy(() => import('views/pages/organizations/edit')));
const OrganizationAddPage = Loadable(lazy(() => import('views/pages/organizations/add')));
const UserPage = Loadable(lazy(() => import('views/pages/user')));
const UserAddPage = Loadable(lazy(() => import('views/pages/user/add')));
const UserEditPage = Loadable(lazy(() => import('views/pages/user/edit')));
// const RoleManagementPage = Loadable(lazy(() => import('views/pages/role-management')));
// const RoleManagementEditPage = Loadable(lazy(() => import('views/pages/role-management/edit')));
// const RoleManagementAddPage = Loadable(lazy(() => import('views/pages/role-management/add')));
const ProfilePage = Loadable(lazy(() => import('views/accounts/profile')));
const UserAddUnderOrg = Loadable(lazy(() => import('views/pages/user-org/add')));
const UserUnderOrg = Loadable(lazy(() => import('views/pages/user-org')));
const UserEditUnderOrg = Loadable(lazy(() => import('views/pages/user-org/edit')));
const RedirectingEmailPage = Loadable(lazy(() => import('views/pages/redirecting-emailpage')));
const ForgotPasswordPage = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword')));
const RecyclerList = Loadable(lazy(() => import('views/pages/recycler')));
const EnterpriseList = Loadable(lazy(() => import('views/pages/enterprise')));
const RetailerList = Loadable(lazy(() => import('views/pages/retailer')));
const PublicUserList = Loadable(lazy(() => import('views/pages/retailer/public-user')));
const RecyclerAddPage = Loadable(lazy(() => import('views/pages/recycler/add')));
const RecyclerEditPage = Loadable(lazy(() => import('views/pages/recycler/edit')));

const RecyclerUserList = Loadable(lazy(() => import('views/pages/recycler/recycler-user')));

const EnterpriseUserList = Loadable(lazy(()=>import('views/pages/enterprise/enterprise-user')))
const EnterpriseAddPage = Loadable(lazy(() => import('views/pages/enterprise/add')));
const EnterpriseEditPage = Loadable(lazy(() => import('views/pages/enterprise/edit')));
const RetailerAddPage = Loadable(lazy(() => import('views/pages/retailer/add')));
const RetailerEditPage = Loadable(lazy(() => import('views/pages/retailer/edit')));
const ResetPasswordPage = Loadable(lazy(() => import('views/accounts/reset-password')));
// const ProfilePage = Loadable(lazy(() => import('views/accounts/profile/index')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = (userRoot) => [
  {
    path: '/',
    element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <Navigate to="/dashboard/default" /> : <MinimalLayout />,
    children: [
      {
        path: '/',
        element: <AuthLogin3 />
      },
      {
        path: '/confirm-password',
        element: <RedirectingEmailPage />
      },

      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />
      }
      // {
      //   path: '/pages/register/register3',
      //   element: <AuthRegister3 />
      // }
    ]
  },

  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      {
        path: '/dashboard/default',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <DashboardDefault /> : <Navigate to="/" />
      },
      {
        path: 'dashboard',
        children: [
          {
            path: 'default',
            element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <DashboardDefault /> : <Navigate to="/" />
          }
        ]
      },
      {
        path: 'machines',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <MachinePage /> : <Navigate to="/" />
      },
      {
        path: 'machines/edit:id',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <MachineEditPage /> : <Navigate to="/" />
      },
      {
        path: 'organizations',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <OrganizationPage /> : <Navigate to="/" />
      },
      {
        path: 'organizations/edit:id',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <OrganizationEditPage /> : <Navigate to="/" />
      },
      {
        path: 'organizations/add',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <OrganizationAddPage /> : <Navigate to="/" />
      },
      //Users under Org
      {
        path: 'organizations/user-org',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <UserUnderOrg /> : <Navigate to="/" />
      },

      {
        path: 'organizations/user-org/add',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <UserAddUnderOrg /> : <Navigate to="/" />
      },
      {
        path: 'organizations/user-org/edit:id',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <UserEditUnderOrg /> : <Navigate to="/" />
      },
      {
        path: 'users',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <UserPage /> : <Navigate to="/" />
      },
      {
        path: 'user/add',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <UserAddPage /> : <Navigate to="/" />
      },
      {
        path: 'user/edit:id',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <UserEditPage /> : <Navigate to="/" />
      },
      {
        path: 'recycler',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RecyclerList /> : <Navigate to="/" />
      },
      {
        path: 'recycler/add',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RecyclerAddPage /> : <Navigate to="/" />
      },

      {
        path: 'recycler/edit:id',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RecyclerEditPage /> : <Navigate to="/" />
      },
      {
        path: 'recycler/user',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RecyclerUserList /> : <Navigate to="/" />
      },
      {
        path: 'enterprise',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <EnterpriseList /> : <Navigate to="/" />
      },

      {
        path: 'enterprise/add',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <EnterpriseAddPage /> : <Navigate to="/" />
      },

      {
        path: 'enterprise/edit:id',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <EnterpriseEditPage /> : <Navigate to="/" />
      },

      {
        path: 'enterprise/user',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <EnterpriseUserList /> : <Navigate to="/" />
      },

      {
        path: 'retailer',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RetailerList /> : <Navigate to="/" />
      },
      {
        path: 'retailer/add',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RetailerAddPage /> : <Navigate to="/" />
      },
      {
        path: 'retailer/edit:id',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RetailerEditPage /> : <Navigate to="/" />
      },
      {
        path: 'retailer/public-user',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <PublicUserList /> : <Navigate to="/" />
      },
      // {
      //   path: 'user/user_under_org',
      //   element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <UserUnderOrg /> : <Navigate to="/" />
      // },
      // {
      //   path: 'role-management',
      //   element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RoleManagementPage /> : <Navigate to="/" />
      // },
      // {
      //   path: 'role-management/edit:id',
      //   element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RoleManagementEditPage /> : <Navigate to="/" />
      // },
      // {
      //   path: 'role-management/add',
      //   element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <RoleManagementAddPage /> : <Navigate to="/" />
      // },
      {
        path: 'profile',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <ProfilePage /> : <Navigate to="/" />
      },
      {
        path: 'profile/reset-password',
        element: userRoot.isAuthenticated || localStorage.getItem('userJwtToken') ? <ResetPasswordPage /> : <Navigate to="/" />
      }
      // {
      //   path: 'utils',
      //   children: [
      //     {
      //       path: 'util-color',
      //       element:  <OrganizationPage />
      //     }
      //   ]
      // },
      // {
      //   path: 'utils',
      //   children: [
      //     {
      //       path: 'util-shadow',
      //       element: <UtilsShadow />
      //     }
      //   ]
      // },
      // {
      //   path: 'icons',
      //   children: [
      //     {
      //       path: 'tabler-icons',
      //       element: <UtilsTablerIcons />
      //     }
      //   ]
      // },
      // {
      //   path: 'icons',
      //   children: [
      //     {
      //       path: 'material-icons',
      //       element: <UtilsMaterialIcons />
      //     }
      //   ]
      // },
      // {
      //   path: 'sample-page',
      //   element: <SamplePage />
      // }
    ]
  }
];
export default MainRoutes;
