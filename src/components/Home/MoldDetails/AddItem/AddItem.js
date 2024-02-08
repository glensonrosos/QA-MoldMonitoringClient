import React from 'react';
import {Box,Paper,Typography,TextField,Autocomplete,Button} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import {Save} from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AddItem = () =>{

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 }
      ];

    return (
        <div>
            <Box sx={{ maxHeight: 600, width: '100%',mt:2 }}></Box>
            {/* defaultExpanded */}
            <Accordion
            defaultExpanded
            sx={{
                backgroundColor: "#283c50ad",
                color:"#fff",
            }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography>Search / Add Item</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container spacing={2} justifyContent="center" sx={{mb:2}}>  
            <Grid xs={6} md={8} lg={8}>  
            <Paper elevation={6}>
                <Grid container spacing={4} justifyContent="center">
                <Grid xs={6} md={12} lg={12}> 
                        <Grid spacing={2} container direction="row" alignItems="flex-end">
                        <Typography variant="h5" sx={{ml:2}}> Search Item </Typography><br/>
                        </Grid>
                </Grid>
                <Grid xs={6} md={6} lg={6}>
                    <Box component="form" noValidate autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1,ml:10, width: '40ch' },
                        '& .MuiButton-root': { m: 1,ml:10, width: '40ch' },
                    }}>
                        <TextField onChange={()=>{}} value={''} fullWidth label="Item Code" variant="outlined" />
                        <TextField onChange={()=>{}} value={''} fullWidth label="Item Description" variant="outlined" />
                        <Autocomplete
                            disablePortal
                            id="buyerssId"
                            options={top100Films}
                            clearOnEscape 
                            //onChange={(e,v)=>handleOnChangeInput("buyer",e,v)}
                            //getOptionLabel={(option) => option.buyer}
                            sx={{ width: 250 }}
                            //value={input?.buyer}
                            //isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => <TextField {...params} label="Supplier" />}
                        />
                        <Button variant="contained" color="primary" size="large" startIcon={<Save/>} fullWidth onClick={()=>{}}  > Add Item </Button>
                    </Box>
                </Grid>
                <Grid xs={6} md={6} lg={6}>
                    <Box component="form" noValidate autoComplete="off"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch' },
                        '& .MuiButton-root': { m: 1, width: '40ch' },
                    }}>
                        <Autocomplete
                            disablePortal
                            id="buyerssId"
                            options={top100Films}
                            clearOnEscape 
                            //onChange={(e,v)=>handleOnChangeInput("buyer",e,v)}
                            //getOptionLabel={(option) => option.buyer}
                            sx={{ width: 250 }}
                            //value={input?.buyer}
                            //isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => <TextField {...params} label="Buyer" />}
                        />
                        <Autocomplete
                            disablePortal
                            id="buyerssId"
                            options={top100Films}
                            clearOnEscape 
                            //onChange={(e,v)=>handleOnChangeInput("buyer",e,v)}
                            //getOptionLabel={(option) => option.buyer}
                            sx={{ width: 250 }}
                            //value={input?.buyer}
                            //isOptionEqualToValue={(option, value) => option.value === value.value}
                            renderInput={(params) => <TextField {...params} label="Material" />}
                        />

                        <Button variant="contained" color="warning" size="large" startIcon={<Save/>} fullWidth onClick={()=>{}}  > Search Item </Button>
                        <Button variant="contained" color="error" size="large" startIcon={<Save/>} fullWidth onClick={()=>{}}  > Clear </Button>
                    </Box>
                </Grid>
                </Grid>
            </Paper>
            </Grid>
        </Grid>
            </AccordionDetails>
        </Accordion>
        </div>
    )
};

export default AddItem;