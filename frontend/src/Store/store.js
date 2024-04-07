import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todosReducer from '../reducers/todoReducers';
import authReducer from '../reducers/authReducers'; // Import the authReducer

const rootReducer = combineReducers({
    todos: todosReducer,
    auth: authReducer // Add the authReducer to the combined reducer
});

const store = configureStore({
    reducer: rootReducer
});

export default store;

