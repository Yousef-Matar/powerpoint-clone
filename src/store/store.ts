import { createStore } from 'redux'
import { slideReducer } from './reducers/slideReducer'

export const store = createStore(slideReducer)