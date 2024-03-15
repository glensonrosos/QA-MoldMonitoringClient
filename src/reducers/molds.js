import { CREATE_MOLD,GET_MOLDS_BY_ITEM_ID,EDIT_MOLD_WITH_ID,START_LOADING_HOME,END_LOADING_HOME } from "../constant/actionTypes";

const defaultState = {
    isLoading: false,
    molds:[],
    message: null,
}


export default(state = defaultState,action) =>{
    switch(action.type){
       
        case GET_MOLDS_BY_ITEM_ID:
            return {
                ...state,
                molds: action.payload,
                message:null,
            }
        case CREATE_MOLD:
            if(action.payload?.message == 'duplicate')
                return {
                    ...state,
                    message: 'duplicate',
                }
            else
                return {
                    ...state,
                    message:'good',
                    molds :[
                        ...state.molds, 
                        action.payload
                    ]
                };
        case EDIT_MOLD_WITH_ID:
            return {
                ...state,
                molds : state.molds.map((m)=> m._id === action.payload._id ? action.payload : m)
            }
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