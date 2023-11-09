import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../app/store";
import axios from "axios";
import { addLeave, updateLeave } from "../../../features/LeaveSlicer";
import moment from "moment";

interface LeaveData {
  fullName: string;
  description: string;
  fromDate: any;
  toDate: any;
  leaveType: string;
  leaveDays: number | string;
}

const AddLeave: React.FC = () => {
  const [inputData, setInputData] = useState<LeaveData>({
    fullName: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    leaveDays: "",
    description: "",
  });

  useEffect(() => {
    if (leave._id) {
      const formattedFromDate = moment(leave.fromDate).format("YYYY-MM-DD");
      const formattedToDate = moment(leave.toDate).format("YYYY-MM-DD");
      setInputData({
        ...leave,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      });
    }
  }, []);

  const dispatch = useDispatch();

  const leave: any = useSelector((state: RootState) => state.leave.updateLeave);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, fullName: e.target.value });
  };

  const handleLeaveType = (e: SelectChangeEvent<string>) => {
    setInputData({ ...inputData, leaveType: e.target.value as string });
  };

  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = moment(e.target.value).format("YYYY-MM-DD");
    setInputData({ ...inputData, fromDate: formattedDate });

    handleTotalLeaveDays();
  };

  const handleLeaveEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedDate = moment(e.target.value).format("YYYY-MM-DD");
    setInputData({ ...inputData, toDate: formattedDate });

    handleTotalLeaveDays();
  };

  useEffect(() => {
    handleTotalLeaveDays();
  }, [inputData.fromDate, inputData.toDate]);

  const handleLeaveDetails = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputData({ ...inputData, description: e.target.value });
  };

  const handleTotalLeaveDays = () => {
    if (inputData.fromDate && inputData.toDate) {
      const start = moment(inputData.fromDate);
      const end = moment(inputData.toDate);
      const duration = moment.duration(end.diff(start));
      const days = duration.asDays();

      console.log(days);

      setInputData({ ...inputData, leaveDays: days });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let apiUrl = "";

      let method = "";

      if (leave._id) {
        apiUrl = "http://127.0.0.1:5000/api/updateLeave";
        method = "PATCH";
      } else {
        apiUrl = "http://127.0.0.1:5000/api/applyForLeave";
        method = "POST";
      }

      const response = await axios({
        method: method,
        url: apiUrl,
        data: {
          ...inputData,
        },
      });

      if (leave._id) {
        dispatch(updateLeave(response));
      } else {
        dispatch(addLeave(response));
      }

      console.log("Data sent:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  const handleCancel = () => {
    setInputData({
      fullName: "",
      leaveType: "",
      fromDate: "",
      toDate: "",
      leaveDays: "",
      description: "",
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography
          sx={{ marginTop: "2rem", textAlign: "center" }}
          variant="h5"
        >
          {" "}
          {leave._id ? "Update Leave" : "Apply for leave"}
        </Typography>
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <TextField
            id="filled-basic"
            label="Name"
            variant="standard"
            value={inputData.fullName}
            onChange={handleName}
          />
          <FormControl variant="standard" sx={{ m: 3, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-label">Leave Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={inputData.leaveType}
              onChange={handleLeaveType}
            >
              <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
              <MenuItem value={"Personal Leave"}>Personal Leave</MenuItem>
              <MenuItem value={"Paid Leave"}>Paid Leave</MenuItem>
            </Select>
          </FormControl>
          From
          <Input
            value={moment(inputData.fromDate).format("YYYY-MM-DD")}
            onChange={handleStartDate}
            type="date"
            slotProps={{
              input: {
                min: moment().format("YYYY-MM-DD"),
              },
            }}
          />
          TO
          <Input
            value={moment(inputData.toDate).format("YYYY-MM-DD")}
            onChange={handleLeaveEndDate}
            type="date"
            slotProps={{
              input: {},
            }}
          />
          <TextField
            id="filled-basic"
            label="Leave Days"
            variant="standard"
            type="number"
            value={inputData.leaveDays}
            onChange={handleTotalLeaveDays}
          />
          <br />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            {" "}
            <TextareaAutosize
              value={inputData.description}
              onChange={handleLeaveDetails}
              placeholder="Leave details "
              minRows="25"
              style={{ width: "25rem", marginTop: "1rem" }}
            />
            <br />
            <Box sx={{ display: "flex", gap: "2rem", marginLeft: "12rem" }}>
              <Button
                variant="contained"
                sx={{ marginTop: "1rem" }}
                type="submit"
              >
                {leave._id ? "Update" : "Submit"}
              </Button>
              <Button
                variant="contained"
                sx={{ marginTop: "1rem" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AddLeave;
