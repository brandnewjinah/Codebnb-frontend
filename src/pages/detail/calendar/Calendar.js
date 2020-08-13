import React, { Component, useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import moment from "moment";
import "react-dates/initialize";
import "../../detail/reactdate.css";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController,
} from "react-dates";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    };
  }

  onClickDate = ({ startDate, endDate }) => {
    console.log(startDate);
    this.setState({
      startDate: startDate,
      endDate: endDate,
    });
  };

  render() {
    // console.log("start date :", this.state.startDate);
    // console.log("end date :", this.state.endDate);

    return (
      <>
        <div className="Calendar>">
          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            onDatesChange={({ startDate, endDate }) => console.log(startDate)} // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={(focusedInput) => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            initialVisibleMonth={() => moment().add(2, "M")} // PropTypes.func or null,
            numberOfMonths={2}
          />
        </div>
      </>
    );
  }
}

export default Calendar;
