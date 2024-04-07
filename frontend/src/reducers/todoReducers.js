const initialState = [];

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo._id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo._id !== action.payload);
  
    case 'SET_EDIT':
      return state.map(todo =>
        todo._id === action.payload ? { ...todo, isEditing : !todo.isEditing } : todo
      );
    case 'EDIT_TODO':
      return state.map(todo =>
        todo._id === action.payload.id ? { ...todo, task: action.payload.task, isEditing : !todo.isEditing } : todo
      );
    default:
      return state;
  }
};

export default todosReducer;
