import React,{useEffect,useState} from 'react';


import { Box,Button,Backdrop,CircularProgress,Typography,AppBar,Toolbar,IconButton,Table,TableBody,TableCell,
  TableContainer,TableHead,TableRow,Snackbar,Alert,Paper,TextField,FormControl,InputLabel,Select,MenuItem } from '@mui/material';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Grid from '@mui/material/Unstable_Grid2';

import {Add,Close} from '@mui/icons-material';
import Slide from '@mui/material/Slide';

import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import { TableVirtuoso } from 'react-virtuoso';


import {addDelivery} from '../../../../actions/deliveries';
import {editMoldWithId} from '../../../../actions/molds'

import { useDispatch,useSelector } from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const HistoryMold = ({ openHistoryModal, handleCloseHistoryModal, moldSelected, itemSelected }) =>{

  const dispatch = useDispatch();

  const { isLoading, message, deliveries} = useSelector(state => state.deliveries);

  function createData(id,rowid, delivery, accept, reject, qty, purchpo,createdby,remarks) {
    return { id,rowid, delivery, accept, reject, qty, purchpo,createdby,remarks };
  }

  const rowsData = [];
  const [rows,setRows] = useState([]);
  const [modalData,setModalData] = useState({
    totalRows:0,
    remainingLife:0,
  });

  useEffect(()=>{
    if (!isLoading) {

      setRows([]);

      let remainLife = 0;

      deliveries?.map((del,index) => {
            rowsData.push(
              createData(del._id,
                <Typography sx={{ color: "#d63031", cursor: "pointer", textDecoration:'underline' }} variant='body1'>{index+1}</Typography>,
                moment(del.delivery).format('L'),del.accept,del.reject,del.qty,del.poNumber,del.lastEditdBy,del.remarks),
                );
              
            remainLife+= parseInt(del.qty);
            return null;
        });

        setModalData({
          totalRows: deliveries?.length,
          remainingLife: parseInt(moldSelected?.life) - parseInt(remainLife) 
        })

        setRows([...rowsData]);
    }
  },[deliveries,isLoading])

  useEffect(()=>{
    if(!isLoading && message == 'exceed'){
        setSnackbar({ children: `Exceeded mold life, please review the items, `, severity: 'error' });
    }else if (!isLoading && message === 'good')
        setSnackbar({ children: `Succesfully Added`, severity: 'success' });
  },[isLoading,message]);

  useEffect(() =>{
    if(modalData.remainingLife <= moldSelected?.threshold && moldSelected?.condition?.name == "good"){
       dispatch(editMoldWithId(moldSelected?._id,{...moldSelected,
          condition:{ label: 'For Validation', name:'for_validation',color: 'primary'},
          remarks:"reaches Threshold need validation",
          lastEditdBy:"Dave Mario Lagura"}));
    }
  },[modalData.remainingLife]);

  const [input,setInput] = useState({
      _id:null,
      poNumber:null,
      delivery:null,
      accept:null,
      reject:null,
      qty:null,
      remarks:null 
  });

  

  const clearInputs = () =>{
    setInput({
      poNumber:null,
      delivery:null,
      accept:null,
      reject:null,
      qty:null,
      remarks:null
    })
  }

  const handleOnChangeInput = (name,e,val=null) =>{
    if(name === "delivery"){
        setInput({
        ...input,
        [name]: e
        });
    }
    else if(name === 'qty'){
      return;
    }
    else if(name === 'accept' || name === 'reject'){
        setInput({
          ...input,
          [name]: e.target.value,
          qty: parseInt(e.target.value) + parseInt( name === 'accept' ? input.reject : input.accept)    
      });
    }  
    else
        setInput({
            ...input,
            [name]: e.target.value 
        });
    }

  const [sel, setSel] = React.useState('delivery');

  const handleChangeSelection = (e) => {
      setSel(e.target.value);
  };

  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const columns = [
    {
      width: 15,
      label: '#',
      dataKey: 'rowid',
    },
    {
      width: 70,
      label: 'IQC Delivery',
      dataKey: 'delivery',
      
    },
    {
      width: 20,
      label: 'Acc',
      dataKey: 'accept',
      numeric: true,
    },
    {
      width: 20,
      label: 'Rej',
      dataKey: 'reject',
      numeric: true,
    },
    {
      width: 20,
      label: 'Qty',
      dataKey: 'qty',
      numeric: true,
    },
    {
      width: 100,
      label: 'Purching PO',
      dataKey: 'purchpo',
    },
    {
      width: 100,
      label: 'Created By',
      dataKey: 'createdby',
    },
    {
      width: 200,
      label: 'Remarks',
      dataKey: 'remarks',
    },
    
  ];
  
  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref}  />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}  />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };
  
  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{borderLeft: '1px solid #fff',backgroundColor:'#222f3e',color:'#fff'}}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  useEffect(()=>{
    if(!isLoading && message == 'duplicate'){
        setSnackbar({ children: `Mold Number Inputed already exist, `, severity: 'error' });
    }else if (!isLoading && message === 'good')
        setSnackbar({ children: `Succesfully Added`, severity: 'success' });
},[isLoading,message])
  
  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
            sx={{borderLeft: '1px solid grey'}}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const AddDelivery = () =>{

        let flag = true;
        const poNumberStr = /^[a-zA-Z0-9-]{3,40}$/;
        if(!poNumberStr.test(input.poNumber) || input.poNumber == null) {
            setSnackbar({ children: `PO Number inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        const compValidationDate = moment(input.delivery).isBetween(moment('2000','YYYY'), moment().add(3,'y'));
        if(!compValidationDate){
            setSnackbar({ children: `Delivery Date Inputed is Invalid`, severity: 'error' });
            flag = false;
        }

        if(parseInt(input.accept) < 0 || parseInt(input.accept) > 999999 || input.accept == null){
            setSnackbar({ children: `Accept inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        if(parseInt(input.reject) < 0 || parseInt(input.reject) > 999999 || input.reject == null){
          setSnackbar({ children: `Reject inputed is invalid, `, severity: 'error' });
          flag = false;
        }

        if(parseInt(input.qty) < 0 || parseInt(input.qty) > 999999 || input.qty == null){
          setSnackbar({ children: `Qty inputed is invalid, `, severity: 'error' });
          flag = false;
        }

        // MUST HAVE A TRAPPING CANNOT ADD DUE TO EXCEED MOLD USED.

        const newRemaining = parseInt(modalData.remainingLife) - parseInt(input.qty);

        if(newRemaining <= 0){
          setSnackbar({ children: `Exceeds ramaining Life, Please Validate Mold Delivery `, severity: 'error' });
          flag = false;
        }   

        if(flag){
          
            dispatch(addDelivery(moldSelected._id,{...input,poNumber:input.poNumber.toUpperCase(),itemId:itemSelected._id,
              moldId:moldSelected._id,lastEditdBy:"Dave Mario Lagura"}));

            clearInputs();
        }
    }
  
   
  return(
     <>
      {/* Dialog bulk edit */}
        <Dialog
            open={openHistoryModal}
            onClose={handleCloseHistoryModal}
            fullWidth
            TransitionComponent={Transition}
            PaperProps={{
              style: {
                  margin: 0,
                  width: '100%',
                  height: '100%',
                  maxHeight: '100%',
                  borderRadius: 0,
                  },
            }}
            maxWidth="auto"
        >
          <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Item: <span style={{backgroundColor:'#2f3640'}}>{itemSelected?.itemCode}</span> - 
            Mold: <span style={{backgroundColor:'#2f3640'}}>{moldSelected?.moldNumber}</span>
            </Typography>
            <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseHistoryModal}
                aria-label="close"
              >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
    
        <DialogContent>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={false}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid  md={8} lg={8}>
            <Box sx={{mt:2}}>
                <Box display="flex" flexDirection="row" justifyContent="space-between" pl={1} pr={1} pb={1}>
                    <Typography  variant='h6' color="green">
                        Total Rows : <span style={{color:"#2f3640"}}>{modalData.totalRows}</span>
                    </Typography>
                  
                    <Typography variant='h6' color="red">
                        Life Remaining :{modalData.remainingLife}
                    </Typography>
                    <Typography variant='h6'>
                        Total Life: {moldSelected?.life}
                    </Typography>
                    <Box>
                    <FormControl >
                    <InputLabel id="demo-simple-select-label" >Column</InputLabel>
                        <Select
                            value={sel}
                            label="Column"
                            size='small'
                            sx={{minWidth:150}}
                            onChange={handleChangeSelection}
                        >
                            <MenuItem value='delivery'>IQC Delivery</MenuItem>
                            <MenuItem value='accept'>Accept</MenuItem>
                            <MenuItem value='reject'>Reject</MenuItem>
                            <MenuItem value='qty'>Qty</MenuItem>
                            <MenuItem value='purcpo'>Purch PO#</MenuItem>
                            <MenuItem value='remarks'>Remarks</MenuItem>
                            <MenuItem value='createdby'>Created By</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField sx={{ml:1}} size='small' onChange={()=>{}} value={''}  label="SEARCH" variant="outlined"  />
                    </Box>
                </Box>
                <div style={{ height: 500, width: '100%' }}>
                <Paper elevation={10} style={{ height: 450, width: '100%' }}>
                  <TableVirtuoso
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                  />
                </Paper><br/>
                  <Typography variant='p'>
                      {`Note: Life remaining reaches ${moldSelected?.threshold}, MoldCondition auto set to "FOR VALIDATION"`}
                  </Typography><br/>
                </div>
            </Box>
            </Grid>
            <Grid  md={4} lg={4}>
            <Box component="form" noValidate autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}>
                <TextField label="Purchasing PO Number" onChange={(e)=>handleOnChangeInput("poNumber",e)} value={input.poNumber || ''} variant="outlined" size='small' fullWidth/>
                <DatePicker label="IQC Delivery" maxDate={moment().add(3,'y')} size='small' minDate={moment('2000','YYYY')}  onChange={(e)=>handleOnChangeInput("delivery",e)} value={moment(input.delivery)} />
                <TextField  label="Accept" type='number' onChange={(e)=>handleOnChangeInput("accept",e)} value={input.accept || ''} size='small' variant="outlined" fullWidth/>
                <TextField  label="Reject" type='number' onChange={(e)=>handleOnChangeInput("reject",e)} value={input.reject || ''} size='small' variant="outlined" fullWidth/>
                <TextField  label="Qty" type='number'  value={input.qty || ''} size='small' variant="outlined" fullWidth/>
                <TextField
                    id="outlined-multiline-static"
                    label="Remarks"
                    multiline
                    size='small'
                    onChange={(e)=>handleOnChangeInput("remarks",e)} 
                    value={input.remarks || ''}
                    rows={3}
                    />
                </Box>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center" sx={{mt:2}}>
                  <Grid xs={6} md={6} lg={6}> 
                    <Button onClick={clearInputs} variant="contained" color="warning">Clear Inputs</Button>
                  </Grid>
                  <Grid xs={6} md={6} lg={6}> 
                    <Button onClick={AddDelivery} variant="contained">Add Delivery</Button>
                  </Grid>
                </Grid>
            </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
        </Dialog>
    {/* Dialog for bulk edit */}
        <div>
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={4000}
                > 
                    <Alert {...snackbar} onClose={handleCloseSnackbar} variant="filled" />
                </Snackbar>
            )}
        </div>
     </>
  )
};

export default HistoryMold;

 
 
 
 