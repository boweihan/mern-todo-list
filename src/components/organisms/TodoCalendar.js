import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

class TodoCalendar extends Component {
  convertTodosToEventObjects = todos => {
    return todos.map(todo => {
      let eventObj = {};
      eventObj.title = todo.title;
      // shortcut: all events are an hour long!
      eventObj.startDate = new Date(parseInt(todo.dueDate, 10) - 3600000);
      eventObj.endDate = new Date(parseInt(todo.dueDate, 10));
      return eventObj;
    });
  };

  render() {
    console.log(this.convertTodosToEventObjects(this.props.todos));
    return (
      <BigCalendar
        views={['month', 'week', 'day']}
        defaultDate={new Date()} // https://github.com/intljusticemission/react-big-calendar/issues/718
        events={this.convertTodosToEventObjects(this.props.todos)}
        startAccessor="startDate"
        endAccessor="endDate"
      />
    );
  }
}
export default TodoCalendar;
