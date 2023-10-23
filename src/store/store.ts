import { createStore } from 'redux';
import { powerpointReducer } from './reducers/powerpointReducer';

const store = createStore(powerpointReducer)
store.dispatch({ type: "CREATE_SLIDE" });
export default store

