import React, { Component } from 'react'
import {
    Button,
  } from 'reactstrap';
//Export CSV
import { CSVLink} from "react-csv";

// Export Excel
import ReactExport from "react-export-excel";

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

export class ButtonExcelDetails extends Component {
    
    render() {
        const ExcelFile = ReactExport.ExcelFile;
        const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
        const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
        
        return (
        <ExcelFile 
        element={<Button className={`${s.buttonTable}`} color="info">EXCEL</Button>}
        filename={this.props.Filename}
        >
            <ExcelSheet data={this.props.Data} name="Shipments Details">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Office" value="office"/>
                <ExcelColumn label="Ext" value="ext"/>
                <ExcelColumn label="Position" value="position"/>
                <ExcelColumn label="Salary" value="salary"/>
                <ExcelColumn label="Start Date" value="startDate"/>
            </ExcelSheet>
        </ExcelFile>
        
        )
    }
}
