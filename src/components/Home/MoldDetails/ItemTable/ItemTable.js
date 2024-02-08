import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box,Button,Snackbar,Alert,Autocomplete,TextField,Link,Chip,Tooltip,Typography,Pagination,PaginationItem,Stack} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'


const ItemTable = () =>{

    const columns1 = [
        { id: 'itemcode', label: 'Item Code', minWidth: 30 },
        { id: 'itemdescription', label: 'Item Description', minWidth: 30 },
        { id: 'supplier', label: 'Supplier', minWidth: 30 },
        { id: 'buyer', label: 'Buyer', minWidth: 30 },
        { id: 'material', label: 'Material', minWidth: 30 },
      ];
      
      function createData1(itemcode, itemdescription, supplier, buyer,material,) {
        return { itemcode, itemdescription, supplier, buyer,material };
      }

      const rows1 = [
        createData1('MPF213','Urn Pedestal White','Home Depot','Grandin Road','Polyclay Road'),
        createData1('MPF213','Urn Pedestal White','Home Depot','Grandin Road','Polyclay Road'),
        createData1('MPF213','Urn Pedestal White','Home Depot','Grandin Road','Polyclay Road'),
        createData1('MPF213','Urn Pedestal White','Home Depot','Grandin Road','Polyclay Road'),
        createData1('MPF213','Urn Pedestal White','Home Depot','Grandin Road','Polyclay Road'),
      ];


      const columns2 = [
        { id: 'moldnumber', label: 'Mold Number', minWidth: 50,maxWidth: 50},
        { id: 'validationdate', label: 'Validation Date', minWidth: 100 },
        { id: 'moldlife', label: 'Mold Life', minWidth: 100 },
        { id: 'percentreject', label: 'Percent Reject', minWidth: 30,maxWidth: 50 },
        { id: 'condition', label: 'Condition', minWidth: 100 },
        { id: 'remarks', label: 'Remarks', minWidth: 170 },
      ];
      
      function createData2(moldnumber, validationdate, moldlife, percentreject,condition,remarks) {
        return { moldnumber, validationdate, moldlife, percentreject,condition,remarks };
      }

      const rows2 = [
        createData2('150','10-23-2024','2600 / 3000','97','For Revalidation','this is a test remarks for testing'),
        createData2('150','10-23-2024','2600 / 3000','97','For Revalidation','this is a test remarks for testing'),
        createData2('150','10-23-2024','2600 / 3000','97','For Revalidation','this is a test remarks for testing'),
        createData2('150','10-23-2024','2600 / 3000','97','For Revalidation','this is a test remarks for testing'),
        createData2('150','10-23-2024','2600 / 3000','97','For Revalidation','this is a test remarks for testing'),
      ];



    return (
        <Grid container spacing={2} justifyContent="center" sx={{mt:2}}>  
            <Grid xs={12} md={6} lg={6}>
            <Paper elevation={10} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns1.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows1
                        .map((row,i) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                {columns1.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
                <Grid container spacing={2} alignItems="end" justifyContent="end">
                <Grid xs={12} md={11} lg={11}>
                    <Box sx={{mt:3}}> </Box>
                <Stack spacing={2}>
                    <Pagination 
                    count={0} 
                    page={ 1}
                    variant="outlined" 
                    shape="rounded" 
                    color="secondary"
                    renderItem={(item)=>(
                        <PaginationItem 
                        { ...item }
                        component={Button}
                        onClick={()=>{}}
                        />
                    )}
                    />
                </Stack>
                    </Grid>
                </Grid>
                <Grid xs={12} md={1} lg={1}>
                </Grid>
                {/* {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={5000}
                    onClose={handleCloseSnackbar}
                > 
                    <Alert {...snackbar} onClose={handleCloseSnackbar} variant="filled" />
                </Snackbar>
                )} */}
            </Grid>
            <Grid xs={12} md={6} lg={6}>
            <Paper elevation={10} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns2.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows2
                        .map((row,i) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                {columns2.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
                <Grid container spacing={2} alignItems="end" justifyContent="end">
                <Grid xs={12} md={11} lg={11}>
                    <Box sx={{mt:3}}> </Box>
                <Stack spacing={2}>
                    <Pagination 
                    count={0} 
                    page={ 1}
                    variant="outlined" 
                    shape="rounded" 
                    color="secondary"
                    renderItem={(item)=>(
                        <PaginationItem 
                        { ...item }
                        component={Button}
                        onClick={()=>{}}
                        />
                    )}
                    />
                </Stack>
                    </Grid>
                </Grid>
                <Grid xs={12} md={1} lg={1}>
                </Grid>
                {/* {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    autoHideDuration={5000}
                    onClose={handleCloseSnackbar}
                > 
                    <Alert {...snackbar} onClose={handleCloseSnackbar} variant="filled" />
                </Snackbar>
                )} */}
            </Grid>
        </Grid>
        
    )
};

export default ItemTable;