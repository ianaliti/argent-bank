import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../../redux/authAction'

export default function UpdateProfile() {

    const { userInfo, loading } = useSelector((state) => state.user)
    const { register, handleSubmit, setValue} = useForm()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])

    useEffect(() => {
        if (userInfo) {
            setValue("firstName", userInfo?.body?.firstName || "");
            setValue("lastName", userInfo?.body?.lastName || "");
            setValue("email", userInfo?.body?.email || "");
        }
    }, [userInfo, setValue]);

    const submitForm = async (data) => {
        try {
            await dispatch(updateUserProfile({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })).unwrap();

            alert("Profile updated successfully!")

        } catch (err) {
            console.error('Update profile information failed:', err)
        }
    }

    console.log(userInfo)
    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div>
                <label htmlFor="firtName">First Name:</label>
                <input type="text"
                    className='form-input'
                    {...register("firstName")}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text"
                    className='form-input'
                    {...register("lastName")}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email"
                    className='form-input'
                    {...register('email')}
                />
            </div>
            <button>{loading ? "Changing..." : "Submit"}</button>

        </form>
    )
}
