import { SHIPMENTDETAILS_ERROR, SHIPMENTDETAILS_SUCCESS, SHIPMENTDETAILS_REQUEST } from "../actions/ShipmentDetailsAction"


const initialState={
    loading:false,
    details:[],
    error:'',

}

const ShipmentsDetails=(state=initialState,action)=>{
    switch(action.type){
       
        case SHIPMENTDETAILS_REQUEST: 
            return{
                ...state,
                loading:true
            }

        case SHIPMENTDETAILS_SUCCESS: 
            return{
                loading:false,
                details: action.payload,
                error:'',
            }
        case SHIPMENTDETAILS_ERROR: 
            return{
                ...state,
                loading:false,
                details: [],
                error: action.payload
            }
        default: return state;
    }
}

export default ShipmentsDetails;