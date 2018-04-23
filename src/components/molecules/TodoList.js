import React, { Component } from 'react';
import List from 'material-ui/List';
import Todo from 'components/atoms/Todo';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TodoList extends Component {
  render() {
    let todos = this.props.todos || [];
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
    return todoNodes.length > 0 ? (
      <List>
        <ReactCSSTransitionGroup
          transitionName="fadefast"
          transitionAppear={true}
          transitionAppearTimeout={400}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {todoNodes}
        </ReactCSSTransitionGroup>
      </List>
    ) : (
      <h4 style={{ fontStyle: 'italic' }}>
        ...It doesn't look like you have any visible Todos!
      </h4>
    );
  }
}
export default TodoList;
