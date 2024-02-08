import React from 'react';
import Appbar from '../Appbar/Appbar';

import {Grow} from '@mui/material';

const MoldMonitoring = () =>{

  return(
    <>
      <Appbar/>
      <Grow in>
        <div>
            <h1>Mold Monitoring</h1>  
        </div>
      </Grow>
    </>
  )
};

export default MoldMonitoring;

