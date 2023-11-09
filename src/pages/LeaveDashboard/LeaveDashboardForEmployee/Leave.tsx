import { Box, Button, Typography, Container } from "@mui/material";

import { Link } from "react-router-dom";
import LeaveList from "./LeaveList";

const Leave: React.FC = () => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginTop: "2rem",
          color: "#1565c0",
        }}
      >
        {" "}
        Leave DashBoard
      </Typography>

      <Box>
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
          <Button variant="contained"> Leave List</Button>

          <Link to="/leave-request">
            <Button variant="outlined"> Requsted-leave</Button>
          </Link>
        </Box>
      </Box>
      <Container sx={{ bgcolor: "#e3f2ff", height: "70vh" }}>
        <LeaveList />
      </Container>
    </>
  );
};

export default Leave;
