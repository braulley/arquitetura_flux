import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas/index';
const sagaMIddleware = createSagaMiddleware();

const middlewares = []

middlewares.push(sagaMIddleware)

const composer = process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...middlewares),
        //console.tron.createEnhancer(),
    ): applyMiddleware(...middlewares);


const store = createStore(reducers, composer);

sagaMIddleware.run(sagas)
export default store;