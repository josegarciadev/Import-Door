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
import {ButtonCsv, ButtonExcelDetails} from '../ButtonExport/ButtonExport';
import ModalExport from '../ModalExport/ModalExport';
import {connect} from 'react-redux'
import fetch_bills from '../../actions/DataImportActions';


// Accordion table


 class TabletDashboard extends Component {
    constructor(props){
        super(props); 
        this.state={
            reactTable: reactTableData(),
            reactBootstrapTable: reactBootstrapTableData(),
        }
    }
   
    componentDidMount() {
      
      
      this.props.fetch_bills({
        page:this.props.DateTable.page,
        page_number_records:this.props.DateTable.page_number_records,
        date_init:this.props.DateTable.date_init,
        date_end:this.props.DateTable.date_end,
      })

    }
   
    render() {
     
        return (
            <Col xs={12}>
        
            <Widget  collapse close>
              
              {this.props.DateTable.data.length >=1 && <ReactTable
                data={this.props.DateTable.data}
                pages={this.props.DateTable.page}
                filterable
                onFilteredChange={(values)=>{
                  
                  console.log(values);
                }}
                
                style={{fontSize:'0.8em'}}
                loading={this.props.DateTable.loading}
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
                          <ButtonCsv 
                          Headers={[
                            { label: "Name", key: "name" },
                            { label: "Office", key: "office" },
                            { label: "Ext", key: "ext" },
                            { label: "Position", key: "position" },
                            { label: "Salary", key: "salary" },
                            { label: "Start Date", key: "startDate" },
                          ]}
                          Data={[original]}
                          Filename={`Shipments-Details-${original.name}.csv`}
                          />
                          <ButtonExcelDetails 
                            Data={[original]}
                            Filename={`Shipments-Details-${original.name}.csv`}
                          />
                          <ModalExport/>
                          </div>
                          </Col>
                          
                      </Row>
                    </div>
                  )
                }}
                columns={[
                  
                  {
                    
                    expander:true,
                    maxWidth:50
                  },
                  {
                    headerStyle: {fontSize:'1.2em'},
                    Header: 'Arrival Date',
                    accessor:`actual_arrival_date`,
                    minWidth:50,
                    maxWidth:110,
              
                  },
                  {
                    headerStyle: {fontSize:'1.2em'},
                    Header: 'Port of Lading',
                    accessor: 'foreign_port_of_lading_name',
                  },
                  {
                    headerStyle: {fontSize:'1.2em'},
                    Header: 'Supplier Name ',
                    accessor: 'shipper_name',
                  },
                  {
                    headerStyle: {fontSize:'1.2em'},
                    Header: 'Description',
                    accessor: 'description_text',
                  },
                  {
                    headerStyle: {fontSize:'1.2em'},
                    Header: 'Importer Name',
                    accessor: 'consignee_name',
                  },
                  {
                    headerStyle: {fontSize:'1.2em'},
                    id: 'notify_party',
                    Header: 'Notify Name',
                    accessor: row => row.notify_party ? row.notify_party[0].notify_party_name :''
                  },
                  {
                    headerStyle: {fontSize:'1.2em'},
                    Header: 'Port of Unlading',
                    accessor: 'port_of_unlading_name',
                  },
                ]}
                defaultPageSize={this.props.DateTable.page_number_records}
                className="-striped -highlight"
              />}
            </Widget>
            </Col>
        )
    }
}

const mapStateToProps= (state)=>{
  return{
      DateTable:state.DataTable
  }
}
const mapsDispatchToProps={
  fetch_bills
}
export default connect(mapStateToProps,mapsDispatchToProps)(TabletDashboard)
