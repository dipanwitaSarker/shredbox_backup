// assets
import { IconKey } from '@tabler/icons';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
//  import DomainAddSharpIcon from '@mui/icons-material/DomainAddSharpIcon';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
// constant

const icons = {
  IconKey,
  PrecisionManufacturingOutlinedIcon,
  BusinessOutlinedIcon,
  PeopleOutlineOutlinedIcon,
  PersonAddAltIcon,
  GroupAddOutlinedIcon,
  StorefrontOutlinedIcon,
  CorporateFareOutlinedIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

/** FUTURE USE */
// const pages = {
//   id: 'pages',
//   title: 'Pages',
//   caption: 'Pages Caption',
//   type: 'group',
//   children: [
//     {
//       id: 'authentication',
//       title: 'Authentication',
//       type: 'collapse',
//       icon: icons.IconKey,

//       children: [
//         {
//           id: 'login3',
//           title: 'Login',
//           type: 'item',
//           url: '/pages/login/login3',
//           target: true
//         },
//         {
//           id: 'register3',
//           title: 'Register',
//           type: 'item',
//           url: '/pages/register/register3',
//           target: true
//         }
//       ]
//     }
//   ]
// };
/** FUTURE USE */

const pages = {
  id: 'pages',
  // title: 'Pages',
  // caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'machines',
      title: 'Machines',
      type: 'item',
      icon: icons.PrecisionManufacturingOutlinedIcon,
      breadcrumbs: true,
      url: '/dashboard/machines'
    },

    {
      id: 'recycler',
      title: 'Recycler Organization',
      type: 'item',
      icon: icons.GroupAddOutlinedIcon,
      breadcrumbs: true,
      url: '/dashboard/recycler'
    },
    {
      id: 'enterprise',
      title: 'Enterprise Organization',
      type: 'item',
      icon: icons.CorporateFareOutlinedIcon,
      breadcrumbs: true,
      url: '/dashboard/enterprise'
    },
    {
      id: 'authentication',
      title: 'Retailer Organization',
      // type: 'collapse',
      type: 'item',
      breadcrumbs: true,
      icon: icons.StorefrontOutlinedIcon,
      url: '/dashboard/retailer'
      // children: [
      //   {
      //     id: 'new-retailer-list',
      //     title: 'Retailer Lists',
      //     type: 'item',
      //     url: '/dashboard/retailer'
      //     // target: true
      //   },
      //   {
      //     id: 'public-user',
      //     title: 'Public User',
      //     type: 'item',
      //     url: '/dashboard/retailer/public-user'
      //     // target: true
      //   }
      // ]
    }
  ]
};

export default pages;
