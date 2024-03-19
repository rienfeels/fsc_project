import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import MainWrapper from "./layouts/MainWrapper";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Register from "./views/Register";
import DailyReportForm from "./views/DailyReportForm";
import Dashboard from "./views/Dashboard";
import UpdateForm from "./views/UpdateForm";

function App() {
  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="daily-report-form" element={<DailyReportForm />} />
          <Route path="/reports/:reportId" element={<UpdateForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  );
}

export default App;
