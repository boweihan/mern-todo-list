import React, { Component } from 'react';
import api from 'services/api';
import _ from 'underscore';

import TodoList from 'components/molecules/TodoList';
import TodoCreateForm from 'components/organisms/TodoCreateForm';
import TodoEditForm from 'components/organisms/TodoEditForm';
import TodoFilter from 'components/molecules/TodoFilter';
import Dialog from 'material-ui/Dialog';

const styles = {
  home__container: {
    backgroundColor: '#f2f2f2',
    padding: '25px 0',
  },
  home__container__lower: {
    height: 'calc(100vh - 308px)',
    overflow: 'scroll',
    margin: '0 15%',
    border: '5px solid white',
  },
  home__container__filter: {
    height: 48,
    padding: '0 15%',
  },
  home__container__upper: {
    height: 200,
    padding: '0 15%',
  },
  home__container__lower__padding: {
    backgroundColor: 'white',
    padding: 20,
    minHeight: 'calc(100% - 40px)',
  },
};

// this guy is basically a controller
class Home extends Component {
  state = {
    todos: [],
    editing: false,
    editableTodo: null,
  };

  getTodosByStatus = async status => {
    let todos = await api.getTodosByStatus(status);
    this.setState({ todos });
  };

  populateTodos = async () => {
    let todos = await api.getTodos();
    this.setState({ todos });
  };

  createTodo = async todo => {
    let data = await api.createTodo(todo);
    if (data) {
      let createdTodo = data.todo;
      let newState = this.state;
      newState.todos.push(createdTodo);
      this.setState(newState);
    }
  };

  deleteTodo = async id => {
    let data = await api.deleteTodo(id);
    if (data) {
      let newState = this.state;
      newState.todos = _.without(
        newState.todos,
        _.findWhere(newState.todos, {
          _id: id,
        }),
      );
      this.setState(newState);
    }
  };

  updateTodo = async todo => {
    let data = await api.updateTodo(todo);
    if (data) {
      let updatedTodo = data.todo;
      let newState = this.state;
      newState.todos = _.without(
        newState.todos,
        _.findWhere(newState.todos, {
          _id: todo._id,
        }),
      );
      newState.todos.push(updatedTodo);
      this.setState(newState);
    }
  };

  openEditDialog = todo => {
    this.setState({ editing: true, editableTodo: todo });
  };

  closeEditDialog = todo => {
    this.setState({ editing: false, editableTodo: null });
  };

  componentDidMount() {
    this.populateTodos();
    // polling!! poor man's websockets :) - don't actually use this it sucks
    // setInterval(this.populateTodos, constants.pollInterval);
  }

  render() {
    return (
      <div style={styles.home__container}>
        {/* CREATE FORM VIEW */}
        <div style={styles.home__container__upper}>
          <TodoCreateForm createTodo={this.createTodo} />
        </div>

        {/* FILTER VIEW */}
        <div style={styles.home__container__filter}>
          <TodoFilter getTodosByStatus={this.getTodosByStatus} />
        </div>

        {/* LIST VIEW */}
        <div style={styles.home__container__lower}>
          <div style={styles.home__container__lower__padding}>
            <TodoList
              todos={this.state.todos}
              deleteTodo={this.deleteTodo}
              openEditDialog={this.openEditDialog}
            />
          </div>
        </div>

        {/* MODAL */}
        <Dialog
          modal={true}
          open={this.state.editing}
          onRequestClose={this.closeEditDialog}
        >
          <TodoEditForm
            closeEditDialog={this.closeEditDialog}
            updateTodo={this.updateTodo}
            todo={this.state.editableTodo}
          />
        </Dialog>
      </div>
    );
  }
}

export default Home;
