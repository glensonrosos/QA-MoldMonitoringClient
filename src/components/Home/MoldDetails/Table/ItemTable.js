import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Checkbox, Typography, Pagination, PaginationItem, Stack, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'

import { useDispatch, useSelector } from 'react-redux'

import { getItems } from '../../../../actions/items';
import { getMoldsByItemId } from '../../../../actions/molds';

const ItemTable = ({setSharedStateRef }) => {

    const dispatch = useDispatch();

    const { isLoading, items } = useSelector(state => state.items);

    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

    
    const columns = [
        { id: 'select', label: '', maxWidth: 10 },
        { id: 'itemcode', label: 'Item Code', minWidth: 30 },
        { id: 'itemdescription', label: 'Item Description', minWidth: 30 },
        { id: 'supplier', label: 'Supplier', minWidth: 30 },
        { id: 'buyer', label: 'Buyer', minWidth: 30 },
        { id: 'material', label: 'Material', minWidth: 30 },
    ];

    function createData(select, itemcode, itemdescription, supplier, buyer, material) {
        return { select, itemcode, itemdescription, supplier, buyer, material };
    }

    const [rows, setRows] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const rowsData = [];

    const handleCheckboxChange = (item) => {
        const index = itemIndex(item);
        setSelectedIndex(index === selectedIndex ? -1 : index);
        setSharedStateRef.setItemSelected(item);
       
    };

    const handleColumnClick = (item) => {
        const index = itemIndex(item);
        setSelectedIndex(index === selectedIndex ? -1 : index);
        setSharedStateRef.setItemSelected(item);
        dispatch(getMoldsByItemId(item?._id));
      
    };

    const itemIndex = (item) => {
        return items.findIndex(i => i.itemCode === item.itemCode);
    };

    useEffect(() => {
        if (!isLoading && items.length > 0) {
            setRows([]);

            items?.map(item => {
                rowsData.push(
                    createData(
                        <Checkbox
                            checked={selectedIndex === itemIndex(item)}
                            onChange={() => handleCheckboxChange(item)}
                            size='small'
                            style={{ padding: 0 }} />,
                        <Typography sx={{ color: "#d63031", cursor: "pointer" }} variant='body1'
                            onClick={() => { setSharedStateRef.current({ ...item }); setSharedStateRef.button(true) }}>{item.itemCode}</Typography>
                        , item.itemDescription, item.supplier.name, item.buyer.name, item.material.name));
                return null;
            });

            setRows([...rowsData]);
        }
    }, [isLoading, items, selectedIndex]);


    return (

        <Paper elevation={20} sx={{ padding: 1 }}>
            <Typography variant="h5"> Item List </Typography><br />
            <Grid container spacing={2} justifyContent="center">
                <Grid xs={12} md={12} lg={12}>
                    <Paper elevation={10} sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                            <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} size="small">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                                sx={{ borderLeft: '1px solid #fff', backgroundColor: '#222f3e', color: '#fff' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, i) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                                {columns.map((column, columnIndex) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell 
                                                            key={column.id} 
                                                            align={column.align} 
                                                            sx={{ borderLeft: '1px solid grey' }}
                                                            onClick={() => columnIndex === 0 && handleColumnClick(items[i])}>
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
                        <Grid xs={12} md={12} lg={12}>
                            <Box sx={{ mt: 3 }}> </Box>
                            <Stack spacing={2}>
                                <Pagination
                                    count={0}
                                    page={1}
                                    variant="outlined"
                                    shape="rounded"
                                    color="secondary"
                                    renderItem={(item) => (
                                        <PaginationItem
                                            {...item}
                                            component={Button}
                                            onClick={() => { }}
                                        />
                                    )}
                                />
                            </Stack>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Paper>

    )
};

export default ItemTable;
