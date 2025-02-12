import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backendURL = 'http://localhost:3001/api/v1';

export const registerUser = createAsyncThunk(
    "auth/register",
    async ({ firstName, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const { data } = await axios.post(
                `${backendURL}/user/register`,
                { firstName, email, password },
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const userLogin = createAsyncThunk(
    '/user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            const { data } = await axios.post(
                `${backendURL}/user/login`,
                { email, password },
                config
            )
            localStorage.setItem('userToken', data.body.token)
            return data;
        } catch (err) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    '/user/profile',
    async (_, { rejectWithValue }) => {
        try {
            const userToken = localStorage.getItem('userToken');

            if (!userToken) {
                return rejectWithValue("No token found, please log in again")
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                },
            }
            const { data } = await axios.post(
                `${backendURL}/user/profile`, {}, config
            )
            console.log("API Response:", data);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Failed to fetch profile");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/updateProfile",
    async ({ firstName, email }, { rejectWithValue }) => {
        try {
            const userToken = localStorage.getItem("userToken");
            if (!userToken) {
                return rejectWithValue("No token found, please log in again");
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(`${backendURL}/user/update`, { firstName, email }, config);
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Update failed");
        }
    }
);