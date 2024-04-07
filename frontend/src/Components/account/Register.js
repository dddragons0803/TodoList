import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../actions/actions'; // Import the signup action
import './AuthForm.css';

function Register() {
  const [loading, setLoading] = useState(false);
  const error = useSelector(state => state.auth.error);

  const dispatch = useDispatch();

  // Form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });
  
  const formOptions = { resolver: yupResolver(validationSchema) };

  // Get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Dispatch the signup action with form data
      await dispatch(signup(data));
    } catch (error) {
      // Error handling is done through Redux state
      console.error('An error occurred during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card m-3">
      <h4 className="card-header">Register</h4>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <button disabled={isSubmitting || loading} className="btn btn-primary">
            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
            Register
          </button>
          <Link to="/account/login" className="btn btn-link">Cancel</Link>
        </form>
      </div>
    </div>
  );
}

export { Register };
