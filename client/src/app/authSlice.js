import { createSlice } from "@reduxjs/toolkit"; 
const initialState = {
  status: false,
  userData: null,
  userHealthData:null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.userHealthData = action.payload.userHealthData;
    },
    logout:(state)=>{
        state.status=false
        state.userData=null
        state.userHealthData=null
    }
  },
});
export const {login,logout} = authSlice.actions
export default authSlice.reducer