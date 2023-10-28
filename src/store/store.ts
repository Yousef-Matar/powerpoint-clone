import { createStore } from 'redux';
import { createSlide, createSlideElement } from './actions/actions';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(rootReducer)
store.dispatch(createSlide());
store.dispatch(createSlideElement());
export default store