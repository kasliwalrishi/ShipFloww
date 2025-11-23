import { publicRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginFailure } from "./adminSlice";

export const login = async (dispatch, { email, password }) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", { email, password });
    
    // Check if the user is an admin
    if (res.data.role !== "admin") {
      dispatch(loginFailure("Only admin users can access this portal"));
      return;
    }
    
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data || "Invalid email or password"));
  }
};
