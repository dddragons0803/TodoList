import axios from 'axios';

// Authentication action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';

// Todo action types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const SET_EDIT = 'SET_EDIT';

// Authentication action creators
export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user,token) => { 
    return { type: LOGIN_SUCCESS, payload: {user,token }}
};
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const signupRequest = () => ({ type: SIGNUP_REQUEST });
export const signupSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
export const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

// Todo action creators
export const addTodo = (todo) => ({ type: ADD_TODO, payload: todo });
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id });
export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id });
export const editTodo = (todo) => ({ type: EDIT_TODO, payload: todo });
export const setEditTodo = (id) => ({ type: SET_EDIT, payload: id });
// export const logout = () => ({
//   type: LOGOUT
// });


// Async action creator for login
export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await axios.post('http://localhost:8000/api/users/signin', { email, password });
            console.log(response);
            dispatch(loginSuccess(response.data.user, response.data.token));
        } catch (error) {
            dispatch(loginFailure(error.response.data.message));
        }
    };
};

// Async action creator for signup
export const signup = (userData) => {
    return async (dispatch) => {
        dispatch(signupRequest());
        try {
            const response = await axios.post('http://localhost:8000/api/users/register', userData);
            console.log(response);
            dispatch(signupSuccess(response.data.user));
        } catch (error) {
            dispatch(signupFailure(error.response.data.message));
        }
    };
};

// Async action creator for adding a todo
export const addTodoAsync = (todoData, authToken) => {
    console.log(todoData)

    console.log(authToken)
    return async (dispatch) => {
        try {
           
            const response = await axios.post('http://localhost:8000/api/lists/addTask', todoData, {
                headers: {
                    Authorization:
                    `Bearer ${authToken}`
                }
                });
            // {todoData,authToken}
        
            console.log(response.data.list)
            dispatch(addTodo(response.data.list));
        } catch (error) {
            console.error('Error adding todo:', error);
            // Handle error
        }
    };
};

// Async action creator for updating a todo
export const updateTodoAsync = (updatedTodoData, authToken) => {
    console.log(1)
    console.log(updatedTodoData.id)
    console.log(1)
   console.log(authToken)
    console.log(1)
    const { id, task, completed, isEditing } = updatedTodoData;
    // console.log(updatedTodoData)
    // console.log(authToken)
    return async (dispatch) => {
        try {
            await axios.put(`http://localhost:8000/api/lists/updateTask/${id}`, updatedTodoData, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            dispatch(editTodo(updatedTodoData)); 
        } catch (error) {
            console.error('Error updating todo:', error);
            // Handle error
        }
    };
};

// Async action creator for deleting a todo
export const deleteTodoAsync = (id, authToken) => {
    console.log(1)
    console.log(id)
    console.log(authToken)
    console.log(1)
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:8000/api/lists/deleteTask/${id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            dispatch(deleteTodo(id));
        } catch (error) {
            console.error('Error deleting todo:', error);
            // Handle error
        }
    };
};

// Async action creator for getting todos
export const getTodosAsync = (authToken) => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8000/api/lists/getTasks', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            // Assuming response.data contains an array of todos
            console.log(response.data)
            response.data.list.forEach(todo => dispatch(addTodo(todo)));
        } catch (error) {
            console.error('Error getting todos:', error);
            // Handle error
        }
    };
};

