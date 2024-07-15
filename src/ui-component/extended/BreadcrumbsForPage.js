import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PropTypes from 'prop-types';

const linkSX = {
  display: 'flex',
  color: 'grey.900',
  textDecoration: 'none',
  alignContent: 'center',
  alignItems: 'center'
};

const BreadcrumbsForPage = ({ name, obj }) => {
  const theme = useTheme();
  const iconStyle = {
    marginRight: theme.spacing(0.75),
    // marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main
  };
  return (
    <>
      <Card
        sx={{
          marginBottom: theme.spacing(gridSpacing),
          border: 'none',
          borderColor: theme.palette.primary[200] + 75,
          background: theme.palette.background.default
        }}
      >
        <Box sx={{ p: 2, pl: 2 }}>
          <Grid container direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
            <Grid item>
              <Typography variant="h3" sx={{ fontWeight: 500 }}>
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <MuiBreadcrumbs
                sx={{ '& .MuiBreadcrumbs-separator': { width: 5, ml: 1.08, mr: 1.08 } }}
                aria-label="breadcrumb"
                maxItems={2}
                // separator={separator}
              >
                <Typography component={Link} to="/dashboard/default" color="inherit" variant="subtitle1" sx={linkSX}>
                  <HomeIcon sx={{ ...iconStyle, mr: 0.5 }} />
                  Dashboard
                </Typography>
                <Typography component={Link} to={obj.url !== '' ? obj.url : '#'} variant="subtitle1" sx={linkSX}>
                  {obj.title}
                </Typography>
                {obj.title2 && (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      display: 'flex',
                      textDecoration: 'none',
                      alignContent: 'center',
                      alignItems: 'center',
                      color: 'grey.500'
                    }}
                  >
                    {obj.title2}
                  </Typography>
                )}
              </MuiBreadcrumbs>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

BreadcrumbsForPage.propTypes = {
  name: PropTypes.string,
  obj: PropTypes.object
};
export default BreadcrumbsForPage;
