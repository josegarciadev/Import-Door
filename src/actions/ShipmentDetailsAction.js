import axios from "axios";

export const SHIPMENTDETAILS_REQUEST='SHIPMENTDETAILS_REQUEST';
export const SHIPMENTDETAILS_SUCCESS='SHIPMENTDETAILS_SUCCESS';
export const SHIPMENTDETAILS_ERROR='SHIPMENTDETAILS_ERROR';

 
export const shipmenDetails_requestAction =()=>{
    return{
        type: SHIPMENTDETAILS_REQUEST,
    }
}

export const shipmenDetails_successAction=(data)=>{
    return{
        type: SHIPMENTDETAILS_SUCCESS,
        payload:data
    }
}
export const shipmenDetails_errorAction =(error)=>{
    return{
        type: SHIPMENTDETAILS_ERROR,
        payload:error
    }
}

export  const get_bill=(value)=>{
    const params = new URLSearchParams(value)
    const url =`${process.env.REACT_APP_API_URL}/auth/v1/bill?` + params;
    return(dispatch)=>{
        dispatch(shipmenDetails_requestAction());
        
        axios.get(url)
            .then(res=>{
                dispatch(shipmenDetails_successAction(res.data))
                
            })
            .catch(error=>{
                dispatch(shipmenDetails_errorAction(error));
            })
    }

}

export default get_bill;
