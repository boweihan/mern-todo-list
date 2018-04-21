import React, { Component } from 'react';
import List from 'material-ui/List';
import Todo from 'components/atoms/Todo';

class TodoList extends Component {
  render() {
    let todos = this.props.todos;
    let todoNodes = todos.map(todo => {
      return (
        <Todo
          key={todo._id}
          data={todo}
          deleteTodo={this.props.deleteTodo}
          openEditDialog={this.props.openEditDialog}
        />
      );
    });
    return <List>{todoNodes}</List>;
  }
}
export default TodoList;
