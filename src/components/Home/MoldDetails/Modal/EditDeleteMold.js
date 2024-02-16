import React from 'react';


import { Box,Button,Snackbar,Alert,Autocomplete,TextField,Link,Chip,Tooltip,Typography,Pagination,PaginationItem,Stack} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';


const EditDeleteMold = ({ openEditDeleteModal, handleCloseEditDeleteModal }) =>{

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
      ];

  return(
     <>
        {/* dialog box */}
      <Dialog open={openEditDeleteModal} onClose={handleCloseEditDeleteModal}>
        <DialogTitle>Edit / Delete Mold</DialogTitle>
        <DialogContent>
            {/* <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid sm={12} md={12} lg={12} > */}
            <Box component="form" noValidate autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '50ch' },
                    }}>
                <TextField id="poNumber" label="Modal #" onChange={()=>{}} variant="outlined" size='small' fullWidth/>
                <DatePicker label="Validation Date" maxDate={moment().add(3,'y')} size='small' minDate={moment('2000','YYYY')} id="dateIssued" onChange={(e)=>{}} defaultValue={moment()} />
                <TextField id="poNumber" label="Mold Life" onChange={()=>{}} size='small' variant="outlined" fullWidth/>
                <TextField id="poNumber" label="Rejection %" onChange={()=>{}} size='small' variant="outlined" fullWidth/>
                
                <Autocomplete
                    disablePortal
                    id="buyerssId"
                    options={top100Films}
                    clearOnEscape 
                    //onChange={(e,v)=>handleOnChangeInput("buyer",e,v)}
                    //getOptionLabel={(option) => option.buyer}
                    sx={{ width: 250 }}
                    size='small'
                    //value={input?.buyer}
                    //isOptionEqualToValue={(option, value) => option.value === value.value}
                    renderInput={(params) => <TextField {...params} label="Condition" />}
                /> 
               
               <TextField
                    id="outlined-multiline-static"
                    label="Remark"
                    value={''}
                    multiline
                    size='small'
                    onChange={(e)=>{}}
                    rows={3}
                    />
                </Box>
                {/* </Grid>
            </Grid> */}
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseEditDeleteModal} variant="contained" color="warning">Cancel</Button>
            <Button onClick={handleCloseEditDeleteModal} variant="contained">Save</Button>
        </DialogActions>
        </Dialog>
     </>
  )
};

export default EditDeleteMold;

