// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  //   Stack,
  Chip,
  Typography,
  IconButton,
  Skeleton
} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import MainCard from 'ui-component/cards/MainCard';

// routeing
import { useNavigate } from 'react-router-dom';
// import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

import BreadcrumbsForPage from 'ui-component/extended/BreadcrumbsForPage';

import SkeletonTableView from 'ui-component/cards/Skeleton/TableView';
import { useGetMachineList } from 'hooks/useMachineHooks';
import { Box } from '@mui/system';
import moment from 'moment';
const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  margin: '0 auto',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626'
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959'
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343'
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c'
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff'
  }
}));
const columns = [
  { id: 'machine_id', label: 'Machine ID', minWidth: 150, align: 'center' },
  {
    id: 'installation',
    label: 'Installation Date',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  {
    id: 'association',
    label: 'Association',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toLocaleString('en-US')
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 150,
    align: 'center'
    // format: (value) => value.toFixed(2)
  }
];
// function createData(machineId, status, installation, association) {
//   const location = installation / association;
//   return { machineId, status, installation, association, location };
// }

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
function EnhancedTableHead({
  // classes,
  order,
  orderBy,
  onRequestSort
}) {
  // const userData = JSON.parse(localStorage.getItem('userData'));
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* {userData?.role?.permissions?.allow_edit_machine ? (
          <>
            {columns?.map((headCell) => (
              <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} align="center">
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  disabled={orderBy !== headCell.id}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="center">Action</TableCell>
          </>
        ) : (
          <>
            {columns?.map((headCell) => (
              <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} align="center">
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  disabled={orderBy !== headCell.id}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </>
        )} */}
        {columns?.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} align="center">
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              disabled={orderBy !== headCell.id}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} arrow />)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));
const Machine = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('machine_id');
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [firstPageVal, setFirstPageVal] = useState('');
  const [lastPageVal, setLastPageVal] = useState('');
  const navigate = useNavigate();
  // const userData = JSON.parse(localStorage.getItem('userData'));

  const { data: allMachineList, isLoading: isAllMachineLoading } = useGetMachineList({
    limit: rowsPerPage,
    sortOrder: order,
    sortField: orderBy,
    previous: previousPage,
    current: currentPage,
    first: firstPageVal,
    last: lastPageVal
  });
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setFirstPageVal(allMachineList?.first);
    setLastPageVal(allMachineList?.last);
    setCurrentPage(newPage + 1);
    setPreviousPage(currentPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {isLoading ? (
        <>
          <SkeletonTableView />
        </>
      ) : (
        <>
          <BreadcrumbsForPage name="All Machines" obj={{ title: 'All Machines', title2: '', url: '' }} />
          <MainCard title="">
            <TableContainer sx={{ maxHeight: 440 }}>
              {isAllMachineLoading ? (
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
                      </TableCell>{' '}
                      <TableCell align="center">
                        <Skeleton variant="text" width={200} />
                      </TableCell>{' '}
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
              ) : allMachineList?.machines === undefined || allMachineList?.machines.length == 0 ? (
                <StyledGridOverlay>
                  <svg style={{ flexShrink: 0 }} width="240" height="200" viewBox="0 0 184 152" aria-hidden focusable="false">
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(24 31.67)">
                        <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
                        <path
                          className="ant-empty-img-1"
                          d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                        />
                        <path
                          className="ant-empty-img-2"
                          d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                        />
                        <path
                          className="ant-empty-img-3"
                          d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                        />
                      </g>
                      <path
                        className="ant-empty-img-3"
                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                      />
                      <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                      </g>
                    </g>
                  </svg>
                  <Box sx={{ mt: 1 }}>No data found!</Box>
                </StyledGridOverlay>
              ) : (
                <>
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                      <TableBody>
                        {stableSort(allMachineList?.machines, getComparator(order, orderBy)).map((row, i) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                              <TableCell align="center">{row?.machine_id.toUpperCase()}</TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  paddingLeft: 0,
                                  paddingRight: 2,
                                  alignItems: 'center'
                                }}
                              >
                                {/* {row?.date_time.toLocaleString()} */}
                                {moment(row?.date_time).format('Do MMMM YYYY, h:mm a')
                                  ? moment(row?.date_time).format('Do MMMM YYYY, h:mm a')
                                  : row?.date_time}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  paddingLeft: 0,
                                  paddingRight: 2,
                                  alignItems: 'center'
                                }}
                              >
                                <HtmlTooltip
                                  title={
                                    <>
                                      <TableContainer>
                                        <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Status</TableCell>
                                              <TableCell align="right">Timing</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                              <TableCell component="th" scope="row">
                                                <Typography component="p" color={'#0ccc19'}>
                                                  Active
                                                </Typography>
                                              </TableCell>
                                              <TableCell align="right">24-02-2024 13:47</TableCell>
                                            </TableRow>{' '}
                                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                              <TableCell component="th" scope="row">
                                                <Typography component="p" color={'red'}>
                                                  Inactive
                                                </Typography>
                                              </TableCell>
                                              <TableCell align="right">24-02-2024 13:47</TableCell>
                                            </TableRow>
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </>
                                  }
                                >
                                  <Chip
                                    label={row?.enable === true ? 'Active' : 'Inactive'}
                                    color={row?.enable === true ? 'success' : 'error'}
                                    sx={{
                                      color: '#fff',
                                      alignItems: 'center'
                                    }}
                                  />
                                </HtmlTooltip>
                              </TableCell>
                              <TableCell
                                align="center"
                                alignItem="center"
                                sx={{
                                  paddingLeft: 0,
                                  paddingRight: 2,
                                  alignItems: 'center'
                                }}
                              >
                                {row?.organization ? row?.organization?.name : 'N.A.'}
                              </TableCell>

                              <TableCell
                                align="center"
                                sx={{
                                  paddingLeft: 0,
                                  paddingRight: 2,
                                  alignItems: 'center'
                                }}
                              >
                                {row?.location ? (
                                  <>
                                    {row?.location?.address.length >= 20 ? (
                                      <>
                                        {row?.location?.address.slice(0, 20)}...
                                        <HtmlTooltip
                                          title={row?.location?.address}
                                          // sx={{
                                          //   maxWidth: 500
                                          // }}
                                        >
                                          <IconButton>
                                            <InfoOutlinedIcon
                                              sx={{
                                                width: 20,
                                                height: 20
                                              }}
                                            />
                                          </IconButton>
                                        </HtmlTooltip>
                                      </>
                                    ) : (
                                      <> {row?.location?.address}</>
                                    )}
                                  </>
                                ) : (
                                  'N.A.'
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <HtmlTooltip title={'Edit' + ' ' + row?.machine_id.toUpperCase()}>
                                  <IconButton
                                    onClick={() => {
                                      navigate(`/dashboard/machines/edit-${row.machine_id}`);
                                    }}
                                  >
                                    <ModeEditOutlinedIcon />
                                  </IconButton>
                                </HtmlTooltip>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={allMachineList?.total ? allMachineList?.total : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </MainCard>
        </>
      )}
    </>
  );
};

EnhancedTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.any
};

export default Machine;
