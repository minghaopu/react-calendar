import React from 'react';

export default class CalendarHeader extends React.Component {
  render() {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (
      <div className="calendarHeader">
        <span className="prev control-btn" onClick={this.props.prevMonth} dangerouslySetInnerHTML={{__html: '&lt'}} >
        </span>
        <span className="info">{this.props.year} {month[this.props.month]}
        </span>
        <span className="next control-btn" onClick={this.props.nextMonth} dangerouslySetInnerHTML={{__html: '&gt'}}>
        </span>
      </div>
    )
  }
}