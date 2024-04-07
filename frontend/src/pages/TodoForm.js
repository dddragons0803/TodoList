import React, {useState} from 'react'
import { connect, useSelector } from "react-redux";
import { addTodo } from "../actions/actions";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../actions/actions';
import './TextWrapper.css'

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const authToken = useSelector(state => state.auth.token);
    const handleSubmit = async (e) => {
      // prevent default action
        e.preventDefault();
        if (value.trim() !== "") {
           try {
                      //  console.log("todo",todo)  
                // Dispatch the async action creator with authToken
                dispatch(addTodoAsync({
                    id: Date.now(),
                    task: value,
                    completed: false,
                    isEditing: false,
                }, authToken));
                setValue('');
            } catch (error) {
                console.error('Error adding todo:', error);
                // Handle error
            }
        }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
    <button type="submit" className='todo-btn'>Add Task</button>
  </form>
  )
}


export default connect(null, { addTodo })(TodoForm);