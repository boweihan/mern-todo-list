import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StatusEnum from 'constants/statusEnum';
import SearchBar from 'material-ui-search-bar';

const styles = {
  todoFilter__button: {
    margin: 5,
    marginLeft: 0,
  },
  todoFilter__filter: {
    width: '70%',
    display: 'inline-block',
  },
  todoFilter__search: {
    width: '30%',
    display: 'inline-block',
  },
  todoFilter__search__input: {
    height: 43,
  },
};

class TodoFilter extends Component {
  state = {
    selected: 'All',
    query: '',
  };

  search = async query => {
    if (query) {
      await this.props.getTodosByTitle(query);
    } else {
      await this.props.populateTodos();
    }
    this.setState({ selected: 'All', query });
  };

  selectFilter = async status => {
    if (status !== 'All' && this.state.query) {
      await this.props.getTodosByStatusAndTitle(status, this.state.query);
    } else if (status !== 'All') {
      await this.props.getTodosByStatus(status);
    } else if (this.state.query) {
      await this.props.getTodosByTitle(this.state.query);
    } else {
      await this.props.populateTodos();
    }
    this.setState({ selected: status });
  };

  render() {
    return (
      <div>
        <div style={styles.todoFilter__filter}>
          <RaisedButton
            onClick={() => this.selectFilter('All')}
            style={styles.todoFilter__button}
            primary={this.state.selected === 'All'}
            label="All"
          />
          {Object.keys(StatusEnum).map(key => {
            return (
              <RaisedButton
                key={key}
                onClick={() => this.selectFilter(key)}
                style={styles.todoFilter__button}
                primary={this.state.selected === key}
                label={StatusEnum[key]}
              />
            );
          })}
        </div>
        <div style={styles.todoFilter__search}>
          <SearchBar
            onChange={this.search}
            onRequestSearch={() => {}}
            style={styles.todoFilter__search__input}
          />
        </div>
      </div>
    );
  }
}
export default TodoFilter;
