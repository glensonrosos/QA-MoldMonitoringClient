import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box,Button,Snackbar,IconButton,CircularProgress,TextField,Link,Chip,Tooltip,Typography,Pagination,PaginationItem,Stack} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import {Save,History, Preview} from '@mui/icons-material';

// MODAL
import AddMold from '../Modal/AddMold';
import EditDeleteMold from '../Modal/EditDeleteMold';
import HistoryMold from '../Modal/HistoryMold';


const MoldTable = () =>{

    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => {
        setOpenAddModal(true);
    };
    const handleCloseAddModal = () => {
        setOpenAddModal(false);
    };

    const [openEditDeleteModal, setOpenEditDeleteModal] = useState(false);
    const handleOpenEditDeleteModal = () => {
        setOpenEditDeleteModal(true);
    };
    const handleCloseEditDeleteModal = () => {
        setOpenEditDeleteModal(false);
    };

    const [openHistoryModal, setOpenHistoryModal] = useState(false);
    const handleOpenHistoryModal = () => {
        setOpenHistoryModal(true);
    };
    const handleCloseHistoryModal = () => {
        setOpenHistoryModal(false);
    };

    const columns2 = [
        { id: 'select', label: '',maxWidth: 10},
        { id: 'moldnumber', label: 'Mold #',maxWidth: 10},
        { id: 'validationdate', label: 'Validation Date',maxWidth:200 },
        { id: 'moldlife', label: 'Life', maxWidth: 10 },
        { id: 'percentreject', label: '% Rej', maxWidth: 10 },
        { id: 'condition', label: 'Condition', maxWidth: 10 },
        { id: 'remarks', label: 'Remarks', maxWidth: 10 },
      ];
      
      function createData2(select,moldnumber, validationdate, moldlife, percentreject,condition,remarks) {
        return { select,moldnumber, validationdate, moldlife, percentreject,condition,remarks };
      }

      const rows2 = [
        createData2(
            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <Grid sx={6} md={6} lg={6} >
                    <IconButton onClick={handleOpenEditDeleteModal} aria-label="delete" size='small' color='primary' sx={{border:1,mt:0.5}}>
                        <Preview sx={{fontSize:20}}/>
                    </IconButton>
                </Grid>
                <Grid sx={6} md={6} lg={6}>
                    <IconButton onClick={handleOpenHistoryModal} aria-label="delete" size='small' color='warning' sx={{border:1,mt:0.5}}>
                        <History sx={{fontSize:20}} />
                    </IconButton>
                </Grid>               
            </Grid>
            ,'25150','10-23-2024','2600 / 3000','97%',
            <Chip label="For Revalidation" color="error" size='medium' variant="contained" />
 
            ,'this is a test remarks for testing this is a test remarks for testing'),
        ];
    
    return (
        <Paper elevation={20} sx={{padding:1}}> 
           {/*  Dialogs */}
           <AddMold openAddModal={openAddModal} handleCloseAddModal={handleCloseAddModal}/>
           <EditDeleteMold openEditDeleteModal={openEditDeleteModal} handleCloseEditDeleteModal={handleCloseEditDeleteModal}/>
           <HistoryMold openHistoryModal={openHistoryModal} handleCloseHistoryModal={handleCloseHistoryModal}/>
         <Typography variant="h5"> Mold Details </Typography>
            <Grid container spacing={5} direction="row" justifyContent="center">
                <Grid xs={4} md={4} lg={4} mt={2}>
                    <Typography variant="p">ItemCode: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>MPF2123X</span> </Typography><br/><br/>
                    <Typography variant="p">Desc: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>Allan Choigwapo</span></Typography><br/> <br/>
                    <Button variant="contained" color="primary" size="small"  startIcon={<Save/>} onClick={handleOpenAddModal}  > Add Mold </Button>
                </Grid>
                <Grid xs={4} md={4} lg={4} mt={2}>
                    <Typography variant="p">Buyer: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>GradinRoad</span> </Typography><br/><br/>
                    <Typography variant="p">Supplier: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>453-AllanLisondra </span></Typography>
                </Grid>
                <Grid xs={4} md={4} lg={4} mt={2}>
                    <Typography variant="p">Material: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>Polyclay</span></Typography><br/><br/>
                </Grid>
            </Grid>
        <Grid container spacing={2} justifyContent="center">  
            <Grid xs={12} md={12} lg={12}>
            <Paper elevation={10} sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                        <TableRow>
                        {columns2.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth, }}
                            sx={{borderLeft: '1px solid #fff',backgroundColor:'#222f3e',color:'#fff'}}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                        // !rows2.length <= 0 ?
                        // <TableCell>
                        //     <CircularProgress color="inherit"/>
                        // </TableCell>
                        // :
                        rows2
                        .map((row,i) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                {columns2.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align} sx={{borderLeft: '1px solid grey'}}>
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
        </Paper>
    )
};

export default MoldTable;