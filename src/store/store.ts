import { createStore } from 'redux';
import { slideReducer } from './reducers/slideReducer';

const store = createStore(slideReducer)
store.dispatch({ type: "CREATE_SLIDE", payload: 'text' });
export default store