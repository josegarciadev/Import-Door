import React, { Component } from 'react'
import {Collapse,Row,Col} from 'reactstrap';

import {connect} from 'react-redux'
 class Accordion extends Component {
 

  constructor(props){
    super(props); 
    this.state={
      accordion: [false, false, false,false],
      containers:[],
      notify_party:[]
    }
  
  }
  toggleAccordion(id) {
    const arr = [];
    arr.length = this.state.accordion.length;
    arr.fill(false);
    arr[id] = !this.state.accordion[id];
    this.setState({
      accordion: arr,
    });
  }

  handleExist(data){
    if(data){

      return data
    }else{
      return []
    }
  }

  render() {
      const data = this.props.ShipmentsDetails.details;
      const containers= this.handleExist(data.containers)
      const notify_party=this.handleExist(data.notify_party)

    return (
      <>
      <Row>
        <Col><p className='text-light'>Master Bill of Landing Number: <strong >{data.master_bol_number}</strong></p>
        </Col>
        <Col>
        <p className='text-light'>House Bill of Landing Number: <strong>{data.house_bol_number}</strong></p>
        </Col>
      </Row>

      <div className="card panel mt-lg mb-xs">
        { /* eslint-disable */ }
        <div
          className="card-header panel-header bg-light" role="button"
          onClick={() => { this.toggleAccordion(0); }}
        >
          { /* eslint-enable */ }
          <div >
            {/* eslint-disable-next-line */}
            <a className="accordion-toggle" role="button">
             <b>Primary Details</b>
              <i className={`fa fa-angle-down ${this.state.accordion[0] ? 'expanded' : ''}`} />
            </a>
          </div>
        </div>
        <Collapse className="panel-body mb-1" isOpen={this.state.accordion[0]}>
            <div className=''>
            <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Arrival Date <i className="fa fa-exclamation-circle text-secondary" />
                </Col>
                <Col sm={8}>
                  <b>{data.actual_arrival_date}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Product Keywords <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                {
                    containers.length >=1 && containers[0].loads[0].description_text
                  }
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Product Descriptions <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  {
                    containers.length >=1 && containers[0].loads[0].description_text
                  }
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Quantity <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.manifest_quantity} {data.manifest_unit}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Weight <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.weight} {data.weight_unit}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Consignee <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.consignee_name}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Consignee Address <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.consignee_address}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Shipper <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.shipper_name} </b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Shipper Address <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.shipper_address}</b>
                </Col>
              </Row>
            </div>
        </Collapse>
      </div>


      <div className="card panel mb-xs">
        { /* eslint-disable */ }
        <div
          className="card-header panel-header bg-light" role="button"
          onClick={() => { this.toggleAccordion(1); }}
        >
          { /* eslint-enable */ }
          <div >
            {/* eslint-disable-next-line */}
            <a className="accordion-toggle" role="button">
            <b>Secondary Details</b>
              <i className={`fa fa-angle-down ${this.state.accordion[1] ? 'expanded' : ''}`} />
            </a>
          </div>
        </div>
        <Collapse className="panel-body" isOpen={this.state.accordion[1]}>
        <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Place of Receipt <i className="fa fa-exclamation-circle text-secondary" />
                </Col>
                <Col sm={8} >
                  <b>{data.place_of_receipt}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  US Port of Arrival <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.port_of_unlading_name}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Vessel Name <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.vessel_name}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Vessel Country <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.vessel_country_code}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Foreign Port of Lading <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.foreign_port_of_lading_name}</b>
                </Col>
              </Row>
              <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  Mode of Transportation <i className="fa fa-exclamation-circle text-light" />
                </Col>
                <Col sm={8} >
                  <b>{data.mode_of_transportation}</b>
                </Col>
              </Row>
        </Collapse>
      </div>
     


      <div className="card panel mb-xs">
        { /* eslint-disable */ }
        <div
          className="card-header panel-header bg-light" role="button"
          onClick={() => { this.toggleAccordion(2); }}
        >
          { /* eslint-enable */ }
          <div>
            {/* eslint-disable-next-line */}
            <a className="accordion-toggle" role="button">
            <b>Container & Cargo Details</b>
              <i className={`fa fa-angle-down ${this.state.accordion[2] ? 'expanded' : ''}`} />
            </a>
          </div>
        </div>
        <Collapse className="panel-body" isOpen={this.state.accordion[2]}>
            <Row className={`m-1 mt-4`}>
                <Col sm={4} className='fw-semi-bold'>
                  S No
                </Col>
                <Col sm={4} className='fw-semi-bold'>
                  Container No
                </Col>
                <Col sm={4} className='fw-semi-bold'>
                  Product Description
                </Col>
            </Row>
            <hr className='pb-1'/>
          {
            containers.length >=1 && containers.map(value=>{
              return(
              <div key={value.container_number}>
                
                <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  {value.seal_number_1}
                </Col>
                <Col sm={4} className='text-light'>
                 {value.container_number}
                </Col>
                <Col sm={4} className='text-light'>
                {value.loads ? value.loads[0].description_text:''}
                </Col>
            </Row>
                
              </div>)
            })
          }
          <Row className={`m-1 mt-4`}>
                <Col sm={4} className='fw-semi-bold'>
                  S No
                </Col>
                <Col sm={4} className='fw-semi-bold'>
                  Container No
                </Col>
                <Col sm={4} className='fw-semi-bold'>
                  Marks & Number
                </Col>
            </Row>
            <hr className='pb-1'/>
            {
            containers.length >=1 && containers.map(value=>{
              return(
              <div key={value.seal_number_1}>
                
                <Row className={`m-1`}>
                <Col sm={4} className='text-light'>
                  {value.seal_number_1}
                </Col>
                <Col sm={4} className='text-light'>
                 {value.container_number}
                </Col>
                <Col sm={4} className='text-light'>
                {value.marks_and_numbers}
                </Col>
            </Row>
                
              </div>)
            })
          }
        </Collapse>
      </div>


      <div className="card panel mb-xs">
        { /* eslint-disable */ }
        <div
          className="card-header panel-header bg-light" role="button"
          onClick={() => { this.toggleAccordion(3); }}
        >
          { /* eslint-enable */ }
          <div>
            {/* eslint-disable-next-line */}
            <a className="accordion-toggle" role="button">
            <b>Notify Party Details</b>
              <i className={`fa fa-angle-down ${this.state.accordion[3] ? 'expanded' : ''}`} />
            </a>
          </div>
        </div>
        <Collapse className="panel-body" isOpen={this.state.accordion[3]}>
        <Row className={`m-1 mt-4`}>
                <Col sm={6} className='fw-semi-bold'>
                  Name
                </Col>
                <Col sm={6} className='fw-semi-bold'>
                  Address
                </Col>
            </Row>
            <hr className='pb-1'/>
            {
            notify_party.length ===0 && <div>
                
                <Row className={`m-1`}>
                <Col sm={12} className='text-light'>
                  Not Available
                </Col>
              </Row>
                
              </div>
          }
            {
            notify_party.length >=1 && notify_party.map(value=>{
              return(
              <div key={value.notify_party_name}>
                
                <Row className={`m-1`}>
                <Col sm={6} className='text-light'>
                  {value.notify_party_name}
                </Col>
                <Col sm={6} className='text-light'>
                 {value.notify_party_address}
                </Col>
            </Row>
                
              </div>)
            })
          }
        </Collapse>
      </div>
     
  </>
    )
  }
}
const mapStateToProps= (state)=>{
  return{
      ShipmentsDetails:state.ShipmentsDetails
  }
}

export default connect(mapStateToProps)(Accordion)