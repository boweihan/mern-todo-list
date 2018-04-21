import React from 'react';
import ReactDOM from 'react-dom';
import Home from 'components/pages/Home';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import registerServiceWorker from 'registerServiceWorker';

import './index.css';

const muiTheme = getMuiTheme({
  fontFamily: "'Do Hyeon', sans-serif",
  palette: {
    primary1Color: '#333333',
    primary2Color: '#333333',
    pickerHeaderColor: '#333333',
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Home />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
