import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const backendURL = 'http://localhost:3001/api/v1';

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
                localStorage.setItem('userToken', data.userToken)
                return data;
        } catch (err) {
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message)
            } else {
                return rejectWithValue(err.message)
            }
        }
    }
);

export const fetchUserProfile = createAsyncThunk(
    "/user/profile",
async (_, { rejectWithValue }) => {
    try {
        const userToken = localStorage.getItem("userToken");
        const { data } = await axios.get(
            `${backendURL}/user/profile`, {}, { headers: { Authorization: `Bearer ${userToken}`} }
        );
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data)
    }
});