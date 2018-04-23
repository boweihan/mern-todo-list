import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ActionList from 'material-ui/svg-icons/action/list';
import ActionEvent from 'material-ui/svg-icons/action/event';

const styles = {
  todoSideNav__button__list: {
    position: 'absolute',
    margin: 10,
    marginTop: 40,
    height: 40,
  },
  todoSideNav__button__calendar: {
    position: 'absolute',
    margin: 10,
    marginTop: 100,
    height: 40,
  },
  todoSideNav__button__list__overlay: {
    backgroundColor: '#ff4d4d',
  },
  todoSideNav__button__calendar__overlay: {
    backgroundColor: '#79D7E5',
  },
};

class TodoSideNav extends Component {
  render() {
    return (
      <div>
        <RaisedButton
          label="Todo List"
          style={{
            ...styles.todoSideNav__button__list,
            transform: this.props.calendar ? 'inherit' : 'scale(1.15)',
            transformOrigin: this.props.calendar ? 'inherit' : 'left center',
          }}
          onClick={() => this.props.showCalendar(false)}
          overlayStyle={styles.todoSideNav__button__list__overlay}
          icon={<ActionList />}
        />
        <RaisedButton
          label="Calendar"
          style={{
            ...styles.todoSideNav__button__calendar,
            transform: this.props.calendar ? 'scale(1.15)' : 'inherit',
            transformOrigin: this.props.calendar ? 'left center' : 'inherit',
          }}
          onClick={() => this.props.showCalendar(true)}
          overlayStyle={styles.todoSideNav__button__calendar__overlay}
          icon={<ActionEvent />}
        />
      </div>
    );
  }
}
export default TodoSideNav;
