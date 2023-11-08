import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLeave } from "../../../features/LeaveSlicer";

const LeaveList = () => {
  const [leaveList, setLeaveList] = useState<any>([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchLeaveList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/leaveList");
      setLeaveList(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchLeaveList();
  }, []);

  const formatDate = (date: any) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  const updateHandler: any = async (id: any) => {
    const editData = leaveList.find((data: any) => data._id === id);

    dispatch(updateLeave(editData));
    navigate("/add-leave");
  };

  const deleteHandler = async (id: any) => {
    try {
      const leaveListData = {
        data: {
          _id: id,
        },
      };

      await axios.delete(
        "http://127.0.0.1:5000/api/deleteLeave",
        leaveListData
      );
      setLeaveList(leaveList.filter((data: any) => data.id !== id));

      console.log("Deleted item with ID: ", id);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "2rem", textAlign: "center" }}>
        Leave List
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Leave Days</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveList.map((data: any, index: number) => (
              <tr key={index}>
                <td>{data.fullName}</td>
                <td>{data.leaveType}</td>
                <td>{formatDate(data.fromDate)}</td>
                <td>{formatDate(data.toDate)}</td>
                <td>{data.leaveDays}</td>
                <td>{data.description}</td>
                <td>{data.leaveStatus}</td>

                <td>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button
                      variant="contained"
                      onClick={() => updateHandler(data._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => deleteHandler(data._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
};

export default LeaveList;
