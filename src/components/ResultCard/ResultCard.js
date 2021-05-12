import React, { Component } from 'react'
import Widget from '../../components/Widget';
import {
    Row,
    Col,
  } from 'reactstrap';

 import s from './ResultCard.module.scss' 
export default class ResultCard extends Component {

    constructor(props){
        super(props);
        
    }

    render() {
        return (
            <Col xl={3} md={6} xs={12} style={{padding: '5px'}} className={`${s.col}`}>
            <Widget className={s.widget}>
              <div className="clearfix">
                <Row className="flex-nowrap">
                  <Col xs={3}>
                    <span className="widget-icon">
                      <i className={this.props.ico} />
                    </span>
                  </Col>
                  <Col xs="9">
                    <h6 className="m-0">{this.props.title}</h6>
                    <p className="h2 m-0 fw-normal">{this.props.descriptionTitle}</p>
                  </Col>
                </Row>
                <Row className="flex-nowrap">
                  <Col xs={6}>
                    <h6 className="m-0">{this.props.subtitle1}</h6>
                    <p className="value5">{this.props.description1}</p>
                  </Col>
                  <Col xs="6">
                    <h6 className="m-0">{this.props.subtitle2}</h6>
                    <p className="value5">{this.props.description2}</p>
                  </Col>
                </Row>
              </div>
            </Widget>
            </Col>
        )
    }
}
