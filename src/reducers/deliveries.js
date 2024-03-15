import { GET_DELIVERIES_BY_MOLD_ID,ADD_DELIVERY,START_LOADING_HOME,END_LOADING_HOME } from "../constant/actionTypes";

const defaultState = {
    isLoading: false,
    deliveries:[],
    message: null,
}


export default(state = defaultState,action) =>{
    switch(action.type){
        case GET_DELIVERIES_BY_MOLD_ID:
            return {
                ...state,
                deliveries: action.payload,
                message:null,
            }
        case ADD_DELIVERY:
            if(action.payload?.message == 'exceed')
                return {
                    ...state,
                    message: 'exceed',
                }
            else
                return {
                    ...state,
                    message:'good',
                    deliveries :[
                        ...state.deliveries, 
                        action.payload
                    ]
                };
        case START_LOADING_HOME:
            return{
                ...state,
                isLoading:true
            }
        case END_LOADING_HOME:
            return{
                ...state,
                isLoading:false
            }
        default:
            return state;
    }
}