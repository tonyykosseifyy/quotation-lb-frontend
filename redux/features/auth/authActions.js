import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api";

export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("/login", { email, password });
            localStorage.setItem("accessToken", res.data.data.accessToken);
            return res;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);
