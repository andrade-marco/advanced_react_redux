//Validation of State - middleware
import tv4 from 'tv4';
import stateSchema from './stateSchema';

export default ({dispatch, getState}) => next => action => {
  next(action);
  const state = getState();
  const valid = tv4.validate(state, stateSchema);
  if (!valid) {
    console.warn('Invalid state schema detected');
  } else {
    console.warn('All good');
  }
}
