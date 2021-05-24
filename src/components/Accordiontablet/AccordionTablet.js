import React, { Component } from 'react';
import {Collapse,Row,Col} from 'reactstrap';

import s from './AccordionTablet.module.scss';

class AccordionTablet extends Component {
  state = {

    accordion: [false, false, false,false],
  };

  toggleAccordion(id) {
    const arr = [];
    arr.length = this.state.accordion.length;
    arr.fill(false);
    arr[id] = !this.state.accordion[id];
    this.setState({
      accordion: arr,
    });
  }

  render() {
    return (
      <>
          <div className="card panel mt-lg mb-xs">
            { /* eslint-disable */ }
            <div
              className="card-header panel-header bg-light" role="button"
              onClick={() => { this.toggleAccordion(0); }}
            >
              { /* eslint-enable */ }
              <div className={`${s.textBlack} mb-0`}>
                {/* eslint-disable-next-line */}
                <a className="accordion-toggle" role="button">
                 <h4><b>Containter & Cargo Details</b></h4>
                  <i className={`fa fa-angle-down ${this.state.accordion[0] ? 'expanded' : ''}`} />
                </a>
              </div>
            </div>
            <Collapse className="panel-body mb-1" isOpen={this.state.accordion[0]}>
                <div className=''>
                <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Arrival Date <i className="fa fa-exclamation-circle text-secondary" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>Mar 30, 2018</b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Product Keywords <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>NAILS</b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Product Descriptions <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>NAILS</b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Quantity <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>1071 Carton</b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Weight <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>19740 KG</b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Consignee <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>GLASSON TOOL & SUPPLY  CO.</b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Consignee Address <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>1062 HICKORY HOUSE RD  SANDFORD, NC 27332 US</b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Shipper <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>RAIMUND BECK KG </b>
                    </Col>
                  </Row>
                  <Row className={`m-1`}>
                    <Col sm={3} className='text-light'>
                      Shipper Address <i className="fa fa-exclamation-circle text-light" />
                    </Col>
                    <Col sm={9} className={s.textBlack}>
                      <b>1 RAIMUND-BECK-STRASSE MAUERKIRCHEN, 5270 AT</b>
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
              <div className={`${s.textBlack} mb-0`}>
                {/* eslint-disable-next-line */}
                <a className="accordion-toggle" role="button">
                <h4><b>Notify Party Details</b></h4>
                  <i className={`fa fa-angle-down ${this.state.accordion[1] ? 'expanded' : ''}`} />
                </a>
              </div>
            </div>
            <Collapse className="panel-body" isOpen={this.state.accordion[1]}>
              <p>Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's very controversial point. I think the opposite actually.
              </p>
            </Collapse>
          </div>
         

         
      </>
    );
  }
}

export default AccordionTablet;
