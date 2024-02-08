import React from 'react';
import Appbar from '../Appbar/Appbar';
import AddItem from './AddItem/AddItem';
import ItemTable from './ItemTable/ItemTable';

import {Grow} from '@mui/material';

const MoldDetails = () =>{

  return(
    <>
      <Appbar/>
      <div>
        <AddItem/>
        <ItemTable/>
      </div>
    </>
  )
};

export default MoldDetails;

