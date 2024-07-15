import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// routes
import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { userRoot } = useSelector((store) => store);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userOrgId = JSON.parse(localStorage.getItem('userOrgId'));
  const routing = useRoutes(MainRoutes(userRoot, userData?.role?.permissions, userOrgId));
  return <>{routing}</>;
}
