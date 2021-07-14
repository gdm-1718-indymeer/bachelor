import React from "react";
import {addDays, addMonths, subMonths,isSameMonth, isSameDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, format, parse } from 'date-fns'


class Week extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(currentMonth);
    const endDate = endOfWeek(currentMonth);

    const dateFormat = "EE";

    const dayFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell pill ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay))}
          >
            <div className='wrapper'>
              <div className="col number" key={i}>
                {format(addDays(startDate, i), dayFormat)}
              </div>
              <span className="day">{formattedDate}</span>
            </div>

          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row week__view" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };


  render() {
    return (
      <div className="week">
        {this.renderCells()}
      </div>
    );
  }
}

export default Week;