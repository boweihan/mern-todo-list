import React, { Component } from 'react';
import TodoForm from 'components/molecules/TodoForm';

class TodoCreateForm extends Component {
  createTodo = todo => {
    this.props.createTodo(todo);
  };

  render() {
    return (
      <TodoForm
        handleSubmit={this.createTodo}
        submitText="Add Todo"
        backgroundColor="white"
        showError={this.props.showError}
        hideError={this.props.hideError}
      />
    );
  }
}
export default TodoCreateForm;
