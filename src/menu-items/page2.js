import { IconKey } from '@tabler/icons';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
// import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
//  import DomainAddSharpIcon from '@mui/icons-material/DomainAddSharpIcon';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
// constant

const icons = {
  IconKey,
  PrecisionManufacturingOutlinedIcon,
  GroupAddOutlinedIcon,
  PersonAddAltIcon
};

const pagesOtherC2 = {
  id: 'pages',
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
      id: 'user-org',
      title: 'Organizations Users',
      type: 'item',
      icon: icons.GroupAddOutlinedIcon,
      breadcrumbs: true,
      url: '/dashboard/organizations/user-org'
    },
    // {
    //   id: 'roleManagement',
    //   title: 'Role Management',
    //   type: 'item',
    //   icon: icons.PersonAddAltIcon,
    //   breadcrumbs: true,
    //   url: '/dashboard/role-management'
    // }
  ]
};
export default pagesOtherC2;
