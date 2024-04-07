import React, { useState } from 'react'
import { connect,useSelector } from "react-redux";
import { editTodo } from "../actions/actions";
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { updateTodoAsync } from "../actions/actions"
import './TextWrapper.css'

const EditTodoForm = ({ editTodo, task }) => {
  // console.log("task : " ,task)
  const [value, setValue] = useState(task.task);
  // console.log("value: ",value)
  const dispatch = useDispatch();
  const authToken = useSelector(state => state.auth.token);
  const handleSubmit = async (e) => {
    // prevent default action
    e.preventDefault();
   
    console.log("ttasksss :" , task)
   
    dispatch(updateTodoAsync({
      id: task._id,
      task: value,
      completed: task.completed,
      isEditing: false,
  }, authToken));
  setValue(value);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
      <button type="submit" className='todo-btn'> Update Task</button>
    </form>
  )
}

export default connect(null, { editTodo })(EditTodoForm);