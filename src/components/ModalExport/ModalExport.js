import React, { Component } from 'react'
import {
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Container,
  } from 'reactstrap';

export default class ModalExport extends Component {
    state = {
        demo: false,
        verticallyCentered: false,
        large: false,
        small: false,
        launch: false,
      }
      toggle(id) {
          
        this.setState(prevState => ({
          [id]: !prevState[id],
          
        }));
      }

    render() {
        const {demo} = this.state;
        return (
            <>
                <Button className="mr-sm" color="primary" onClick={() => this.toggle('demo')}>Demo</Button>
                
                <Modal isOpen={demo} toggle={() => this.toggle('demo')}>
                <ModalHeader toggle={() => this.toggle('demo')}>Modal title</ModalHeader>
                <ModalBody className="bg-white">
                    sasasadsads
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
