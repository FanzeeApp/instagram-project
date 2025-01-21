import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:
      typeof window !== "undefined" &&
      localStorage.getItem("user") &&
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user") as string)
        : null,
    token:
      typeof window !== "undefined" &&
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "undefined"
        ? localStorage.getItem("token")
        : null,
  },
  reducers: {
    setUser: (state, action) => {
      const { accessToken, user } = action.payload;

      console.log("Token:", accessToken);
      console.log("User:", user);

      if (accessToken && user) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        state.token = accessToken;
        state.user = user;
      } else {
        console.error("Token yoki User noto‘g‘ri:", { accessToken, user });
      }
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
