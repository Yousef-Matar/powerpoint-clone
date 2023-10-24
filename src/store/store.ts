import { createStore } from 'redux';
import { rootReducer } from './reducers/rootReducer';

const store = createStore(rootReducer)
store.dispatch({ type: "CREATE_SLIDE" });
export default store