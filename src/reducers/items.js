import { CREATE_ITEM,EDIT_ITEM,GET_ITEMS,START_LOADING_HOME,END_LOADING_HOME } from "../constant/actionTypes";

const defaultState = {
    isLoading: false,
    items:[],
    message: null,
}


export default(state = defaultState,action) =>{
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                message:null,
            }
        case CREATE_ITEM:
            return {
                ...state,
                message:null,
                items :[
                    ...state.items, 
                    action.payload
                ]
            };
        case EDIT_ITEM:
            return {
                ...state,
                message:null,
                items : state.items.map((i)=> i._id === action.payload._id ? action.payload : i)
            };
        case START_LOADING_HOME:
            return{
                ...state,
                message:null,
                isLoading:true
            }
        case END_LOADING_HOME:
            return{
                ...state,
                message:null,
                isLoading:false
            }
        default:
            return state;
    }
}