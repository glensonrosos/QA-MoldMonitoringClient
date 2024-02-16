import React from 'react';


import { Box,Button,Backdrop,CircularProgress,TextField,Link,Chip,Tooltip,Typography,Pagination,PaginationItem,Stack} from '@mui/material';
import { DataGrid,GridToolbarExport,GridToolbarContainer,GridToolbarColumnsButton } from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2';

import {Add,CancelPresentation, Save} from '@mui/icons-material';

import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';


const HistoryMold = ({ openHistoryModal, handleCloseHistoryModal }) =>{

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
      ];

      const columns = [
        { 
          field: 'headerRowNumber',
          headerName: '#',
          type:'number',
          editable: false,
     
          width: 95,minWidth: 30, maxWidth: 100,
          pinned: true
        },
        { 
          field: 'iqcDeliveryDate',
          headerName: 'IQC Delivery Date',
          type:'date',
          editable: true,
          headerClassName: 'super-app-theme--header',
          maxWidth:200,  
          pinned: true,
          valueFormatter: (params) =>(params.value !== null ? moment(params?.value).format('L') : null)
        },
        {
          field: 'accepted',
          headerName: 'Accepted',
          type: 'number',
          editable: true,
          maxWidth:200, 
          pinned: true
        },
        {
          field: 'rejected',
          headerName: 'Rejected',
          type: 'number',
          editable: true,
          maxWidth:200, 
          pinned: true
        },
        {
          field: 'qty',
          headerName: 'QTY',
          type: 'number',
          maxWidth:200, 
          editable: true,
          pinned: true
        },
        {
          field: 'purchPoNumber',
          headerName: 'Purchasing PO #',
          type: 'string',
          maxWidth:200, 
          editable: true,
          pinned: true
        },
        {
            field: 'lastEditedBy',
            headerName: 'Last Edited By',
            type: 'string',
            maxWidth:500, 
            editable: true,
            pinned: true
          },
        {
            field: 'remarks',
            headerName: 'Remarks',
            type: 'string',
            maxWidth:500, 
            editable: true,
            pinned: true
          },
      ];

      const rows = [
        { id:1234,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:1235,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:1236,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:1237,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:1238,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:1239,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:12310,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:12311,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:12312,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:12313,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:12314,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:12315,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
        { id:12316,headerRowNumber: 132, iqcDeliveryDate: moment().format('L'), accepted:5, rejected: 14,qty:0, purchPoNumber:'PO293123',purchPoNumber:'12312312 12321',remarks:''},
      ];

      const processRowUpdate = async (newRow,oldRow) =>{
        return await newRow;
    } 
    const handleProcessRowUpdateError = async (error) =>{
        return null;
    }
  
  return(
     <>
      {/* Dialog bulk edit */}
        <Dialog
            open={openHistoryModal}
            onClose={handleCloseHistoryModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={'lg'}
            
            
        >
        <DialogTitle id="alert-dialog-title"> Mold #2 - History </DialogTitle>
        <DialogContent>

       
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={false}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid  md={9} lg={9}>
            <Box sx={{mt:2}}>
                <Box display="flex" flexDirection="row" justifyContent="space-between" pl={1} pr={1} pb={1}>
                    <Button size="small" variant="contained" color="secondary" onClick={()=>{}} startIcon={<Add/>}>
                        Add a row
                    </Button>
                    <Typography variant='h6' color="red">
                        Mold Life Remaining : 45
                    </Typography>
                    <Typography  variant='h6' color="green">
                        Total Rows : 3
                    </Typography>
                </Box>
                <div style={{ height: 450, width: '100%' }}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    getRowHeight={() => 'auto'}
                    getEstimatedRowHeight={() => 200} 
                    pageSizeOptions={[5]}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                   
                    density="standard"

                    sx={{
                        '& .MuiDataGrid-columnHeaderTitle': {
                        whiteSpace: 'break-spaces',
                        lineHeight: 1,
                        },
                        '&.MuiDataGrid-root .MuiDataGrid-columnHeader--alignRight .MuiDataGrid-columnHeaderTitleContainer': {
                        pl: 1,
                        },
                        "& .MuiDataGrid-cell":{
                        border: 1,
                        borderRight: 1,
                        borderTop: 0,
                        borderLeft:0,
                        borderBottom:1,
                        borderColor: 'primary.light',
                        // add more css for customization
                        },
                        boxShadow: 2,
                        // border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            border: 1,
                            borderColor: 'primary',
                            backgroundColor:'primary.main',
                            color:'#fff'
                            // add more css for customization
                        },
                        ".highlight": {
                            bgcolor: "#95a5a6",
                            "&:hover": {
                            bgcolor: "#7f8c8d",
                            },
                        },
                        overflow: "scroll"
                    }}
                    />
                </div>
            </Box>
            </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
        <Button variant="contained" color="error" startIcon={<CancelPresentation/>} onClick={handleCloseHistoryModal}>Close Dialog</Button>
        <Button variant="contained" color="info" startIcon={<Save/>} onClick={handleCloseHistoryModal} autoFocus>
            Execute Changes
        </Button>
        </DialogActions>
        </Dialog>
    {/* Dialog for bulk edit */}
     </>
  )
};

export default HistoryMold;

 
 
 
 