import * as api from '../api';
import {CREATE_MOLD,GET_MOLDS_BY_ITEM_ID,EDIT_MOLD_WITH_ID,START_LOADING_HOME,END_LOADING_HOME} from '../constant/actionTypes';

export const createMold = (id,newMold) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING_HOME});
        const { data } = await api.createMold(id,newMold);

        dispatch({type: CREATE_MOLD, payload: data});

        dispatch({type: END_LOADING_HOME});

    }catch(error){
        console.log(error);
    }
}

export const getMoldsByItemId = (id) => async (dispatch) =>{
    try{
        dispatch({type:START_LOADING_HOME});

        const {data} = await api.getMoldsByItemId(id);

        dispatch({type: GET_MOLDS_BY_ITEM_ID,payload:data});

        dispatch({type:END_LOADING_HOME});
    }catch(error){
        console.log(error)
    }
}

export const editMoldWithId = (id,editedMold) => async (dispatch) =>{
    try{
        dispatch({type:START_LOADING_HOME});

        const {data} = await api.editMoldWithId(id,editedMold);

        dispatch({type: EDIT_MOLD_WITH_ID,payload:data});

        dispatch({type:END_LOADING_HOME});
    }catch(error){
        console.log(error)
    }
}

