import React, { Component } from 'react'
import { CSVLink, CSVDownload } from "react-csv";
import s from './ButtonExport.module.scss';

export class ButtonCsv extends Component {
    render() {

        return (
                <CSVLink 
                 data={this.props.Data}
                 headers={this.props.Headers}
                 className={`${s.buttonTable} btn btn-primary`}
                 filename={this.props.Filename}
                 >
                     CSV
                </CSVLink>
        
        )
    }
}

export class ButtonExcel extends Component {
    render() {

        return (
                <>
                
                </>
        
        )
    }
}
