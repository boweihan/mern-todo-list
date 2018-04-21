import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StatusEnum from 'constants/statusEnum';

const styles = {
  todoFilter: {
    textAlign: 'center',
  },
  todoFilter__button: {
    margin: 5,
  },
};

class TodoFilter extends Component {
  state = {
    selected: 'All',
  };

  selectFilter = async filter => {
    await this.props.getTodosByStatus(filter);
    this.setState({ selected: filter });
  };

  render() {
    return (
      <div style={styles.todoFilter}>
        <RaisedButton
          onClick={() => this.selectFilter('All')}
          style={styles.todoFilter__button}
          primary={this.state.selected === 'All'}
          label="All"
        />
        {Object.keys(StatusEnum).map(key => {
          return (
            <RaisedButton
              onClick={() => this.selectFilter(key)}
              style={styles.todoFilter__button}
              primary={this.state.selected === key}
              label={StatusEnum[key]}
            />
          );
        })}
      </div>
    );
  }
}
export default TodoFilter;
