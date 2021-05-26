import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
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

    render() {
        const {demo} = this.state;
        return (
            <>
                <span className="glyphicon glyphicon-search" style={{cursor:'pointer',paddingLeft:'5px'}} onClick={() => this.toggle('demo')}/>
                
                <Modal size="lg" isOpen={demo} toggle={() => this.toggle('demo')}>
                <ModalHeader toggle={() => this.toggle('demo')} className='fw-semi-bold'>
                  Shipments Details
                  </ModalHeader>
                <ModalBody className="bg-white">
                
                <Accordion/>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onClick={() => this.toggle('demo')}>Close</Button>
                    <Button color="primary">Save changes</Button>
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