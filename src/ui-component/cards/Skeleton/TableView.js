import React from 'react';
import MainCard from '../MainCard';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Skeleton,
  Box,
  Card,
  Grid
} from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

const TableView = () => {
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
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {[1, 2, 4, 5, 6, 7].map((i) => (
                  <TableCell key={i}>
                    <Skeleton variant="text" width={200} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[1, 2, 3, 4].map((i) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  <TableCell align="center">
                    {' '}
                    <Skeleton variant="text" width={200} />
                  </TableCell>
                  <TableCell align="center">
                    {' '}
                    <Skeleton variant="text" width={200} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={200} />
                  </TableCell>
                  <TableCell align="center">
                    {' '}
                    <Skeleton variant="text" width={200} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="text" width={200} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Skeleton variant="circular" width={40} height={40} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </>
  );
};

export default TableView;
