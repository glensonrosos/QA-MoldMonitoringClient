import * as api from '../api';
import { ADD_DELIVERY,GET_DELIVERIES_BY_MOLD_ID,START_LOADING_HOME,END_LOADING_HOME } from '../constant/actionTypes';

export const addDelivery = (id,newDelivery) => async (dispatch) =>{
    try{
        dispatch({type: START_LOADING_HOME});
        const { data } = await api.addDelivery(id,newDelivery);

        dispatch({type: ADD_DELIVERY, payload: data});

        dispatch({type: END_LOADING_HOME});

    }catch(error){
        console.log(error);
    }
}

export const getDeliveriesByMoldId = (id) => async (dispatch) =>{
    try{
        dispatch({type:START_LOADING_HOME});

        const {data} = await api.getDeliveriesByMoldId(id);

        dispatch({type: GET_DELIVERIES_BY_MOLD_ID,payload:data});

        dispatch({type:END_LOADING_HOME});
    }catch(error){
        console.log(error)
    }
}
