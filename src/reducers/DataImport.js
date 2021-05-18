import { DATE_END, DATE_INIT, FECTH_BILLS_ERROR, FECTH_BILLS_REQUEST, FECTH_BILLS_SUCCESS } from "../actions/DataImportActions";

const initialState={
    loading:false,
    data:[],
    error:'',
    date_init:'2020-01-01',
    date_end:'2020-01-31',
    page_number_records:10,
    page:1
}

const DataTable=(state=initialState,action)=>{
    switch(action.type){
        case DATE_INIT:
            return{
                ...state,
                date_init: action.payload
            }
        
        case DATE_END:
            return{
                ...state,
                date_end: action.payload
            }

        case FECTH_BILLS_REQUEST: 
            return{
                ...state,
                loading:true
            }

        case FECTH_BILLS_SUCCESS: 
            return{
                ...state,
                loading:false,
                data: action.payload,
                error:''
            }
        case FECTH_BILLS_ERROR: 
            return{
                ...state,
                loading:false,
                data: [],
                error: action.payload
            }
        default: return state;
    }
}

export default DataTable;