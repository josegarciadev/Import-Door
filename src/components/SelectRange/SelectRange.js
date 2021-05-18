import React from 'react';
import moment from 'moment';
import Helmet from 'react-helmet';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import {connect} from 'react-redux'
import { date_endAction,date_initAction, fetch_bills } from '../../actions/DataImportActions';


class SelectRange extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    let date = moment(from);
    this.props.date_initAction(date.format("YYYY-MM-DD"));

    this.props.fetch_bills({
      page:this.props.DateTable.page,
      page_number_records:this.props.DateTable.page_number_records,
      date_init:date.format("YYYY-MM-DD"),
      date_end:this.props.DateTable.date_end,
    })
  }

  handleToChange(to) {
    let date = moment(to);

    this.props.date_endAction(date.format("YYYY-MM-DD"));

    this.props.fetch_bills({
      page:this.props.DateTable.page,
      page_number_records:this.props.DateTable.page_number_records,
      date_init:this.props.DateTable.date_init,
      date_end:date.format("YYYY-MM-DD")
    })
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={this.props.DateTable.date_init}
          inputProps={{ style: { width: 100,border:'none',background:'rgba(47, 0, 255, 0.02)' } }}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 1,
            onDayClick: () => this.to.getInput().focus(),
          }}
          onDayChange={this.handleFromChange}
        />{' '} 
        - {' '}
        <span className="InputFromTo-to ">
          <DayPickerInput
            inputProps={{ style: { width: 100,border:'none',background:'rgba(47, 0, 255, 0.04)' } }}
            ref={el => (this.to = el)}
            value={this.props.DateTable.date_end}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
        <i className="fa fa-calendar" />
        <Helmet>
          <style>{`
  .InputFromTo{
    background:rgba(0, 4, 255, 0.115);
    border-radius:0.5em;
    border:1px solid rgba(0, 4, 255, 0.753);
    margin-right:20px;
    padding:5px;
  }
  .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .InputFromTo .DayPicker-Day {
    border-radius: 0 !important;
  }
  
  .InputFromTo .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .InputFromTo .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
  .InputFromTo .DayPickerInput-Overlay {
    width: 235px;
  }
  .InputFromTo-to .DayPickerInput-Overlay {
    margin-left: -100px;
  }
  
  
`}</style>
        </Helmet>
      </div>
    );
  }
}

const mapStateToProps= (state)=>{
  return{
    DateTable:state.DataTable
  }
}
const mapsDispatchToProps={
  date_initAction,
  date_endAction,
  fetch_bills
}

export default connect(mapStateToProps,mapsDispatchToProps)(SelectRange)
