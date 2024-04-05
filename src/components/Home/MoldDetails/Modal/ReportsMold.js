import React,{useState,useEffect} from 'react';


import { Box,Button,Snackbar,Alert,Autocomplete,TextField,Backdrop,CircularProgress} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import {exportReport,clearMoldState} from '../../../../actions/molds';

import { exportToExcel } from 'react-json-to-excel';

import moment from 'moment'

import { useDispatch,useSelector } from 'react-redux';


const ReportsMold = ({ openReportsModal, handleCloseReportsModal }) =>{

    const dispatch = useDispatch();

    const {suppliers} = useSelector(state=> state.suppliers);
    const {isLoading,exportMolds,message} = useSelector(state => state.molds);

    const [inputSupplier,setInputSupplier] = useState([]);
    
    const [input,setInput] = useState({
        itemCode:null,
        supplier:null,
        condition: { label: 'Near Validation', name: 'near_validation',color: 'warning'},
    });

    const [generateReportLoading,setGenerateReportLoading] = useState(false);

    useEffect(() =>{
        if(!isLoading && exportMolds.length > 0 && message === "export"){

            const dataExport = exportMolds.map(ex =>{
                return {
                    "Item Code": ex.itemCode,
                    "Buyer": ex.buyerName,
                    "Material":ex.materialName,
                    "Supplier": ex.supplierName,
                    "Mold #": ex.moldNumber,
                    "life Remaining": ex.life,
                    "Condition": ex.conditionName,
                    "Total Delivered": ex.delivered,
                    "Last Edited By" : ex.lastEditdBy,
                    "Last Updated":moment(ex.updatedAt).format('L'),
                    "Remarks" : ex.remarks
                };
            })



            exportToExcel(dataExport, 'itgwapos');
           // loading done and clear exportMolds state

           inputClear();
           handleCloseReportsModal();
        
           
           dispatch(clearMoldState());
        }
        else if(!isLoading && exportMolds.length === 0 && message === "no itemcode found")
            setSnackbar({ children: `Item Code matches the search, or you can leave it blank`, severity: 'error' });
        else if(!isLoading && exportMolds.length === 0 && message === "export")
            setSnackbar({ children: `No Data found, `, severity: 'error' });
        setGenerateReportLoading(false);

    },[isLoading,exportMolds,message])


    useEffect(()=>{
        setInputSupplier(suppliers);
    },[suppliers]);


    const inputClear = () =>{
        setInput({
            itemCode:null,
            supplier:null,
            condition: null,
        });
    }

    const conditions = [
        { label: 'Good', name: 'good',color: 'success'},
        { label: 'Bad', name: 'bad',color: 'error'},
        { label: 'Near Validation', name: 'near_validation',color: 'warning'},
        { label: 'For Validation', name:'for_validation',color: 'primary'},
      ];

    const [snackbar, setSnackbar] = useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOnChangeInput = (name,e,val=null) =>{
        if(name === "condition" || name === "supplier"){
            setInput({
                ...input,
                [name]: val 
            });
        }
        else
            setInput({
                ...input,
                [name]: e.target.value 
            });
    }

    const generateReport = async () =>{

        let flag = true;

        const itemCodeReg = /^[a-zA-Z0-9-]*$/;
        if(!itemCodeReg.test(input.itemCode)) {
            setSnackbar({ children: `Item Code Number inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        const findSupplier= inputSupplier.find(con => con?.name === input.supplier?.name);
        if(findSupplier === undefined || findSupplier === null){
           
            setSnackbar({ children: `Supplier is required`, severity: 'error' });
            flag = false;
        }

        const findCondition = conditions.find(con => con?.name === input.condition?.name);
        if(findCondition === undefined || findCondition === null){
           
            setSnackbar({ children: `Condition is required`, severity: 'error' });
            flag = false;
        }
        if(flag){

            setGenerateReportLoading(true);

            await dispatch(exportReport({itemCode:input?.itemCode?.toUpperCase(), supplierId:input?.supplier?._id, conditionName: input?.condition?.name }));
            // start loading
        }
    }


  return(
     <>
        {/* dialog box */}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={generateReportLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
      <Dialog open={openReportsModal} onClose={handleCloseReportsModal}>
        <DialogTitle>Reports Mold </DialogTitle>
        <DialogContent>
            <Box component="form" noValidate autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}>
                <TextField label="Item Code" onChange={(e)=>handleOnChangeInput("itemCode",e)} value={input.itemCode || ''} variant="outlined" size='small' fullWidth/>
                <Autocomplete
                    //disabled={isEditButton}
                    size='small'
                    disablePortal
                    id="supplierId"
                    options={inputSupplier}
                    clearOnEscape 
                    onChange={(e,v)=>handleOnChangeInput("supplier",e,v)}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 250 }}
                    value={input?.supplier}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => <TextField {...params} label="Supplier" />}
                />
               
                <Autocomplete
                    disablePortal
                    size='small'
                    id="buyerssId"
                    options={conditions}
                    clearOnEscape 
                    onChange={(e,v)=>handleOnChangeInput("condition",e,v)}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 250 }}
                    value={input?.condition}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => <TextField {...params} label="Condition" />}
                /> 
                </Box>
                {/* </Grid>
            </Grid> */}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseReportsModal} variant="contained" color="warning">Cancel</Button>
            <Button onClick={generateReport} variant="contained">Generate Report</Button>
        </DialogActions>
        </Dialog>
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

export default ReportsMold;

