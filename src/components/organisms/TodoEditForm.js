import React, { Component } from 'react';
import TodoForm from 'components/molecules/TodoForm';
import ContentClear from 'material-ui/svg-icons/content/clear';

class TodoEditForm extends Component {
  updateTodo = async todo => {
    await this.props.updateTodo(todo);
    this.props.closeEditDialog();
  };

  render() {
    return (
      <div>
        <ContentClear
          onClick={this.props.closeEditDialog}
          style={{
            display: 'block',
            marginLeft: 'auto',
            cursor: 'pointer',
            marginBottom: 10,
          }}
        />
        <TodoForm
          todo={this.props.todo}
          handleSubmit={this.updateTodo}
          submitText="Update Todo"
          backgroundColor="#f2f2f2"
        />
      </div>
    );
  }
}
export default TodoEditForm;
