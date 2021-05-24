import React, { Component } from 'react'
import Widget from '../../components/Widget';
import {
    Col,
    Progress,
  } from 'reactstrap';

 import s from './TopCard.module.scss' 

export default class TopCard extends Component {
 
    render() {
        return (
            <Col xs={12} xl={3} sm={6} md={6} style={{padding: '5px'}}>
                <Widget className={`widget-sm ${s.widget}`} 
                  title={<h6>TOP <span className="fw-semi-bold">{this.props.title} </span></h6>}
                >
                  <div className="clearfix fs-mini">
                    <span className="pull-right m-0 fw-semi-bold">{this.props.subtitle1}</span>
                    <span className="fs-mini">{this.props.descp1}</span>
                  </div>
                  <Progress color="bg-widget-transparent-lighter" className="progress-xs" value={60} />
                  <div className="clearfix fs-mini mt">
                    <span className="pull-right m-0 fw-semi-bold">{this.props.subtitle2}</span>
                    <span className="fs-mini">{this.props.descp2}</span>
                  </div>
                  <Progress color="warning" className="bg-widget-transparent-lighter progress-xs" value={29} />
                  <div className="clearfix fs-mini mt">
                    <span className="pull-right m-0 fw-semi-bold">{this.props.subtitle3}</span>
                    <span className="fs-mini">{this.props.descp3}<i className="fa fa-caret-down" /> &nbsp; 3 Mb/s <i
                      className="fa fa-caret-up"
                    /></span>
                  </div>
                  <Progress color="danger" className="bg-widget-transparent-lighter progress-xs" value={48} />
                  <div className="clearfix fs-mini mt">
                    <span className="pull-right m-0 fw-semi-bold">{this.props.subtitle4}</span>
                    <span className="fs-mini">{this.props.descp4}<i className="fa fa-caret-up" /> &nbsp; (+18%)</span>
                  </div>
                  <Progress color="success" className="bg-widget-transparent-lighter progress-xs" value={64} />
                  <div className="clearfix fs-mini mt">
                    <span className="pull-right m-0 fw-semi-bold">{this.props.subtitle5}</span>
                    <span className="fs-mini">{this.props.descp5}<i className="fa fa-caret-up" /> &nbsp; (+18%)</span>
                  </div>
                  <Progress color="primary" className="bg-widget-transparent-lighter progress-xs" value={64} />
                </Widget>
        </Col>
        )
    }
}
