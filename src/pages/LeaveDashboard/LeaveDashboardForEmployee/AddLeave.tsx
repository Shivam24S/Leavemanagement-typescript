import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Container,
} from "@mui/material";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../app/store";
import axios from "axios";
import { addLeave, updateLeave } from "../../../features/LeaveSlicer";
import moment from "moment";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface LeaveData {
  fullName: string;
  description: string;
  fromDate: any;
  toDate: any;
  leaveType: string;
  leaveDays: number | string;
}

const AddLeave: React.FC = () => {
  const dispatch = useDispatch();

  const leave: any = useSelector((state: RootState) => state.leave.updateLeave);

  const [inputData, setInputData] = useState<LeaveData>({
    fullName: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    leaveDays: "",
    description: "",
  });

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

  const handleLeaveDetails = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputData({ ...inputData, description: e.target.value });
  };

  const handleTotalLeaveDays = () => {
    if (inputData.fromDate && inputData.toDate) {
      const start = moment(inputData.fromDate);
      const end = moment(inputData.toDate);
      const duration = moment.duration(end.diff(start));
      const days = duration.asDays();

      // console.log(days);

      setInputData({ ...inputData, leaveDays: days });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let apiUrl = "";

      let method = "";

      if (leave._id) {
        // apiUrl = process.env.REACT_APP_PATCH_API ?? "";
        apiUrl = "http://127.0.0.1:5000/api/updateLeave";
        method = "PATCH";
      } else {
        apiUrl = process.env.REACT_APP_POST_API ?? "";
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

  useEffect(() => {
    handleTotalLeaveDays();
  }, [inputData.fromDate, inputData.toDate]);

  useEffect(() => {
    if (leave._id) {
      const formattedFromDate = moment(leave.fromDate).format("YYYY-MM-DD");
      const formattedToDate = moment(leave.toDate).format("YYYY-MM-DD");
      setInputData((prevInputData) => ({
        ...prevInputData,
        ...leave,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      }));

      console.log("updating");
    }
    return () => {
      console.log("adding leave");
      setInputData({
        fullName: "",
        leaveType: "",
        fromDate: "",
        toDate: "",
        leaveDays: "",
        description: "",
      });
    };
  }, [leave]);

  return (
    <>
      <Typography
        sx={{ marginTop: "2rem", textAlign: "center", color: "#1565c0" }}
        variant="h5"
      >
        {" "}
        {leave._id ? "Update Leave" : "Apply for leave"}
      </Typography>
      <Container sx={{ bgcolor: "#e3f2ff ", height: "70vh", width: "50vw" }}>
        <Link to="/">
          <ArrowBackIcon
            sx={{
              fontSize: "2rem",
              marginTop: "1rem",
              cursor: "pointer",
              color: "black",
            }}
          />
        </Link>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "25ch",
                  marginTop: "2rem",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4rem",
                  }}
                >
                  <TextField
                    id="filled-basic"
                    label="Name"
                    variant="standard"
                    value={inputData.fullName}
                    onChange={handleName}
                  />
                  <FormControl
                    variant="standard"
                    sx={{ m: 1, minWidth: 200, marginTop: "2rem" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Leave Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      value={inputData.leaveType}
                      onChange={handleLeaveType}
                    >
                      <MenuItem value={"Sick Leave"}>Sick Leave</MenuItem>
                      <MenuItem value={"Personal Leave"}>
                        Personal Leave
                      </MenuItem>
                      <MenuItem value={"Paid Leave"}>Paid Leave</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4rem",
                    marginTop: "3rem",
                  }}
                >
                  From :
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
                  TO :
                  <Input
                    value={moment(inputData.toDate).format("YYYY-MM-DD")}
                    onChange={handleLeaveEndDate}
                    type="date"
                    slotProps={{
                      input: {},
                    }}
                  />
                </Box>
              </div>
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4rem",
                  }}
                >
                  <TextField
                    id="filled-basic"
                    label="Total Leave Days"
                    variant="standard"
                    type="number"
                    value={inputData.leaveDays}
                    onChange={handleTotalLeaveDays}
                  />
                  <TextField
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={3}
                    value={inputData.description}
                    onChange={handleLeaveDetails}
                  />
                </Box>
              </div>
            </Box>
          </Box>
          <br />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Button
              variant="contained"
              sx={{ marginTop: "1rem" }}
              type="submit"
            >
              {leave._id ? "Update" : "Submit"}
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: "1rem" }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default AddLeave;
