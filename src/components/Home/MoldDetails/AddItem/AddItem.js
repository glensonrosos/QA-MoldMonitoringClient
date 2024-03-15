import React, { useEffect,useState } from 'react';
import {Box,Paper,Typography,TextField,Autocomplete,Button,Backdrop,CircularProgress,Snackbar,Alert} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import {Save} from '@mui/icons-material';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {getBuyers} from '../../../../actions/buyers';
import {getMaterials} from '../../../../actions/materials';
import {getSuppliers} from '../../../../actions/suppliers';
import {createItem,editItem} from '../../../../actions/items';

import { useSelector,useDispatch } from 'react-redux';

const AddItem = ({sharedStateRef,setSharedStateRef}) =>{
    const dispatch = useDispatch();

    const {buyers,isLoading:buyerLoading} = useSelector(state=> state.buyers);
    const {materials,isLoading:materialLoading} = useSelector(state=> state.materials);
    const {suppliers,isLoading:supplierLoading} = useSelector(state=> state.suppliers);

    useEffect(()=>{
        dispatch(getBuyers());
        dispatch(getMaterials());
        dispatch(getSuppliers());
    },[dispatch])

    const [input,setInput] = useState({
        _id:null,
        itemCode:null,
        itemDescription:null,
        supplier:null,
        buyer:null,
        material:null,
    });

    const [isEditButton,setIsEditButton] = useState(false);
   

    sharedStateRef.current = input;
    setSharedStateRef.current = setInput;
    setSharedStateRef.button = setIsEditButton;

    const [inputBuyer,setInputBuyer] = useState([]);
    const [inputMaterial,setInputMaterial] = useState([]);
    const [inputSupplier,setInputSupplier] = useState([]);

    useEffect(()=>{
        if(buyers?.length > 0 && suppliers?.length > 0 && materials?.length > 0 ){
            setInput({
                _id:null,
                itemCode:null,
                itemDescription:null,
                supplier:null,
                buyer:null,
                material:null,
            });
            setInputBuyer(buyers);
            setInputMaterial(materials);
            setInputSupplier(suppliers);
        }
    },[buyers,materials,suppliers]);

    const handleOnChangeInput = (name,e,val=null) =>{
        
        if(name === "buyer" || name === "material" || name === "supplier"){
            setInput({
                ...input,
                [name]: val 
            });
        }else
            setInput({
                ...input,
                [name]: e.target.value 
            });
        }

    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);


    const AddItem =  () =>{

        let flag = true;

        const itemNumberReg = /^(?:[a-zA-Z0-9]+-?){3,15}$/;
        if(!itemNumberReg.test(input.itemCode)) {
            setSnackbar({ children: `Item Code inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        const itemDescReg = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"\[\]{}|\\/\s]{5,40}$/;
        if(!itemDescReg.test(input.itemDescription)){
            setSnackbar({ children: `Item Description inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        const findBuyer = inputBuyer.find(buy => buy?._id === input.buyer?._id);
        if(findBuyer === undefined || findBuyer === null){
            setSnackbar({ children: `Buyer inputed is invalid`, severity: 'error' });
            flag = false;
        }

        const findSupplier = inputSupplier.find(buy => buy?._id === input.supplier?._id);
        if(findSupplier === undefined || findSupplier === null){
            setSnackbar({ children: `Supplier inputed is invalid`, severity: 'error' });
            flag = false;
        }

        const findMaterial = inputMaterial.find(buy => buy?._id === input.material?._id);
        if(findMaterial === undefined || findMaterial === null){
            setSnackbar({ children: `Material inputed is invalid`, severity: 'error' });
            flag = false;
        }

        if(flag){

            dispatch(createItem({...input,itemCode:input.itemCode.toUpperCase(),lastEditdBy:"Dave Mario Lagura"}));
            setInput({
                _id:null,
                itemCode:null,
                itemDescription:null,
                supplier:null,
                buyer:null,
                material:null,
            });
            setSnackbar({ children: `Successfully added`, severity: 'success' });
        }
    }

    const EditItem = async () =>{
        let flag = true;

        const itemDescReg = /^[a-zA-Z0-9!@#$%^&*()_+-=,.<>?;:'"\[\]{}|\\/\s]{5,40}$/;
        if(!itemDescReg.test(input.itemDescription)){
            setSnackbar({ children: `Item Description inputed is invalid, `, severity: 'error' });
            flag = false;
        }

        const findBuyer = inputBuyer.find(buy => buy?._id === input.buyer?._id);
        if(findBuyer === undefined || findBuyer === null){
            setSnackbar({ children: `Buyer inputed is invalid`, severity: 'error' });
            flag = false;
        }

        const findSupplier = inputSupplier.find(buy => buy?._id === input.supplier?._id);
        if(findSupplier === undefined || findSupplier === null){
            setSnackbar({ children: `Supplier inputed is invalid`, severity: 'error' });
            flag = false;
        }

        const findMaterial = inputMaterial.find(buy => buy?._id === input.material?._id);
        if(findMaterial === undefined || findMaterial === null){
            setSnackbar({ children: `Material inputed is invalid`, severity: 'error' });
            flag = false;
        }

        if(flag){

            await dispatch(editItem(input._id,{...input,lastEditdBy:"Dave Mario Lagura"}));
            setInput({
                _id:null,
                itemCode:null,
                itemDescription:null,
                supplier:null,
                buyer:null,
                material:null,
            });
            setIsEditButton(false);
            setSnackbar({ children: `Edited Successfully`, severity: 'success' });
        }
    }

    const clearItem = () =>{
        setInput({
            _id:null,
            itemCode:null,
            itemDescription:null,
            supplier:null,
            buyer:null,
            material:null,
        });

        setIsEditButton(false);
    }

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

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={buyerLoading || materialLoading || supplierLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            
            <Paper elevation={6} sx={{padding:2}}>    
                <Typography variant="h6"> Search / Add Item </Typography><br/>
                    <Grid container spacing={2} direction="row" justifyContent="center">
                        <Grid xs={6} md={6} lg={6}>
                            <Box component="form" noValidate autoComplete="off"  sx={{
                            '& .MuiTextField-root': { m: 1, width: '40ch' },
                        }}>
                                <TextField size='small' disabled={isEditButton} onChange={(e)=>handleOnChangeInput("itemCode",e)} value={input.itemCode || ''} fullWidth label="Item Code" variant="outlined" />
                                <TextField size='small' onChange={(e)=>handleOnChangeInput("itemDescription",e)} value={input.itemDescription || ''}  multiline rows={2} fullWidth label="Item Description" variant="outlined" />
                                <Autocomplete
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
                                options={inputBuyer}
                                clearOnEscape 
                                onChange={(e,v)=>handleOnChangeInput("buyer",e,v)}
                                getOptionLabel={(option) => option.name}
                                sx={{ width: 250 }}
                                value={input?.buyer}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                renderInput={(params) => <TextField {...params} label="Buyer" />}
                            />
                            <Autocomplete
                                size='small'
                                disablePortal
                                id="materialsId"
                                options={inputMaterial}
                                clearOnEscape 
                                onChange={(e,v)=>handleOnChangeInput("material",e,v)}
                                getOptionLabel={(option) => option.name}
                                sx={{ width: 250 }}
                                value={input?.material}
                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                renderInput={(params) => <TextField {...params} label="Material" />}
                            />
                            </Box>
                           
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} direction="row" justifyContent="center">
                        <Grid xs={4} md={4} lg={4}>
                            <Button size='small' variant="contained" color={isEditButton ? `success` : `primary`} startIcon={<Save/>} fullWidth onClick={isEditButton ? EditItem :AddItem}  > {isEditButton ? `Edit Item` : `Add Item`} </Button>
                        </Grid>
                        <Grid xs={4} md={4} lg={4}>
                            <Button size='small' variant="contained" color="error" startIcon={<Save/>} fullWidth onClick={clearItem}  > Clear </Button>
                        </Grid>
                        <Grid xs={4} md={4} lg={4}>
                            <Button size='small' variant="contained" color="warning" startIcon={<Save/>} fullWidth onClick={()=>{}}  > Search Item </Button>  
                        </Grid>
                    </Grid>
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

            </Paper>
            </AccordionDetails>
            </Accordion>
    )
};

export default AddItem;