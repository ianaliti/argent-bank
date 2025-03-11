import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backendURL = 'http://localhost:3001/api/v1';

export const registerUser = createAsyncThunk(
    "auth/signup", //action 
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            // 1. Prepare the request configuration with content-type
            const config = {
                headers: {
                    "Content-Type": "application/json" // Tell the server to expect JSON
                },
            };
            // 2. Send a POST request to the backend with user data
            const { data } = await axios.post(
                `${backendURL}/user/signup`, // API endpoint
                { firstName, lastName, email, password }, // Data to be sent in the body of the request
                config // Headers for the request
            );
            // 3. Return the response data if the request is successful
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
        } catch (error) {
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
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch profile");
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    "user/profile",
    async ({ firstName, lastName }, { rejectWithValue }) => {
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

            const { data } = await axios.put(`${backendURL}/user/profile`, { firstName, lastName }, config);
            return data.user;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Update failed");
        }
    }
);