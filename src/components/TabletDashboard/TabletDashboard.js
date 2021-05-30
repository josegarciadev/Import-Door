import React, { Component } from 'react'
import Widget from '../../components/Widget';
import {
    Col,
    Row,
  } from 'reactstrap';

 import  './TabletDashboard.module.scss' 
// Tabla
import ReactTable from 'react-table';
import ModalExport from '../ModalExport/ModalExport';
import {connect} from 'react-redux'
import fetch_bills from '../../actions/DataImportActions';

import ButtonExport from '../ButtonExport/ButtonExport';

 class TabletDashboard extends Component {
    constructor(props){
        super(props); 
      
        this.state={
          params:{
            page:this.props.DateTable.page,
            page_number_records:this.props.DateTable.page_number_records,
            date_init:this.props.DateTable.date_init,
            date_end:this.props.DateTable.date_end,
          }
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
  

    filterKeypress(e){

      if(e.target.value.trim().length > 0){

      this.setState({
        params: {
          page:this.props.DateTable.page,
          page_number_records:this.props.DateTable.page_number_records,
          date_init:this.props.DateTable.date_init,
          date_end:this.props.DateTable.date_end,
          [e.target.id]:e.target.value
        }
      })
    }else{
      e.target.value =''
      delete this.state.params[e.target.id]
    }

      if(e.key === 'Enter' || e.keyCode === 13){     

        this.props.fetch_bills(this.state.params)

      }
    }

 
    render() {
          const count=1000;
          const data = this.props.DateTable.data.filter(value => !value.count);
       
        return (
          <>
           <Row>
            <Col xs={12}>
            <div className={`text-right pr-3 pb-1`}>
            <ButtonExport params={this.state.params} value={'CSV'} color={'primary'} format={'csv'}/>
            <ButtonExport params={this.state.params} value={'EXCEL'} color={'info'} format={'excel'}/>
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
          
          <Widget>
            
            <ReactTable
              data={data}
              pages={count}
              page={this.props.DateTable.page}
              filterable
              manual 
              onPageChange={(value)=>{
                this.props.DateTable.page=value;

                this.props.fetch_bills({
                  page:this.props.DateTable.page,
                  page_number_records:this.props.DateTable.page_number_records,
                  date_init:this.props.DateTable.date_init,
                  date_end:this.props.DateTable.date_end,
                })
              }}
              onPageSizeChange={(value)=>{
                this.props.DateTable.page_number_records=value;

                this.props.fetch_bills({
                  page:this.props.DateTable.page,
                  page_number_records:this.props.DateTable.page_number_records,
                  date_init:this.props.DateTable.date_init,
                  date_end:this.props.DateTable.date_end,
                })
              }}
              onSortedChange={(values)=>{
                values.map(value=>{

                  const json=[
                    {
                      field:value.id,
                      order:value.desc===false?'asd':'des'
                    }
                  ];
                  return this.props.fetch_bills({
                    page:this.props.DateTable.page,
                    page_number_records:this.props.DateTable.page_number_records,
                    date_init:this.props.DateTable.date_init,
                    date_end:this.props.DateTable.date_end,
                  },json)

                });
                
              }}
              
              style={{fontSize:'0.8em'}}
              loading={this.props.DateTable.loading}
              columns={[
                
                {
                  Expander:({isExpanded, original,index})=>(
                    
                      
                      <ModalExport 
                      master={original.master_bol_number } 
                      house={original.house_bol_number} 
                      />
                      
                    
                    
                  ),style: {padding:'0px',margin:'0px'},
                  expander:true,
                  maxWidth:100
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'Arrival Date',
                  accessor:`actual_arrival_date`,
                  width: 150,
                  Filter: cellInfo => ( 
                    <input 
                    type="date" 
                    min={this.props.DateTable.date_init} 
                    max={this.props.DateTable.date_end} 
                    onKeyUp ={event => this.filterKeypress(event)} id='actual_arrival_date'
                    style={{width:'100%',fontSize:'0.8em'}}
                    />
                    
                  )
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'Master Bol',
                  accessor: 'master_bol_number',
                  width: 150,
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'House Bol',
                  accessor: 'house_bol_number',
                  width: 150,
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'Country of Origin',
                  width: 150,
                  accessor: 'foreign_port_of_lading_name',
                  Filter: cellInfo => ( // Used to render the filter UI of a filter-enabled column
                    <input 
                    style={{width:'100%'}} 
                    onKeyUp ={event => this.filterKeypress(event)} id='foreign_port_of_lading_name'
                    />
                    // The value passed to onFiltersChange will be the value passed to filter.value of the filterMethod
                  )
                  
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'Supplier Name ',
                  accessor: 'shipper_name',
                  width: 150,
                  Filter: cellInfo => ( 
                    <input 
                    onKeyUp ={event => this.filterKeypress(event)} 
                    id='shipper_name'
                    style={{width:'100%'}}
                    />
                    
                  )
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'Description',
                  accessor: 'description_text',
                  width: 150,
                  Filter: cellInfo => ( 
                    <input 
                    onKeyUp ={event => this.filterKeypress(event)}
                    id='description_text'
                    style={{width:'100%'}}
                    />
                    
                  )
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'Importer Name',
                  accessor: 'consignee_name',
                  width: 150,
                  Filter: cellInfo => ( 
                    <input 
                    onKeyUp ={event => this.filterKeypress(event)}
                    id='consignee_name' 
                    style={{width:'100%'}}
                    />
                    
                  )
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  width: 150,
                  accessor: 'notify_party_name',
                  Filter: cellInfo => ( 
                    <input 
                    onKeyUp ={event => this.filterKeypress(event)}
                    id='notify_party_name'
                    style={{width:'100%'}}
                    />
                    
                  )
                },
                {
                  headerStyle: {fontSize:'1.2em'},
                  Header: 'Port of Arrival',
                  accessor: 'port_of_unlading_name',
                  width: 150,
                  Filter: cellInfo => ( 
                    <input 
                    onKeyUp ={event => this.filterKeypress(event)} 
                    id='port_of_unlading_name'
                    style={{width:'100%'}}
                    />
                    
                  )
                },
              ]}
              defaultPageSize={this.props.DateTable.page_number_records}
              className="-striped -highlight"
            />
          </Widget>
          </Col>
          </Row>
          </>
            
        )
    }
}

const mapStateToProps= (state)=>{
  return{
      DateTable:state.DataTable,
      
  }
}
const mapsDispatchToProps={
  fetch_bills
}
export default connect(mapStateToProps,mapsDispatchToProps)(TabletDashboard)
