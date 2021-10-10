import { createStore } from 'redux';
import { rootReducer } from './root';

export const store = createStore(rootReducer)