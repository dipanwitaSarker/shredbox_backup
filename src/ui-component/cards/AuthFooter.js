// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://shredbox.com/" target="_blank" underline="hover">
      shredbox.com
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://www.tryc2.com/" target="_blank" underline="hover">
      C2 Management
    </Typography>
  </Stack>
);

export default AuthFooter;
