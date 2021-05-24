import React, { Component } from 'react'
import Widget from '../../components/Widget';
import {
    Col,
  } from 'reactstrap';

 import  './TabletDashboard.module.scss' 
// Tabla
import ReactTable from 'react-table';
import AccordionTablet from '../Accordiontablet/AccordionTablet';
import ModalExport from '../ModalExport/ModalExport';
import {connect} from 'react-redux'
import fetch_bills from '../../actions/DataImportActions';


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
          ...this.state.params,
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

    /* async getBill(master,house){
      
      if(typeof house === 'undefined'){
        return await axios.get(`http://localhost:8000/auth/v1/bill?master_bol_number=${master}`).then(res=>{

          return res.data
        })
      } else {
          return await axios.get(`http://localhost:8000/auth/v1/bill?master_bol_number=${master}&house_bol_number=${house}`).then(res=>{
       
            return res.data
          })
      }

    } */
    render() {
     
        return (
            <Col xs={12}>
        
            <Widget>
              
               <ReactTable
                data={this.props.DateTable.data}
                pages={this.props.DateTable.page}
                filterable
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
                SubComponent={({original}) => {
                  const master_bol=original.master_bol_number;
                  const house_bol=original.house_bol_number;
                  
                  /* const data =this.getBill(master_bol,house_bol).then(res=>{
                    return res
                  })
                 
                  console.log(data); */
                  
                  return (
                    <div>
                      <h3 className='p-3'>
                        Shipments Details 
                       <ModalExport master={master_bol} house={house_bol} />
                        </h3>
                      <hr></hr>
                      <p className='text-light p-2'>Master Bill of Landing Number: <strong >{original.master_bol_number}</strong> &nbsp;&nbsp;&nbsp; House Bill of Landing Number: <strong>{original.house_bol_number}</strong></p>
                      <AccordionTablet />
                      
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
                    id: 'notify_party',
                    Header: 'Notify Name',
                    width: 150,
                    accessor: row => row.notify_party_name !== null ? row.notify_party_name :'',
                    Filter: cellInfo => ( 
                      <input 
                      onKeyUp ={event => this.filterKeypress(event)}
                       id='notify_party'
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
        )
    }
}

const mapStateToProps= (state)=>{
  return{
      DateTable:state.DataTable
  }
}
const mapsDispatchToProps={
  fetch_bills,

}
export default connect(mapStateToProps,mapsDispatchToProps)(TabletDashboard)
