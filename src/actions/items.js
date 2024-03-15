import * as api from '../api';
import { GET_ITEMS,CREATE_ITEM,EDIT_ITEM,START_LOADING_HOME,END_LOADING_HOME } from '../constant/actionTypes';

export const getItems = () => async (dispatch) =>{
    try{
        dispatch({type:START_LOADING_HOME});
        const {data} = await api.getItems();
        dispatch({type: GET_ITEMS,payload:data});
        dispatch({type:END_LOADING_HOME});
    }catch(error){
        console.log(error)
    }
}

export const createItem = (newItem) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING_HOME});
        const { data } = await api.createItem(newItem);

        dispatch({type: CREATE_ITEM, payload: data});

        dispatch({type: END_LOADING_HOME});

    }catch(error){
        console.log(error);
    }
}

export const editItem = (id,editedItem) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING_HOME});
        const { data } = await api.editItem(id,editedItem);

        dispatch({type: EDIT_ITEM, payload: data});

        dispatch({type: END_LOADING_HOME});

    }catch(error){
        console.log(error);
    }
}