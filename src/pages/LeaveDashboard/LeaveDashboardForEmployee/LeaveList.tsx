import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLeave } from "../../../features/LeaveSlicer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
      <Typography
        variant="h4"
        sx={{ marginTop: "2rem", textAlign: "center", color: "#1565c0" }}
      >
        Leave List
      </Typography>
      <Container sx={{ bgcolor: "#e3f2ff", height: "60vh" }}>
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
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveList.map((data: any, index: number) => (
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
                  <StyledTableCell align="right">
                    {data.leaveStatus}
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
                      <DeleteIcon
                        onClick={() => deleteHandler(data._id)}
                        color="error"
                      ></DeleteIcon>
                    }
                    <EditIcon
                      color="primary"
                      onClick={() => updateHandler(data._id)}
                    ></EditIcon>
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

export default LeaveList;
