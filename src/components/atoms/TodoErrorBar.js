import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const styles = {
  todoErrorBar: {
    position: 'absolute',
    margin: 20,
    width: '50vw',
    backgroundColor: '#ff8080',
    right: 0,
    bottom: 0,
  },
};

const TodoErrorBar = ({ msg, hideError, className }) => (
  <ReactCSSTransitionGroup
    transitionName="fade"
    transitionAppear={true}
    transitionAppearTimeout={1000}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}
  >
    <AppBar
      style={styles.todoErrorBar}
      title={<span>{msg}</span>}
      iconElementRight={
        <IconButton onClick={hideError}>
          <NavigationClose />
        </IconButton>
      }
      showMenuIconButton={false}
    />
  </ReactCSSTransitionGroup>
);

export default TodoErrorBar;
