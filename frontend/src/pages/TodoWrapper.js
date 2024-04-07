import React ,{useEffect} from "react";
import Todo  from "./Todo";
import TodoForm from "./TodoForm";
// import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import { connect } from 'react-redux';
import './TextWrapper.css'
import { getTodosAsync } from '../actions/actions'; 
import { useDispatch , useSelector} from 'react-redux';

const TodoWrapper = ({ todos, editTodo  }) => {
  // fetch todos , when component reloads
  const authToken = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodosAsync(authToken));
  }, [authToken]);
  // useEffect(() => {
  //   console.log(todos)
  // }, [todos]);

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done !</h1>
      <TodoForm />
      {/* display todos */}
      {todos && todos.map((todo) =>
        todo.isEditing ? (
          
          <EditTodoForm key={todo.id} task={todo} />
        ) : (
     
          <Todo key={todo.id} task={todo} />
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(TodoWrapper);
