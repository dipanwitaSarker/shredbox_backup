// assets

import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';

import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import dashboard from './dashboard';
// constant

const icons = {
  PrecisionManufacturingOutlinedIcon,

  StorefrontOutlinedIcon
};

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
      id: 'authentication',
      title: 'Enterprise User',
      // type: 'collapse',
      type: 'item',
      breadcrumbs: true,
      icon: icons.StorefrontOutlinedIcon,
      url: '/dashboard/enterprise/user'
    }
  ]
};

const EnterprisePage = {
  items: [dashboard, pages]
};
export default EnterprisePage;
