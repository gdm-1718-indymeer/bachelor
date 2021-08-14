import React, {useState, useEffect} from "react";
import {addDays,isSameMonth, isSameDay, startOfWeek, endOfWeek, startOfMonth, format } from 'date-fns'


const Week = (props) => {
  const [getDate, setDate] = useState({
    currentMonth: new Date(),
    selectedDate: new Date()
  });
  const { currentMonth, selectedDate } = getDate;

  useEffect(() => {
    props.handleSetDate(format(getDate.selectedDate, 'd/M/yyyy'))
  }, [props,getDate.selectedDate ]);


  const onDateClick = (day) => {
    setDate(prevState => ({...prevState, selectedDate: day}))
    props.handleSetDate(format(day, 'd/M/yyyy'))
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(currentMonth);
    const endDate = endOfWeek(currentMonth);

    const dateFormat = "EE";

    const dayFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

        while (day <= endDate) {
          for (let i = 0; i < 14; i++) {
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
                onClick={() => onDateClick(cloneDay)}
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
  
  return (
    <div className="week">
      {renderCells()}
    </div>
  );
}
export default Week;