import React,{useState,useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box,Button,FormControl,IconButton,InputLabel,Select,MenuItem,TextField,Link,Chip,Tooltip,Typography,Pagination,PaginationItem,Stack} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'
import {Save,LocalShipping, Edit,} from '@mui/icons-material';

import { getDeliveriesByMoldId } from '../../../../actions/deliveries';
import { getMoldsByItemId} from '../../../../actions/molds';
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment';

// MODAL
import AddMold from '../Modal/AddMold';
import EditDeleteMold from '../Modal/EditDeleteMold';
import HistoryMold from '../Modal/HistoryMold';


const MoldTable = ({sharedStateRef,setSharedStateRef}) =>{

    const dispatch = useDispatch();
    const { isLoading, molds } = useSelector(state => state.molds);

    const [rows, setRows] = useState([]);

    const rowsData = [];

    const [itemSelected,setItemSelected] = useState(null);
    const [moldSelected,setMoldSelected] = useState(null);

    const [age, setAge] = React.useState('mold');

    const handleChange =(e) => {
        setAge(e.target.value);
    };

    useEffect(() => {
        if (!isLoading && molds) {
            setRows([]);
            molds?.map(item => {
                rowsData.push(
                    createData2(
                        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                            <Grid xs={6} md={6} lg={6} >
                                <IconButton onClick={()=>{setMoldSelected(item); handleOpenEditDeleteModal(); }} aria-label="delete" size='small' color='primary' sx={{border:1,mt:0.5}}>
                                    <Edit sx={{fontSize:20}}/>
                                </IconButton>
                            </Grid>
                            <Grid xs={6} md={6} lg={6}>
                                <IconButton onClick={()=>{dispatch(getDeliveriesByMoldId(item._id)); setMoldSelected(item); handleOpenHistoryModal(); }} aria-label="delete" size='small' color='success' sx={{border:1,mt:0.5}}>
                                    <LocalShipping sx={{fontSize:20}} />
                                </IconButton>
                            </Grid>               
                        </Grid>
                        ,item?.moldNumber,moment(item?.validationDate).format('L'),
                        `${parseInt(item?.life)-parseInt(item?.delivered)}`,
                        <Chip label={item?.condition?.label} 
                            color={item?.condition?.color} 
                        size='medium' variant="contained" />
                        ,item?.remarks));
                return null;
            });

            setRows([...rowsData]);
        }
    }, [isLoading, molds]);

    //REFS
    sharedStateRef.itemSelected = itemSelected;
    setSharedStateRef.setItemSelected = setItemSelected;

    const [openAddModal, setOpenAddModal] = useState(false);
    const handleOpenAddModal = () => {
        if(itemSelected)
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
        // reload modal table
        dispatch(getMoldsByItemId(itemSelected?._id));
        setOpenHistoryModal(false);
    };

    const columns2 = [
        { id: 'select', label: '',maxWidth: 10},
        { id: 'moldnumber', label: 'Mold #',maxWidth: 10},
        { id: 'validationdate', label: 'Validation Date',maxWidth:200 },
        { id: 'moldlife', label: 'Life', maxWidth: 10 },
        { id: 'condition', label: 'Condition', maxWidth: 10 },
        { id: 'remarks', label: 'Remarks', maxWidth: 10 },
      ];
      
      function createData2(select,moldnumber, validationdate, moldlife,condition,remarks) {
        return { select,moldnumber, validationdate, moldlife,condition,remarks };
      }
    
    return (
        <Paper elevation={20} sx={{padding:1}}> 
           {/*  Dialogs */}
           <AddMold openAddModal={openAddModal} itemSelected={itemSelected} handleCloseAddModal={handleCloseAddModal}/>
           <EditDeleteMold openEditDeleteModal={openEditDeleteModal} moldSelected={moldSelected} itemSelected={itemSelected} handleCloseEditDeleteModal={handleCloseEditDeleteModal}/>
           <HistoryMold openHistoryModal={openHistoryModal} handleCloseHistoryModal={handleCloseHistoryModal} moldSelected={moldSelected} itemSelected={itemSelected}/>
         <Typography variant="h5"> Mold Details </Typography>
            <Grid container spacing={5} direction="row" justifyContent="center">
                <Grid xs={4} md={4} lg={4} mt={2}>
                    <Typography variant="p">ItemCode: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>{itemSelected?.itemCode || ''}</span> </Typography><br/><br/>
                    <Typography variant="p">Desc: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>{itemSelected?.itemDescription || ''}</span></Typography><br/> <br/>
                    <Button variant="contained" color="primary" size="small"  startIcon={<Save/>} onClick={handleOpenAddModal}  > Add Mold </Button>
                </Grid>
                <Grid xs={4} md={4} lg={4} mt={2}>
                    <Typography variant="p">Buyer: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>{itemSelected?.buyer?.name || ''}</span> </Typography><br/><br/>
                    <Typography variant="p">Supplier: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>{itemSelected?.supplier?.name || ''} </span></Typography>
                </Grid>
                <Grid xs={4} md={4} lg={4} mt={2}>
                    <Typography variant="p">Material: <span style={{fontWeight:'bold',backgroundColor:'#feca57'}}>{itemSelected?.material?.name || ''}</span></Typography><br/><br/>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" >Column</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Column"
                            size='small'
                            onChange={handleChange}
                        >
                            <MenuItem value='mold'>Mold #</MenuItem>
                            <MenuItem value='validationDate'>Validation Date</MenuItem>
                            <MenuItem value='life'>Life</MenuItem>
                            <MenuItem value='condition'>Condition</MenuItem>
                            <MenuItem value='remarks'>Remarks</MenuItem>
                        </Select>
                    </FormControl><br/><br/>
                    <TextField size='small' onChange={()=>{}} value={''} fullWidth label="SEARCH" variant="outlined" />
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
                        rows
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