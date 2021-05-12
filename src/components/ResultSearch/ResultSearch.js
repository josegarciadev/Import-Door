import React, { Component } from 'react'
import Widget from '../../components/Widget';
import {
    Row,
    Col,
  } from 'reactstrap';

import s from './ResultSearch.module.scss'
export default class ResultSearch extends Component {
    render() {
        return (
          <Col md={12} style={{padding: '5px'}}>
                <Widget className={s.widget}>
                <Row>
                  <Col> 
                  <h1>Product: Soccer balls</h1>
                  </Col>
                </Row>
                <Row>
                  <Col> 
                  <small>Total imports: 478</small>
                  </Col>
                </Row>
                <Row>
                  <Col> 
                  <small>Total Supplers: 20</small>
                  </Col>
                </Row>
              </Widget>
          
          </Col>
        )
    }
}
