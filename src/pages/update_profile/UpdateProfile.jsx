import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../../redux/authAction'
import './UpdateProfile.css'
import { useNavigate } from 'react-router-dom'

export default function UpdateProfile() {

    const { userInfo, loading } = useSelector((state) => state.user)
    const { register, handleSubmit, setValue } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch])

    useEffect(() => {
        if (userInfo) {
            setValue("firstName", userInfo?.body?.firstName || "");
            setValue("lastName", userInfo?.body?.lastName || "");
        }
    }, [userInfo, setValue]);

    const submitForm = async (data) => {
        try {
            await dispatch(updateUserProfile({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            })).unwrap();

            alert('Profile information updated successfully')
            navigate('/user/profile')

        } catch (err) {
            console.error('Update profile information failed:', err)
        }
    }

    return (
        <div className='main bg-dark update-profile'>
            <h2 className='update-title'>Mettre à jour le profil</h2>
            <form className='form-update' onSubmit={handleSubmit(submitForm)}>
                <div className='form-groupe'>
                    <label htmlFor="firtName">First Name:</label>
                    <input type="text"
                        className='form-input'
                        {...register("firstName")}
                    />
                </div>
                <div className='form-groupe'>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text"
                        className='form-input'
                        {...register("lastName")}
                    />
                </div>
                <button className='update-button'>{loading ? "Changing..." : "Submit"}</button>

            </form>
        </div>
    )
}
