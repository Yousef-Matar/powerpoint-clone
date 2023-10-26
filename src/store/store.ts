import { createStore } from 'redux';
import { createSlide } from './actions/actions';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(rootReducer)
store.dispatch(createSlide());
export default store