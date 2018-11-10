//Async requests in actions - middleware
export default ({ dispatch }) => next => action => {
  //Check to see if the action has a promise on its payload
  //If it does, then wait for it to resolve
  //If it does not, then send the action on to the next middleware
  if (!action.payload || ! action.payload.then) {
    return next(action);
  }

  //We want to wait for the promise to resolve
  //and then create a new action with that data
  //and dispatch it
  action.payload
        .then(function(response) {
          const newAction = {...action, payload: response};
          dispatch(newAction);
        });
}
