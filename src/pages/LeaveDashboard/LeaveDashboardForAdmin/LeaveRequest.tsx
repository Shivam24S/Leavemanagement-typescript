import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const LeaveRequest = () => {
  const [leaveListData, setLeaveListData] = useState<any>([]);

  const fetchLeaveList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/leaveList");
      setLeaveListData(response.data.data);
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

  const handleApprove = async (id: any) => {
    try {
      if (!id) {
        console.error("Error: Invalid ID for leave");
        return;
      }

      const approveData = {
        _id: id,
        leaveStatus: "Approve",
      };

      await axios.patch(
        "http://127.0.0.1:5000/api/updateLeaveStatus",
        approveData
      );

      fetchLeaveList();
    } catch (error) {
      console.error("Error approving leave:", error);
    }
  };

  const handleReject = async (id: any) => {
    try {
      if (!id) {
        console.error("Error: Invalid ID for leave");
        return;
      }

      const rejectData = {
        _id: id,
        leaveStatus: "Reject",
      };

      await axios.patch(
        "http://127.0.0.1:5000/api/updateLeaveStatus",
        rejectData
      );

      fetchLeaveList();
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ marginTop: "2rem", textAlign: "center" }}>
        Requested Leaves
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <table style={{ width: "60%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Leave Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Leave Days</th>
              <th>Description</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveListData.map((data: any, index: number) => (
              <tr key={index}>
                <td>{data.fullName}</td>
                <td>{data.leaveType}</td>
                <td>{formatDate(data.fromDate)}</td>
                <td>{formatDate(data.toDate)}</td>
                <td>{data.leaveDays}</td>
                <td>{data.description}</td>

                <td>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(data._id)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(data._id)}
                    >
                      Reject
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

export default LeaveRequest;
