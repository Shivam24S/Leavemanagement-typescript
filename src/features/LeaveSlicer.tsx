import { createSlice } from "@reduxjs/toolkit";

export interface LeaveData {
  AddLeave: [];
  DeleteLeave: any;
  LeaveStatus: string;
  LeaveList: {} | string;
  updateLeave: {} | string;
}

const initialState: LeaveData = {
  AddLeave: [],
  DeleteLeave: "",
  LeaveStatus: "Pending",
  LeaveList: "",
  updateLeave: "",
};

export const leaveSlicer = createSlice({
  name: "leave",
  initialState,
  reducers: {
    addLeave: (state, action) => {
      state.AddLeave = action.payload;
    },
    leaveList: (state, action) => {
      state.LeaveList = action.payload;
    },
    updateLeave: (state, action) => {
      state.updateLeave = action.payload;
    },
    deleteLeave: (state, action) => {
      state.DeleteLeave = action.payload;
    },
    leaveStatus: (state, action) => {
      state.LeaveStatus = action.payload;
    },
  },
});

export const { addLeave, leaveList, updateLeave, deleteLeave, leaveStatus } =
  leaveSlicer.actions;

export default leaveSlicer.reducer;
