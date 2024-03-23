import { Typography, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const LeaveRequest = () => {
  const [leaveListData, setLeaveListData] = useState<any>([]);

  const fetchLeaveList = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_GET_API ?? "");
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
        process.env.REACT_APP_PATCH_STATUS_API ?? "",
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
        process.env.REACT_APP_PATCH_STATUS_API ?? "",
        rejectData
      );

      fetchLeaveList();
    } catch (error) {
      console.error("Error rejecting leave:", error);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Container sx={{ bgcolor: "#e3f2ff", height: "80vh", marginTop: "3rem" }}>
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
        <Typography
          variant="h5"
          sx={{ marginTop: "3rem", textAlign: "center", color: "#1565c0" }}
        >
          Requested Leaves
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Leave Type</StyledTableCell>
                <StyledTableCell align="right">Start Date</StyledTableCell>
                <StyledTableCell align="right">To date</StyledTableCell>
                <StyledTableCell align="right">Leave Days</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveListData.map((data: any, index: number) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {data.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {data.leaveType}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatDate(data.fromDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatDate(data.toDate)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {data.leaveDays}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {data.description}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    sx={{
                      display: "flex",
                      gap: "1rem",
                      flexDirection: "coloumn",
                    }}
                  >
                    {
                      <CancelIcon
                        color="error"
                        onClick={() => handleReject(data._id)}
                        sx={{ cursor: "pointer" }}
                      ></CancelIcon>
                    }
                    <CheckCircleIcon
                      color="success"
                      onClick={() => handleApprove(data._id)}
                      sx={{ cursor: "pointer" }}
                    ></CheckCircleIcon>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default LeaveRequest;
