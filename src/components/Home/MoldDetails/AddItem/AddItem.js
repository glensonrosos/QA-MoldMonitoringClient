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

        <Accordion  sx={{
            backgroundColor: "#222f3e",
            color:"#fff"
        }}
        defaultExpanded={true}>
        <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        >
        <Typography variant="h6"> Search / Add Item</Typography>
        </AccordionSummary>
        <AccordionDetails>

            <Paper elevation={6} sx={{padding:2}}>    
                <Typography variant="h6"> Search / Add Item </Typography><br/>
                    <Grid container spacing={2} direction="row" justifyContent="center">
                        <Grid xs={6} md={6} lg={6}>
                            <Box component="form" noValidate autoComplete="off"  sx={{
                            '& .MuiTextField-root': { m: 1, width: '40ch' },
                        }}>
                                <TextField size='small' onChange={()=>{}} value={''} fullWidth label="Item Code" variant="outlined" />
                                <TextField size='small' onChange={()=>{}} value={''} fullWidth label="Item Description" variant="outlined" />
                                <Autocomplete
                                    size='small'
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
                            </Box>
                        </Grid>
                        <Grid xs={6} md={6} lg={6}>
                            <Box component="form" noValidate autoComplete="off"  sx={{
                            '& .MuiTextField-root': { m: 1, width: '40ch' },
                        }}>
                            <Autocomplete
                                size='small'
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
                                size='small'
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
                            </Box>
                           
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction="row" justifyContent="center">
                        <Grid xs={4} md={4} lg={4}>
                            <Button size='small' variant="contained" color="primary" startIcon={<Save/>} fullWidth onClick={()=>{}}  > Add Item </Button>
                        </Grid>
                        <Grid xs={4} md={4} lg={4}>
                            <Button size='small' variant="contained" color="error" startIcon={<Save/>} fullWidth onClick={()=>{}}  > Clear </Button>
                        </Grid>
                        <Grid xs={4} md={4} lg={4}>
                            <Button size='small' variant="contained" color="warning" startIcon={<Save/>} fullWidth onClick={()=>{}}  > Search Item </Button>  
                        </Grid>
                    </Grid>

            </Paper>
            </AccordionDetails>
            </Accordion>
    )
};

export default AddItem;