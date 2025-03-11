import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile, updateUserProfile } from '../../redux/authAction'
import './UpdateProfile.css'


export default function UpdateProfile() {

    const { userInfo, loading } = useSelector((state) => state.user);
    const { register, handleSubmit, setValue } = useForm();

    const dispatch = useDispatch()

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
            })).unwrap();
            dispatch(fetchUserProfile());
            alert('Profile information updated successfully')

        } catch (err) {
            console.error('Update profile information failed:', err)
        }
    }

    const handleCancel = () => {
        setValue("firstName", userInfo?.body?.firstName || "");
        setValue("lastName", userInfo?.body?.lastName || "");
    };

    return (
        <form className='form-update' onSubmit={handleSubmit(submitForm)}>
            <div className='input-group'>
                <input type='text' className='form-input' {...register('firstName')} />
                <input type='text' className='form-input' {...register('lastName')} />
            </div>
            <div className='button-group'>
                <button className='save-button'>{loading ? 'Saving...' : 'Save'}</button>
                <button className='cancel-button' type='button' onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    )
}
