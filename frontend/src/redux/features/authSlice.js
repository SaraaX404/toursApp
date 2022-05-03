import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const googleSignIn = createAsyncThunk(
  "auth/googleLogin",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("Successfully logged in");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",

  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//create slice
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setLogout: (state, action) => {
      localStorage.clear();
      state.action = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      console.log("wroking");
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      console.log(action);
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);

      state.error = action.payload;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      console.log("wroking");
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      console.log(action);
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);

      state.error = action.payload;
    },
    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      console.log("wroking");
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      console.log(action);
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.payload);

      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setUser, setLogout } = authSlice.actions;
