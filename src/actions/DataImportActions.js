import axios from "axios";

export const FECTH_BILLS_REQUEST='FECTH_BILLS_REQUEST';
export const FECTH_BILLS_SUCCESS='FECTH_BILLS_SUCCESS';
export const FECTH_BILLS_ERROR='FECTH_BILLS_ERROR';
export const DATE_INIT='DATA_INIT';
export const DATE_END='DATA_END';

export const date_initAction=(date)=>{
    return{
        type: DATE_INIT,
        payload:date
    }
}
export const date_endAction=(date)=>{
    return{
        type: DATE_END,
        payload:date
    }
}

export const fetch_bills_requestAction =()=>{
    return{
        type: FECTH_BILLS_REQUEST,
    }
}

export const fetch_bills_successAction=(data)=>{
    return{
        type: FECTH_BILLS_SUCCESS,
        payload:data
    }
}
export const fetch_bills_errorAction =(error)=>{
    return{
        type: FECTH_BILLS_ERROR,
        payload:error
    }
}

export  const fetch_bills=(value,json)=>{
    const params = new URLSearchParams(value)
    const url =`http://localhost:8000/auth/v1/bills?` + params;
    return(dispatch)=>{
        dispatch(fetch_bills_requestAction());
        
        axios.post(url,json)
            .then(res=>{
                if(res.data.length>=1){
                    dispatch(fetch_bills_successAction(res.data))
                }else{
                    dispatch(fetch_bills_errorAction('no se encuentra'));
                }
                
            })
            .catch(error=>{
                dispatch(fetch_bills_errorAction(error));
            })
    }

}

export default fetch_bills;