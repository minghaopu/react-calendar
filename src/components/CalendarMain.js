import React from 'react';

export default class CalendarMain extends React.Component {
  handleDatePick(index, styleNmae) {
    switch(styleNmae) {
      case 'cur':
        let month = this.props.viewData[this.props.month];
        this.props.datePick(month[index]);
        break;
      case 'prev':
        this.props.prevMonth();
        break;
      case 'next':
        this.props.nextMonth()
    }
  }
  render() {
    let today = new Date();
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    let todayDate = today.getDate();
    let month = this.props.viewData[this.props.month],
    rowsInMonth = [],
    index = 0,
    styleOfDays = (() => {
      let i = month.indexOf(1), j = month.indexOf(1, i + 1), arr = new Array(42);
      arr.fill('prev', 0, i);
      arr.fill('cur', i, j);
      arr.fill('next', j);
      return arr;
    })();
    if (this.props.year === todayYear && this.props.month === todayMonth) {
      styleOfDays[todayDate] += ' today';
    }
    month.forEach((day, idx) => {
      if (idx % 7 === 0) {
        rowsInMonth.push(month.slice(idx, idx + 7))
      }
    });
    return (
      <table className="calendarMain">
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {
            rowsInMonth.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {
                    row.map(day => {
                      return (
                        <td className={styleOfDays[index]}
                            onClick={
                              this.handleDatePick.bind(this, index , styleOfDays[index])
                            }
                            key={index++}
                        ><span>{day}</span>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}