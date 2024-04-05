import { CREATE_MOLD,GET_MOLDS_BY_ITEM_ID,EDIT_MOLD_WITH_ID,START_LOADING_HOME,END_LOADING_HOME,EXPORT_REPORT,CLEAR_MOLD_STATE } from "../constant/actionTypes";

const defaultState = {
    isLoading: false,
    molds:[],
    exportMolds:[],
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
        case EXPORT_REPORT:
            if(action.payload?.message == 'no itemcode found')
                return {
                    ...state,
                    molds:[],
                    message: 'no itemcode found',
                }
            else if(action.payload?.message == 'no matches found')
                return {
                    ...state,
                    molds:[],
                    message: 'no matches found',
                }
            else if(action.payload?.message == 'export')
                return {
                    ...state,
                    message:'export',
                    exportMolds : action.payload.reportMold
                };
        case CLEAR_MOLD_STATE:
            return{
                ...state,
                exportMolds:[],
                message:null,
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