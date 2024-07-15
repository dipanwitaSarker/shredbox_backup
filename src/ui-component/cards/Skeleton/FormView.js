import React from 'react';
import MainCard from '../MainCard';
import { Typography, Skeleton, Box, Card, Grid, FormControl } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

const FormView = () => {
  const theme = useTheme();

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
                <Skeleton variant="text" width={300} />
              </Typography>
            </Grid>
            <Grid item>
              <MuiBreadcrumbs
                sx={{ '& .MuiBreadcrumbs-separator': { width: 16, ml: 1.25, mr: 1.25 } }}
                aria-label="breadcrumb"
                maxItems={3}
              >
                <Typography color="inherit" variant="subtitle1">
                  <Skeleton variant="text" width={150} />
                </Typography>
                <Typography variant="subtitle1">
                  {' '}
                  <Skeleton variant="text" width={150} />
                </Typography>
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
                  <Skeleton variant="text" width={150} />
                </Typography>
              </MuiBreadcrumbs>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <MainCard>
        <Grid container spacing={gridSpacing} sx={{ alignContent: 'center' }}>
          <Grid item xs={12}>
            <Typography component="h4" variant="h2" sx={{ mb: 2 }}>
              <Skeleton variant="text" width={300} />
            </Typography>
            <Grid container spacing={gridSpacing}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Grid item lg={6} md={6} sm={6} xs={12} key={i}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <Skeleton variant="text" width={300} />

                    <Skeleton variant="rectangular" width={500} height={50} />
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 5, justifyContent: 'center', textAlign: 'center' }}>
              <Skeleton
                variant="rectangular"
                width={50}
                height={50}
                size="large"
                // type="submit"
                // variant="contained"
                color="secondary"
                sx={{
                  color: 'white',
                  minWidth: '200px',
                  margin: '0px auto',
                  bgcolor: 'rgb(111, 215, 75)',
                  borderRadius: '5px'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default FormView;
