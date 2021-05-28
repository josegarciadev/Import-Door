import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Badge
  } from 'reactstrap';
  import {connect} from 'react-redux'
import get_bill from '../../actions/ShipmentDetailsAction';
import Accordion from '../Accordiontablet/Accordion';
class ModalExport extends Component {
    state = {
        demo: false,
        verticallyCentered: false,
        large: false,
        small: false,
        launch: false,
      }
      toggle(id) {
        if(typeof this.props.house === 'undefined'){
         
          this.props.get_bill({
            master_bol_number:this.props.master
          }) 
        } else {
          this.props.get_bill({
            master_bol_number:this.props.master,
            house_bol_number:this.props.house
          }) 
           
        } 
        
        this.setState(prevState => ({
          [id]: !prevState[id],
          
        }));
      }
    handleExportPdf(master,house){
     
      if(typeof this.props.house === 'undefined'){
        const info ={
          master_bol_number: master,
          format_export:'pdf'
        }
        const params = new URLSearchParams(info)
        const url =`${process.env.REACT_APP_API_URL}/auth/v1/bill?` + params;
        return window.open(url, '_blank');
      } else {
        const info ={
          master_bol_number: master,
          house_bol_number:house,
          format_export:'pdf'
        }
        const params = new URLSearchParams(info)
        const url =`${process.env.REACT_APP_API_URL}/auth/v1/bill?` + params;
        return window.open(url, '_blank');
        
      }
        
    }

    render() {
        const {demo} = this.state;
        return (
            <>
              <Badge onClick={() => this.toggle('demo')} color={'info'} style={{borderRadius:'1em',fontSize:'0.8em',margin:'1px'}}>
                view
              </Badge>
                {/* <span className="glyphicon glyphicon-search" style={{cursor:'pointer',paddingLeft:'5px'}} onClick={() => this.toggle('demo')}/> */}
                
                <Modal size="lg" isOpen={demo} toggle={() => this.toggle('demo')}>
                <ModalHeader toggle={() => this.toggle('demo')} className='fw-semi-bold'>
                  Shipments Details
                  </ModalHeader>
                <ModalBody className="bg-white">
                
                <Accordion/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleExportPdf(this.props.master,this.props.house)}>PDF</Button>
                    
                </ModalFooter>
                </Modal>
                
            </>
        )
    }
}

const mapStateToProps= (state)=>{
  return{
      ShipmentsDetails:state.ShipmentsDetails
  }
}
const mapsDispatchToProps={
  get_bill

}

export default connect(mapStateToProps,mapsDispatchToProps)(ModalExport)