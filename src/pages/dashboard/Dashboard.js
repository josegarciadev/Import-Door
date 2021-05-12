import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import Widget from '../../components/Widget';
import ResultSearch from '../../components/ResultSearch/ResultSearch';
import ResultCard from '../../components/ResultCard/ResultCard';
import TopCard from '../../components/TopCard/TopCard';
import TabletDashboard from '../../components/TabletDashboard/TabletDashboard';
import TaskContainer from '../analytics/components/TaskContainer/TaskContainer';

import mock from '../analytics/mock';

import { connect } from 'react-redux';
// Charts
import ApexChart from 'react-apexcharts';
import {chartData} from '../charts/mock';

import HighchartsReact from 'highcharts-react-official'
import s from './Dashboard.module.scss';
import { receiveDataRequest } from '../../actions/analytics';




//



class Dashboard extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      graph: null,
      accordionState:false,
      cd: chartData,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    revenue: PropTypes.any,
};
  static defaultProps = {
    revenue: [],
   
};


  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  // Donuts function
  donut = () => {
    let series = [
      {
        name: 'Revenue',
        data: this.props.revenue.map(s => {
          return {
            name: s.label,
            y: s.data
          }
        })
      }
    ];
    return {
      chart: {
        type: 'pie',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0)',
      },
      credits: {
        enabled: false
      },
      title: false,
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false
          },
          borderWidth: 0,
          showInLegend: true,
          innerSize: 60,
          size: 130,
          states: {
            hover: {
              halo: {
                size: 1
              }
            }
          }
        }
      },
      colors: ['#FD5F00', '#005792', '#1A86D0'],
      legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemStyle: {
          color: '#788898',
          fontWeight: 400,
        },
        itemHoverStyle: {
          color: "#cccccc"
        },
        itemMarginBottom: 5,
        symbolRadius: 0
      },
      exporting: {
        enabled: false
      },
      series
    };
  }
  componentDidMount() {
    this.props.dispatch(receiveDataRequest());
  }
  render() {
    const { cd} = this.state;
    const {isReceiving } = this.props;
    return ( 
      <div className={s.root}>
          <Row noGutters>          
              <ResultSearch />
          </Row>

        <Row className={`pt-0`} noGutters>
            <ResultCard 
            ico='fi flaticon-like text-primary'
            title='SHIPMENTS'
            descriptionTitle='11,885'
            subtitle1='Registrations' 
            description1='+830'
            subtitle2='Bounce Rate' 
            description2='4.5%' 
            />
            <ResultCard 
            ico='fi flaticon-magic-wand text-danger'
            title='GROSS WEIGHT'
            descriptionTitle='4,332'
            subtitle1='New Visitors' 
            description1='20.1%'
            subtitle2='Bounce Rate' 
            description2='2.3%' 
            />
            <ResultCard 
            ico='fi flaticon-shuffle text-info'
            title='SUPPLIER'
            descriptionTitle='4,332'
            subtitle1='Basic' 
            description1='3,692'
            subtitle2='Advanced' 
            description2='1,441' 
            />
            <ResultCard 
            ico='fi flaticon-diamond text-success'
            title='IMPORTER'
            descriptionTitle='$7,448'
            subtitle1='Last Month' 
            description1='$83,541'
            subtitle2='Last Week' 
            description2='$17,926' 
            />
        </Row>
   
      <Row noGutters className={s.rowMargin}>
         <Col xl={6} md={12} sm={12} xs={12} style={{padding: '5px'}}>
          <Widget
                title={<h5>SHIPMENTS <span className='fw-semi-bold'>BY MONTH</span></h5>}
                className={s.widget}
            >
              <ApexChart 
                className="sparkline-chart" 
                height={260} 
                series={cd.apex.column.series}
                options={cd.apex.column.options}
                type={"bar"}
              />
            </Widget>
         </Col>
         <Col xs={12} xl={3} sm={6} md={6} style={{padding: '5px'}} className={s.widget}>
                <div className="pb-xlg h-100">
                  <Widget
                    className={`mb-0 h-100 ${s.widget}`}
                    bodyClass="mt"
                    fetchingData={isReceiving}
                    title={<h5>HS CODES </h5>}
                  >
                    <HighchartsReact options={this.donut()} />
                  </Widget>
                </div>
              </Col>
              <Col xs={12} md={6} sm={6} xl={3} className={`${s.widget} ${s.taskContainer}`} style={{padding: '5px'}}>
                <TaskContainer data={mock.tasks} className={s.widget}/>
              </Col>
       </Row>
     
            
    <Row noGutters>
        <TopCard
              title='PORT LADING'
              subtitle1='CPU'
              descp1='60% / 37°C / 3.3 Ghz'
              subtitle2='Mem'
              descp2='29% / 4GB (16 GB)'
              subtitle3='LAN'
              descp3='6 Mb/s'
              subtitle4='Access'
              descp4='17 Mb/s'
              subtitle5='Shipments'
              descp5='17 Mb/s'
         />
         <TopCard
              title='PORT UNLADING'
              subtitle1='CPU'
              descp1='60% / 37°C / 3.3 Ghz'
              subtitle2='Mem'
              descp2='29% / 4GB (16 GB)'
              subtitle3='LAN'
              descp3='6 Mb/s'
              subtitle4='Access'
              descp4='17 Mb/s'
              subtitle5='Shipments'
              descp5='17 Mb/s'
         />
         <TopCard
              title='SUPPLIER'
              subtitle1='CPU'
              descp1='60% / 37°C / 3.3 Ghz'
              subtitle2='Mem'
              descp2='29% / 4GB (16 GB)'
              subtitle3='LAN'
              descp3='6 Mb/s'
              subtitle4='Access'
              descp4='17 Mb/s'
              subtitle5='Shipments'
              descp5='17 Mb/s'
         />
        <TopCard
              title='IMPORTER'
              subtitle1='CPU'
              descp1='60% / 37°C / 3.3 Ghz'
              subtitle2='Mem'
              descp2='29% / 4GB (16 GB)'
              subtitle3='LAN'
              descp3='6 Mb/s'
              subtitle4='Access'
              descp4='17 Mb/s'
              subtitle5='Shipments'
              descp5='17 Mb/s'
         />
       </Row>
     
        <Row>
          <Col xs={12}>
          <div className={`text-right pr-3 pb-1`}>
          <Button className={`${s.buttonTable}`} color="primary">CSV</Button>
          <Button className={`${s.buttonTable}`} color="info">EXCEL</Button>
          <Button className={`${s.buttonTable}`} color="success">PDF</Button>

          </div>
          </Col>
          
          </Row>
         <Row>
            <TabletDashboard />
         </Row>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
      visits: state.analytics.visits,
      isReceiving: state.analytics.isReceiving,
      performance: state.analytics.performance,
      revenue: state.analytics.revenue,
      server: state.analytics.server,
      mainChart: state.analytics.mainChart,
  }
}
export default connect(mapStateToProps)(Dashboard);
//export default (Analytics);
