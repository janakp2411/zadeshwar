import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { connectRouter, riuterMidddlewere, routerMiddleware } from 'connected-react-router';
import reducer from '../reducers/index';
import rootSaga from '../reducers/sagas/index';

const getStore = (history) => {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancer = window.__REDUX__DEVTOOLS__COMPOSE__ || compose;

    const middleware = [];
    middleware.push(routerMiddleware(history));
    middleware.push(sagaMiddleware);
    middleware.push(logger);

    const store = createStore(
        connectRouter(history)(combineReducers({
            ...reducer
        })),
        composeEnhancer(applyMiddleware(...middleware))
    );

    sagaMiddleware.run(rootSaga);
    return store;
}

export default getStore;

