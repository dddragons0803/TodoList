import React, {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { toggleTodo, deleteTodo, setEditTodo  } from "../actions/actions";
import { useDispatch,useSelector } from 'react-redux';
import { deleteTodoAsync } from '../actions/actions';
import './TextWrapper.css'
 const Todo = ({ task, toggleTodo, deleteTodo, setEditTodo  }) => {
  
  useEffect(() => {
    console.log(task)
    // console.log("taskid:",task._id)
  }, [task])
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.token);
  const handleDeleteTodo = () => {
    dispatch(deleteTodoAsync(task._id, authToken));
  };
  return (
    <div className="Todo">
       <div className='todo__lists__data'>
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleTodo(task._id)}>{task.task}</p>
        </div>
        <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => setEditTodo(task._id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={handleDeleteTodo}
        />
        </div>
    </div>
  )
}


export default connect(null, { toggleTodo, deleteTodo, setEditTodo })(Todo);