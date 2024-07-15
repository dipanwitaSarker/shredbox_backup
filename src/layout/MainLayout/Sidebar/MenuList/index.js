// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import RetailerPage from 'menu-items/retailer.page';
import RecyclerPage from 'menu-items/recycler.page';
// import withOutC2MenuItems from 'menu-items/withOutC2Index';
// import { useDispatch } from 'react-redux';
// import { userLogin } from 'store/actions/userAction';
// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  // const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));
  const userData = JSON.parse(localStorage.getItem('userData'));
  console.log('🚀 ~ MenuList ~ userData:', userData);

  // const dispatch = useDispatch();

  // if (!userData) {

  //   dispatch(userLogin);
  //   return null;
  // }

  // const navItems = menuItem.items.map((item) => {
  //   switch (item.type) {
  //     case 'group':
  //       return <NavGroup key={item.id} item={item} />;
  //     default:
  //       return (
  //         <Typography key={item.id} variant="h6" color="error" align="center">
  //           Menu Items Error
  //         </Typography>
  //       );
  //   }
  // });
  if (userData.type === 'Retailer') {
    const navItems = RetailerPage.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

    return <>{navItems}</>;
  } else if (userData.type === 'Recycler') {
    const navItems = RecyclerPage.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });
    return <>{navItems}</>;
  } else {
    const navItems = menuItem.items.map((item) => {
      switch (item.type) {
        case 'group':
          return <NavGroup key={item.id} item={item} />;
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

    return <>{navItems}</>;
  }
};

export default MenuList;
