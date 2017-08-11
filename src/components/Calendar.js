import React from 'react';
import {render} from 'react-dom';

import CalendarHeader from './CalendarHeader';
import CalendarMain from './CalendarMain';

const displayDays = (year) => {
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    daysInMonth[1] = 29;
  }

  let daysInPrevMonth = [].concat(31, daysInMonth.slice(0, 11));

  
  let addDaysFromPreMonth = new Array(12).fill(null).map((item, index) => {
    let weekday = new Date(year, index, 1).getDay();
    if (weekday === 0) {
      return 6; 
    } else {
      return weekday - 1;
    }
  })

  return new Array(12).fill([]).map((month, monthIndex) => {
    let addDays = addDaysFromPreMonth[monthIndex],
      daysCount = daysInMonth[monthIndex],
      daysCountPrev = daysInPrevMonth[monthIndex],
      monthData = [];
    while (addDays--) {
      monthData.unshift(daysCountPrev--);
    }
    for (let i = 1; i <= daysCount; ++i) monthData.push(i);
    for (let i = 1, l = 42 - monthData.length; i <= l; ++i) monthData.push(i);
    return monthData;
  })
}

class Calendar extends React.Component {
  constructor() {
    super();
    let now = new Date();
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate()
    }
  }
  nextMonth() {
    if (this.state.month === 11) {
      this.setState({
        year: ++this.state.year,
        month: 0
      })
    } else {
      this.setState({
        month: ++this.state.month
      })
    }
  }
  prevMonth() {
    if (this.state.month === 0) {
      this.setState({
        year: --this.state.year,
        month: 12
      })
    } else {
      this.setState({
        month: --this.state.month
      })
    }
  }
  render() {
    
    let props = {
      viewData: displayDays(this.state.year)
    }
    return (
      <div className="main">
        <CalendarHeader prevMonth={::this.prevMonth}
          nextMonth={::this.nextMonth}
          year={this.state.year}
          month={this.state.month}
          day={this.state.day}
        />
        <CalendarMain {...props} 
          prevMonth={::this.prevMonth}
          nextMonth={::this.nextMonth}
          year={this.state.year}
          month={this.state.month}
          day={this.state.day}
        />
      </div>
    )
  }
}

window.calendar = render(
  <Calendar/>,
  document.getElementById('calendarContainer')
)