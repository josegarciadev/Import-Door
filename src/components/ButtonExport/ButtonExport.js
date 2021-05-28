import React, { Component } from 'react'
import {
    Button,
} from 'reactstrap';
import s from './ButtonExport.module.scss';


export default class ButtonExport extends Component {

     async handleExport(format,data){
        delete data.page
        delete data.page_number_records
        const info={...data,format}
        const params = new URLSearchParams(info)
        const url =`${process.env.REACT_APP_API_URL}/auth/v1/bills/export?` + params;
        
        console.log('params', info)
        return window.open(url, '_blank');
    }
    
    render() {
      
        return (
        <Button 
        className={`${s.buttonTable}`} 
        onClick={(e)=>this.handleExport(this.props.format,this.props.params)} 
        color={this.props.color}>
            {this.props.value}
            </Button>
        
        )
    }
}
