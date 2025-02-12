import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/authAction'

export default function RegisterForm() {
    const { loading, userInfo, success } = useSelector((state) => state.user)

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { error } } = useForm()

    const submitForm = (data) => {
        if(data.password !== data.confirmPassword) {
            alert('Password does not match')
        } 
        data.email = data.email.toLowerCase()
        dispatch(registerUser(data))
    }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
        { error && <div className='error-message'>error</div> }
        <div className='form-group'>
            <label htmlFor="firstName">First Name</label>
            <input type="text" 
                   className='form-input' 
                   { ...register('fistName')} 
                   required
            />
        </div>
        <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="text"
                   className='form-input'
                   {...register('email')}
                   required
             />
        </div>
        <div className='form-group'>
            <label htmlFor="password">Password</label>
            <input type="password"
                   className='form-input'
                   {...register('password')}
                   required
             />
        </div>
        <button type='submit' className='button' disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
        </button>
    </form>
  )
}

