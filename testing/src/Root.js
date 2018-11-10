// Provider component
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import stateValidator from 'middlewares/stateValidator';
import asyncActions from 'middlewares/asyncActions';
import reducers from 'reducers';

const Root =  ({children, initialState = {}}) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(stateValidator, asyncActions)
  );

  return(
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default Root;
