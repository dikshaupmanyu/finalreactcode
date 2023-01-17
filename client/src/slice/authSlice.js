import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import axios from "axios";
// import { url, setHeaders } from "./api";

const initialState = {
    token: localStorage.getItem("token"),
    name: "",
    email: "",
    _id: "",
    isAdmin: false,
    registerStatus: "",
    registerError: "",
    loginStatus: "",
    loginError: "",
    userLoaded: false,
  };

  export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (values, { rejectWithValue }) => {
      try {
        const token = await axios.post(`/register`, {
          username: values.username,
          fullname: values.fullname,
          email: values.email,
          password: values.password,
        });
  
        localStorage.setItem("token", token.data);
  
        return token.data;
      } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      }
    }
  );

  const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
      loadUser(state, action) {
        const token = state.token;
  
        if (token) {
          const user = jwtDecode(token);
          return {
            ...state,
            token,
            name: user.name,
            email: user.email,
            _id: user._id,
            isAdmin: user.isAdmin,
            userLoaded: true,
          };
        } else return { ...state, userLoaded: true };
      },
      logoutUser(state, action) {
        localStorage.removeItem("token");
  
        return {
          ...state,
          token: "",
          name: "",
          email: "",
          _id: "",
          isAdmin: false,
          registerStatus: "",
          registerError: "",
          loginStatus: "",
          loginError: "",
        };
      },
    },
    extraReducers:(builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            return { ...state, registerStatus: "pending" };
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            if (action.payload) {
                const user = jwtDecode(action.payload);
                return {
                  ...state,
                  token: action.payload,
                  name: user.name,
                  email: user.email,
                  _id: user._id,
                  isAdmin: user.isAdmin,
                  registerStatus: "success",
                };
              } else return state;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            return {
              ...state,
              registerStatus: "rejected",
              registerError: action.payload,
            };
          });
    },
  });


  export const { loadUser, logoutUser } = authSlice.actions;

  export default authSlice.reducer;