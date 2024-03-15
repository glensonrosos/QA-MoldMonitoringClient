import React,{useState,useEffect} from 'react';


import { Box,Button,Snackbar,Alert,Autocomplete,TextField,} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';

import {editMoldWithId,} from '../../../../actions/molds';

import { useDispatch,useSelector } from 'react-redux';

const EditDeleteMold = ({ openEditDeleteModal, handleCloseEditDeleteModal,moldSelected, itemSelected }) =>{

    const { isLoading, message} = useSelector(state => state.molds);

    const [input,setInput] = useState({
        _id:null,
        moldNumber:null,
        validationDate:null,
        life:null,
        threshold:null,
        condition:null,
        remarks:null 
    });

    useEffect(() =>{
       if(openEditDeleteModal){
            setInput({
                _id: moldSelected?._id,
                moldNumber: moldSelected?.moldNumber,
                validationDate: moldSelected?.validationDate,
                life: moldSelected?.life,
                threshold: moldSelected?.threshold,
                condition: moldSelected?.condition,
                remarks: moldSelected?.remarks,
            })
       }
    },[openEditDeleteModal])

    useEffect(()=>{
        if(!isLoading && message == 'duplicate'){
            setSnackbar({ children: `Mold Number Inputed already exist, `, severity: 'error' });
        }else if (!isLoading && message === 'good')
            setSnackbar({ children: `Succesfully Added`, severity: 'success' });
    },[isLoading,message])

    const dispatch = useDispatch();

    const inputClear = () =>{
        setInput({
            moldNumber:null,
            validationDate:null,
            life:null,
            threshold:null,
            condition:null,
            remarks:null 
        });
    }

    const conditions = [
        { label: 'Bad', name: 'bad',color: 'error'},
        { label: 'Good', name: 'good',color: 'success'},
        { label: 'With Issues', name: 'with_issues',color: 'warning'},
        { label: 'For Validation', name:'for_validation',color: 'primary'},
      ];

    const [snackbar, setSnackbar] = useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOnChangeInput = (name,e,val=null) =>{
        if(name === "validationDate"){
            setInput({
            ...input,
            [name]: e
            });
        }
        else if(name === "condition"){
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


    const UpdateMoldButton = () =>{

        let flag = true;

        const moldNumber = /^(?:[a-zA-Z0-9]+-?){1,15}$/;
        if(!moldNumber.test(input.moldNumber) || input.moldNumber == null) {
            setSnackbar({ children: `Mold Number inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        const compValidationDate = moment(input.validationDate).isBetween(moment('2000','YYYY'), moment().add(3,'y'));
        if(!compValidationDate){
            setSnackbar({ children: `Validation Date Inputed is Invalid`, severity: 'error' });
            flag = false;
        }

        if(parseInt(input.life) < 0 || parseInt(input.life) > 999999 || input.life == null){
            setSnackbar({ children: `Mold Life inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        if(parseInt(input.threshold) >= parseInt(input.life) || parseInt(input.threshold) > 999999 || input.threshold == null){
            setSnackbar({ children: `Threshold must be lesser than Life, `, severity: 'error' });
            flag = false;
        }

        const findCondition = conditions.find(con => con?.name === input.condition?.name);
        if(findCondition === undefined || findCondition === null){
           
            setSnackbar({ children: `Condition inputed is invalid`, severity: 'error' });
            flag = false;
        }
        if(flag){
           
            dispatch(editMoldWithId(input._id,{...input,lastEditdBy:"Dave Mario Lagura"}));
        
            inputClear();
            handleCloseEditDeleteModal();
        }
    }

  return(
     <>
        {/* dialog box */}
      <Dialog open={openEditDeleteModal} onClose={handleCloseEditDeleteModal}>
        <DialogTitle>Edit / Mold - <span style={{backgroundColor:'#feca57'}}>{itemSelected?.itemCode}</span></DialogTitle>
        <DialogContent>
            <Box component="form" noValidate autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}>
                <TextField label="Mold #" disabled onChange={(e)=>handleOnChangeInput("moldNumber",e)} value={input.moldNumber || ''} variant="outlined" size='small' fullWidth/>
                <DatePicker label="Validation Date" maxDate={moment().add(3,'y')} size='small' minDate={moment('2000','YYYY')}  onChange={(e)=>handleOnChangeInput("validationDate",e)} value={moment(input.validationDate)} />
                <TextField  label="Mold Life" type='number' onChange={(e)=>handleOnChangeInput("life",e)} value={input.life || ''} size='small' variant="outlined" fullWidth/>
                <TextField  label="Warning Threshold" type='number' onChange={(e)=>handleOnChangeInput("threshold",e)} value={input.threshold || ''} size='small' variant="outlined" fullWidth/>
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
                {/* </Grid>
            </Grid> */}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseEditDeleteModal} variant="contained" color="warning">Cancel</Button>
            <Button onClick={UpdateMoldButton} variant="contained">Update</Button>
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

export default EditDeleteMold;

