import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
// import setAuthToken from 'store/helper/setAuthToken';
// import { store } from 'store';

// ==============================|| APP ||============================== //
// if (window.localStorage.userJwtToken && window.localStorage.userAccessList) {
//   setAuthToken(localStorage.userJwtToken);
//   const decoded = jwt_decode(localStorage.userJwtToken);
//   store.dispatch(
//     userLoginHelper({
//       userDetails: decoded.userDetails,
//       accessList: JSON.parse(localStorage.userAccessList)
//     })
//   );
//   const currentTime = Date.now() / 1000;
//   if (decoded.exp < currentTime) {
//     store.dispatch(userLogout());
//     window.location.href = '/';
//   }
// }
const App = () => {
  const customization = useSelector((state) => state.customization);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
