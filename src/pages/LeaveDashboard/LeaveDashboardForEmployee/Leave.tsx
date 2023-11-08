import { Box, Button, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import LeaveList from "./LeaveList";

const Leave: React.FC = () => {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginTop: "2rem" }}
        >
          {" "}
          Welcome to Leave DashBoard
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Link to="/add-leave">
            <Button variant="outlined"> Apply For Leave</Button>{" "}
          </Link>
          {/* <Link to="/leave-list">
            
          </Link> */}
          <Button variant="contained"> Leave List</Button>
          {/* <Link to="/leave-status">
            {" "}
            <Button variant="outlined"> Leave status</Button>
          </Link> */}
          <Link to="/leave-balance">
            <Button variant="outlined"> Leave balance</Button>
          </Link>
        </Box>
      </Box>

      <LeaveList />
    </>
  );
};

export default Leave;
