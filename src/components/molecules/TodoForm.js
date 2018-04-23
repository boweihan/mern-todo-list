import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import StatusEnum from 'constants/statusEnum';
import Util from 'services/util';

const styles = {
  todoForm__input__small: {
    width: 'calc(50% - 30px)',
    margin: 5,
    padding: '0 10px',
  },
  todoForm__input__extraSmall: {
    width: 'calc(25% - 30px)',
    display: 'inline-block',
    margin: 5,
    padding: '0 10px',
  },
  todoForm__datePicker: {
    width: 'calc(25% - 30px)',
    display: 'inline-block',
    margin: 5,
    padding: '0 10px',
  },
  todoForm__dropDown: {
    width: 'calc(50% - 20px)',
    display: 'inline-block',
    margin: 5,
    padding: '0',
    height: 44,
  },
  todoForm__input__large: {
    width: 'calc(75% - 30px)',
    margin: 5,
    padding: '0 10px',
  },
  todoForm__submit: {
    width: 'calc(100% - 10px)',
    margin: 5,
  },
  todoForm__status__label: {
    border: 'none',
    height: '2em',
    lineHeight: '3em',
    overflow: 'show',
  },
  todoForm__submit__overlay: {
    backgroundColor: '#333333',
  },
};

class TodoForm extends Component {
  static getDefaultState() {
    return {
      title: '',
      description: '',
      status: 'NOTSTARTED',
      dueDate: new Date().getTime(),
      _id: null,
    };
  }

  constructor(props) {
    super(props);
    if (props.todo) {
      this.state = {};
      this.state.title = props.todo.title;
      this.state.description = props.todo.description;
      this.state.status = props.todo.status;
      this.state.dueDate = parseInt(props.todo.dueDate, 10); // returns from server as string
      this.state._id = props.todo._id;
    } else {
      this.state = TodoForm.getDefaultState();
    }
  }

  handleChange = e => {
    let prop = e.target.name;
    let newState = this.state;
    newState[prop] = e.target.value;
    this.setState(newState);
  };

  handleStatusChange = (e, index, value) => {
    let newState = this.state;
    newState.status = value;
    this.setState(newState);
  };

  handleDateChange = (e, date) => {
    let newState = this.state;
    newState.dueDate = date.getTime();
    this.setState(newState);
  };

  validateInput = () => {
    let title = this.state.title && this.state.title.trim();
    let status = this.state.status;
    let dueDate = this.state.dueDate;

    // let's just show one error at a time for now
    if (!title) {
      this.props.showError('You must give a Todo a proper title!');
    } else if (!status) {
      this.props.showError('You must select a status!');
    } else if (!dueDate) {
      this.props.showError('Todos must have a due date!');
    }

    return title && status && dueDate;
  };

  handleSubmit = e => {
    this.props.hideError();
    e.preventDefault();
    if (this.validateInput()) {
      this.props.handleSubmit(this.state);
      this.setState(TodoForm.getDefaultState());
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          type="text"
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          style={{
            ...styles.todoForm__input__small,
            backgroundColor: this.props.backgroundColor,
          }}
          underlineShow={false}
        />
        <DropDownMenu
          name="status"
          placeholder="Status"
          value={this.state.status || 'NOTSTARTED'}
          onChange={this.handleStatusChange}
          style={{
            ...styles.todoForm__dropDown,
            border: '5px solid ' + Util.getColorForStatus(this.state.status),
            backgroundColor: this.props.backgroundColor,
          }}
          labelStyle={styles.todoForm__status__label}
          iconStyle={{ display: 'none' }}
        >
          <MenuItem value="NOTSTARTED" primaryText={StatusEnum['NOTSTARTED']} />
          <MenuItem value="INPROGRESS" primaryText={StatusEnum['INPROGRESS']} />
          <MenuItem value="COMPLETE" primaryText={StatusEnum['COMPLETE']} />
        </DropDownMenu>
        <TextField
          type="text"
          placeholder="Description"
          name="description"
          fullWidth={true}
          value={this.state.description}
          onChange={this.handleChange}
          style={{
            ...styles.todoForm__input__large,
            backgroundColor: this.props.backgroundColor,
          }}
          underlineShow={false}
        />
        <DatePicker
          name="dueDate"
          placeholder="Due Date"
          onChange={this.handleDateChange}
          value={this.state.dueDate ? new Date(this.state.dueDate) : new Date()}
          underlineShow={false}
          style={{
            ...styles.todoForm__datePicker,
            backgroundColor: this.props.backgroundColor,
          }}
          textFieldStyle={{ width: '100%' }}
        />
        <br />
        <RaisedButton
          type="submit"
          label={this.props.submitText}
          secondary={true}
          style={styles.todoForm__submit}
          overlayStyle={styles.todoForm__submit__overlay}
          icon={<ContentAdd />}
        />
      </form>
    );
  }
}
export default TodoForm;
