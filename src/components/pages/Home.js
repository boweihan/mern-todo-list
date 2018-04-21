import React, { Component } from 'react';
import api from 'services/api';
import Dialog from 'material-ui/Dialog';
import Util from 'services/util';
import _ from 'underscore';

import TodoList from 'components/molecules/TodoList';
import TodoCreateForm from 'components/organisms/TodoCreateForm';
import TodoEditForm from 'components/organisms/TodoEditForm';
import TodoFilter from 'components/molecules/TodoFilter';
import TodoSideNav from 'components/molecules/TodoSideNav';
import TodoCalendar from 'components/organisms/TodoCalendar';

const styles = {
  home__container: {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'row',
  },
  home__container__lower: {
    height: 'calc(100vh - 326px)',
    overflow: 'scroll',
    margin: '0 10%',
    border: '5px solid white',
  },
  home__container__left: {
    backgroundColor: '#333333',
    width: 100,
  },
  home__container__right: {
    padding: '25px 0',
    flex: 1,
  },
  home__container__filter: {
    maxHeight: 96,
    height: 96,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 10vw',
  },
  home__container__upper: {
    height: 170,
    padding: '0 10%',
  },
  home__container__lower__padding: {
    backgroundColor: 'white',
    padding: 20,
    minHeight: 'calc(100% - 40px)',
  },
  home__container__calendar: {
    height: 'calc(80vh - 50px)',
    margin: '10vh',
  },
};

// this guy is basically a controller
class Home extends Component {
  state = {
    todos: [],
    editing: false,
    editableTodo: null,
    calendar: false,
  };

  showCalendar = async calendar => {
    await this.populateTodos(); // refresh on nav
    this.setState({ calendar });
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
      newState.todos = Util.sortTodosByDate(newState.todos);
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
      newState.todos = Util.sortTodosByDate(newState.todos);
      this.setState(newState);
    }
  };

  getTodosByStatus = async status => {
    let todos = await api.getTodosByStatus(status);
    this.setState({ todos });
  };

  getTodosByTitle = async title => {
    let todos = await api.getTodosByTitle(title);
    this.setState({ todos });
  };

  getTodosByStatusAndTitle = async (status, title) => {
    let todos = await api.getTodosByStatusAndTitle(status, title);
    this.setState({ todos });
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
        <div style={styles.home__container__left}>
          <TodoSideNav
            calendar={this.state.calendar}
            showCalendar={this.showCalendar}
          />
        </div>
        <div style={styles.home__container__right}>
          {this.state.calendar ? (
            <div style={styles.home__container__calendar}>
              <TodoCalendar todos={this.state.todos} />
            </div>
          ) : (
            <div>
              {/* CREATE FORM VIEW */}
              <div style={styles.home__container__upper}>
                <TodoCreateForm createTodo={this.createTodo} />
              </div>

              {/* FILTER AND SEARCH VIEW */}
              <div style={styles.home__container__filter}>
                <TodoFilter
                  getTodosByStatus={this.getTodosByStatus}
                  populateTodos={this.populateTodos}
                  getTodosByTitle={this.getTodosByTitle}
                  getTodosByStatusAndTitle={this.getTodosByStatusAndTitle}
                />
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
            </div>
          )}
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
