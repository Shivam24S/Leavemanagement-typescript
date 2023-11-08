import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Leave from "../pages/LeaveDashboard/LeaveDashboardForEmployee/Leave";
import LeaveList from "../pages/LeaveDashboard/LeaveDashboardForEmployee/LeaveList";
// import LeaveStatus from "../pages/LeaveDashboard/LeaveDashboardForEmployee/LeaveStatus";
import LeaveBalance from "../pages/LeaveDashboard/LeaveDashboardForEmployee/LeaveBalance";
import LeaveRequest from "../pages/LeaveDashboard/LeaveDashboardForAdmin/LeaveRequest";

import AddLeave from "../pages/LeaveDashboard/LeaveDashboardForEmployee/AddLeave";

const RouteList = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Leave />} />
          <Route path="/add-leave" element={<AddLeave />} />
          <Route path="/leave-list" element={<LeaveList />} />
          {/* <Route path="/leave-status" element={<LeaveStatus />} /> */}
          <Route path="/leave-balance" element={<LeaveBalance />} />
          <Route path="/leave-request" element={<LeaveRequest />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RouteList;
