// import { useQueryClient } from '@tanstack/react-query';
// import { setToast, toastConfig } from 'utils/commonUtil';

// export const useOrganizationRoleUserAdd = () => {
//   // const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data) => {
//       return await axiosInstance
//         .post(`${endpoints.organizations}/add`, data)
//         .then((res) => {
//           if (res?.status == 200) {
//             toastConfig.type = 'success';
//             setToast(toastConfig, res?.data.message);
//           } else {
//             toastConfig.type = 'error';
//             setToast(toastConfig, res?.data.message);
//           }
//           // navigate(`/dashboard/organizations`);
//           return res;
//         })
//         .catch((error) => {
//           toastConfig.type = 'error';
//           setToast(toastConfig, error.response.data.message);
//         });
//     },
//     onSuccess: ({ data }) => {
//       queryClient.refetchQueries('getOrgUserRoleData');
//       return data;
//     },
//     onError: ({ error }) => {
//       return error;
//     },
//     onSettled: ({ data }) => {
//       return data;
//     }
//   });
// };




 // <>
    //   {isLoading ? (
    //     <>
    //       <SkeletonTableView />
    //     </>
    //   ) : (
    //     <>
    //       <BreadcrumbsForPage name="Machines" obj={{ title: 'Machines', title2: '', url: '' }} />
    //       <MainCard>
    //         <TableContainer sx={{ maxHeight: 440 }}>
    //           <Table stickyHeader aria-label="sticky table">
    //             <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
    //             <TableBody>
    //               {stableSort(allMachineList?.machines, getComparator(order, orderBy)).map((row, i) => {
    //                 return (
    //                   <TableRow hover role="checkbox" tabIndex={-1} key={i}>
    //                     <TableCell align="center">{row?.machine_id}</TableCell>
    //                     <TableCell
    //                       align="center"
    //                       sx={{
    //                         paddingLeft: 0,
    //                         paddingRight: 2,
    //                         alignItems: 'center'
    //                       }}
    //                     >
    //                       {row?.date_time.toString()}
    //                       {/* {moment(row?.date_time).format('mm/dd/yyyy HH:mm')?moment(row?.date_time).format('mm/dd/yyyy HH:mm'):row?.date_time} */}
    //                     </TableCell>
    //                     <TableCell
    //                       align="center"
    //                       sx={{
    //                         paddingLeft: 0,
    //                         paddingRight: 2,
    //                         alignItems: 'center'
    //                       }}
    //                     >
    //                       <HtmlTooltip
    //                         title={
    //                           <>
    //                             <TableContainer>
    //                               <Table sx={{ minWidth: 200 }} aria-label="simple table">
    //                                 <TableHead>
    //                                   <TableRow>
    //                                     <TableCell>Status</TableCell>
    //                                     <TableCell align="right">Timing</TableCell>
    //                                   </TableRow>
    //                                 </TableHead>
    //                                 <TableBody>
    //                                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    //                                     <TableCell component="th" scope="row">
    //                                       <Typography component="p" color={'#0ccc19'}>
    //                                         Active
    //                                       </Typography>
    //                                     </TableCell>
    //                                     <TableCell align="right">24-02-2024 13:47</TableCell>
    //                                   </TableRow>{' '}
    //                                   <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    //                                     <TableCell component="th" scope="row">
    //                                       <Typography component="p" color={'red'}>
    //                                         Inactive
    //                                       </Typography>
    //                                     </TableCell>
    //                                     <TableCell align="right">24-02-2024 13:47</TableCell>
    //                                   </TableRow>
    //                                 </TableBody>
    //                               </Table>
    //                             </TableContainer>
    //                           </>
    //                         }
    //                       >
    //                         <Chip
    //                           label={row.status === 'on' ? 'Active' : 'Inactive'}
    //                           color={row.status === 'on' ? 'success' : 'error'}
    //                           sx={{
    //                             color: '#fff',
    //                             alignItems: 'center'
    //                           }}
    //                         />
    //                       </HtmlTooltip>
    //                     </TableCell>
    //                     <TableCell
    //                       //align="center"
    //                       // alignItem="center"
    //                       sx={{
    //                         paddingLeft: 0,
    //                         paddingRight: 2,
    //                         alignItems: 'center'
    //                       }}
    //                     >
    //                       {row?.association ? row?.association : 'N.A.'}
    //                     </TableCell>
    //                     <TableCell
    //                       align="center"
    //                       sx={{
    //                         paddingLeft: 0,
    //                         paddingRight: 2,
    //                         alignItems: 'center'
    //                       }}
    //                     >
    //                       {row?.location ? row?.location : 'N.A.'}
    //                       {/* {row.location} */}
    //                     </TableCell>
    //                     <TableCell align="center">
    //                       <HtmlTooltip title={'Edit' + ' ' + row?.machine_id}>
    //                         <IconButton
    //                           onClick={() => {
    //                             navigate(`/dashboard/machines/edit-${row.machine_id}`);
    //                           }}
    //                           sx={{
    //                             paddingLeft: 0,
    //                             paddingRight: 2,
    //                             alignItems: 'center'
    //                           }}
    //                         >
    //                           <ModeEditOutlinedIcon />
    //                         </IconButton>
    //                       </HtmlTooltip>
    //                     </TableCell>
    //                   </TableRow>
    //                 );
    //               })}
    //             </TableBody>
    //           </Table>
    //         </TableContainer>
    //         <TablePagination
    //           rowsPerPageOptions={[5,10, 25, 100]}
    //           component="div"
    //           count={allMachineList?.total ? allMachineList?.total : 0}
    //           rowsPerPage={rowsPerPage}
    //           page={page}
    //           onPageChange={handleChangePage}
    //           onRowsPerPageChange={handleChangeRowsPerPage}
    //         />
    //       </MainCard>
    //     </>
    //   )}
    // </>