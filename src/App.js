import React,{} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from './components/Login/Login';
import MoldDetails from './components/Home/MoldDetails/MoldDetails';

// datetime
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const App = () =>{

    // const auth = JSON.parse(localStorage.getItem('profile'));
    // console.log(` app ${auth}`);

    return(
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterMoment}>
            <Routes>
                {/* <Route index path="/" element={<Navigate to="/purchase-orders"/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/purchase-orders" element={<Home/>} />
                <Route path="/purchase-orders/search" element={<Home/>} />
                <Route path="/purchase-order-detail/:id" element={<PurchaseOrder/>} />
                <Route path="*" element={<Navigate to="/purchase-orders"/>} /> */}
                <Route index path="/" element={<Navigate to="/mold-details"/>} />
                <Route path="/mold-details" element={<MoldDetails/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
            </LocalizationProvider>
        </BrowserRouter>
    )
}

export default App;