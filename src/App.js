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
                <Route index path="/" element={<Navigate to="/mold-details"/>} />   
                <Route path="/login" element={<Login/>} />
                <Route path="/mold-details" element={<MoldDetails/>} />
                <Route path="/mold-details/search" element={<MoldDetails/>} />
                <Route path="*" element={<Navigate to="/mold-details"/>} />
            </Routes>
            </LocalizationProvider>
        </BrowserRouter>
    )
}

export default App;