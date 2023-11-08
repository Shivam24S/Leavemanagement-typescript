import React, { useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";

const LeaveBalance: React.FC = () => {
  // const [leaveBalance, setLeaveBalance] = useState<number>(0);

  // const fetchLeaveBalance = async (userId: string, leaveType: string) => {
  //   try {

  //     const response = await axios.get(`http://your-api-url/leaveBalance?userId=${userId}&leaveType=${leaveType}`);
  //     setLeaveBalance(response.data.balance);
  //   } catch (error) {
  //     console.error("Error fetching leave balance:", error);
  //   }
  // };

  // const calculateRemainingBalance = () => {

  //   const remainingBalance = leaveBalance - Number(inputData.leaveDays);
  //   return remainingBalance >= 0 ? remainingBalance : 0;
  // };

  // useEffect(() => {
  //   if (inputData.leaveType && userId) {
  //     fetchLeaveBalance(userId, inputData.leaveType);
  //   }
  // }, [inputData.leaveType]);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {

  //     const remainingBalance = calculateRemainingBalance();
  //     console.log("Remaining leave balance:", remainingBalance);

  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };

  interface LeaveBalanceData {
    balance: number | string;
    total: number;
    used: number | string;
  }

  const [leavebalance, setLeaveBalance] = useState<LeaveBalanceData>({
    total: 10,
    balance: "",
    used: "",
  });

  return (
    <>
      <Box
        sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}
      >
        <Box sx={{ marginTop: "5rem" }}>
          <h4>Total Leave given By Comapany : {leavebalance.total} </h4>

          <br />

          <h4>You have used : {leavebalance.used} </h4>
        </Box>
      </Box>
    </>
  );
};

export default LeaveBalance;
