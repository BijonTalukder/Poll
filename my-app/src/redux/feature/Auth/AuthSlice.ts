import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../../utility/utility";
interface IUser {
  name: string;
  email: string;
  password: string;
}
interface ILoginUser {
  email: string;
  password: string;
}
interface UserState {
  userData: {
    email: string | null;
    [key: string]: any; // Assuming userData might have other properties
  };
  token: string | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}
export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload: IUser) => {
    const data = await axios.post(`${BaseUrl}/user/create`, payload);
    console.log(data.data.data, "thunk");

    return data.data.data.email;
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (payload: ILoginUser) => {
    const data = await axios.post(`${BaseUrl}/auth/login`, payload);
    console.log(data.data.data);
    localStorage.setItem("token", data.data.data.token);
    localStorage.setItem("user", JSON.stringify(data.data.data.user));
    return data.data.data;
    // console.log(data);
  }
);

const initialState:UserState = {
  userData: {
    email: null,
  },
  //   email:null,
  token: null,
  isLoading: false,
  isError: false,
  error: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log(state, "fullfiled");

        state.userData.email = action.payload;
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.userData.email = null;
        state.isError = true;
        state.error = action.error.message!;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload, "fullfiled ");

        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.token = null;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});
export const { setLoading, setUser } = userSlice.actions;
export default userSlice.reducer;
