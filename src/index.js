import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import App from './routes/index';
import getStore from './store/index';
import 'bootstrap/dist/css/bootstrap.min.css';

const history = createHistory();
const store = getStore(history);

ReactDOM.render(
  <Provider store ={store}>
    <ConnectedRouter history={history}>
        <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
  