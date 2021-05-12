import React, { Component } from 'react'
import Widget from '../../components/Widget';
import {
    Col,
    Button,
    Row
  } from 'reactstrap';

 import s from './TabletDashboard.module.scss' 
// Tabla
import ReactTable from 'react-table';
import { reactTableData, reactBootstrapTableData } from '../../pages/tables/dynamic/data';
import AccordionTablet from '../Accordiontablet/AccordionTablet';

// Accordion table


export default class TabletDashboard extends Component {
    constructor(props){
        super(props); 
        this.state={
            reactTable: reactTableData(),
            reactBootstrapTable: reactBootstrapTableData(),
        }
    }
    render() {
        return (
            <Col xs={12}>
            <Widget  collapse close>
              <ReactTable
                data={this.state.reactTable}
                filterable
                SubComponent={({original}) => {
                  return (
                    <div>
                      <h2 className='p-3'>Shipments Details </h2>
                      <hr></hr>
                      <p className='text-light p-2'>Master Bill of Landing Number: <strong className={s.textBlack}>"Prueba"</strong> &nbsp;&nbsp;&nbsp; House Bill of Landing Number: <strong className={s.textBlack}>"Probando 2"</strong></p>
                      <AccordionTablet />
                      <Row>
                          <Col xs={12}>
                          <div className={`text-right pr-3 pb-1 m-2`}>
                          <Button className={`${s.buttonTable}`} color="primary">CSV</Button>
                          <Button className={`${s.buttonTable}`} color="info">EXCEL</Button>
                          <Button className={`${s.buttonTable}`} color="success">PDF</Button>

                          </div>
                          </Col>
                          
                      </Row>
                    </div>
                  )
                }}
                columns={[
                  {
                    accessor: 'id',
                    expander:true,
                    //maxWidth:50
                  },
                  {
                    Header: 'Arrival Date ',
                    accessor:`name`,
                    id:'name'
                    
                  },
                  {
                    Header: 'Port of Lading ',
                    accessor: 'position',
                  },
                  {
                    Header: 'Supplier Name ',
                    accessor: 'office',
                  },
                  {
                    Header: 'Description',
                    accessor: 'ext',
                  },
                  {
                    Header: 'Importer Name ',
                    accessor: 'startDate',
                  },
                  {
                    Header: 'Notify Name ',
                    accessor: 'salary',
                  },
                  {
                    Header: 'Port of Unlading',
                    accessor: 'salary',
                  },
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </Widget>
            </Col>
        )
    }
}
