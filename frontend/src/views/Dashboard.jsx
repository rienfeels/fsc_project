import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./DashHeader";
import "./Dashboard.css"; // Import CSS file for styles

const Dashboard = () => {
  const [dailyReports, setDailyReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [report, setReport] = useState({});

  useEffect(() => {
    fetchDailyReports();
  }, []);

  const handleDelete = () => {
    console.log("selectedReport", selectedReport);
    fetch(
      `http://localhost:8000/api/get-daily-report/delete/${selectedReport.id}/`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          const updatedReports = dailyReports.filter(
            (report) => report.id !== selectedReport.id
          );
          setDailyReports(updatedReports);
          setSelectedReport(null);
        } else {
          throw new Error("Failed to delete report");
        }
      })
      .catch((error) => {
        console.error("Error deleting report:", error);
      });
  };

  const fetchDailyReports = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/daily-reports/");
      if (response.ok) {
        const data = await response.json();
        setDailyReports(data);
      } else {
        console.error("Error fetching daily reports");
      }
    } catch (error) {
      console.error("Error fetching daily reports:", error.message);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/generate-pdf/${selectedReport.id}/`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "daily_reports.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download PDF");
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleReportClick = (report) => {
    setSelectedReport(report);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are 0-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert midnight to 12 AM
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
  };

  const renderReportList = () => {
    return (
      <div className="report-container">
        <div className="card-container">
          <ul>
            {" "}
            {dailyReports.map((report) => (
              <li
                key={report.id}
                onClick={() => handleReportClick(report)}
                className="card"
              >
                {" "}
                <span>{report.road_name}</span>
                {"  |  "}
                <span>{formatDate(report.date_submitted)}</span>
                {"  |  "}
                <span>{report.contractor}</span> <span>{report.workers}</span>
                {"  |  "}
                <span>{formatTime(report.job_time_arrived)}</span>
                {"  |  "}
                <span>{formatTime(report.job_time_finished)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const renderSelectedReport = () => {
    if (selectedReport) {
      return (
        <div>
          <div className="selected-report-container">
            <h3>Selected Report</h3>
            <p>Date Submitted: {formatDate(selectedReport.date_submitted)}</p>
            <p>Road Name: {selectedReport.road_name}</p>
            <p>Contractor: {selectedReport.contractor}</p>
            <p>Workers: {selectedReport.workers}</p>
            <p>
              Job Time Arrived: {formatTime(selectedReport.job_time_arrived)}
            </p>
            <p>
              Job Time Finished: {formatTime(selectedReport.job_time_finished)}
            </p>
            <p>Color: {selectedReport.color}</p>
            <p>Material: {selectedReport.material}</p>
            <p>DOT Employee: {selectedReport.dot_employee ? "Yes" : "No"}</p>
            <p>User: {selectedReport.user}</p>
            <p>ID: {selectedReport.id}</p>
            {selectedReport.color === "white" && (
              <>
                <p>Line Type: {selectedReport.line_type}</p>
                {selectedReport.line_type === "solid" && (
                  <>
                    <p>
                      White Solid Footage: {selectedReport.white_solid_footage}
                    </p>
                    <p>White Solid Size: {selectedReport.white_solid_size}</p>
                  </>
                )}
                {selectedReport.line_type === "skip" && (
                  <>
                    <p>
                      White Skip Footage: {selectedReport.white_skip_footage}
                    </p>
                    <p>White Skip Size: {selectedReport.white_skip_size}</p>
                  </>
                )}
                {selectedReport.line_type === "both" && (
                  <>
                    <p>
                      White Solid Footage: {selectedReport.white_solid_footage}
                    </p>
                    <p>White Solid Size: {selectedReport.white_solid_size}</p>
                    <p>
                      White Skip Footage: {selectedReport.white_skip_footage}
                    </p>
                    <p>White Skip Size: {selectedReport.white_skip_size}</p>
                  </>
                )}
              </>
            )}
            {selectedReport.color === "yellow" && (
              <>
                <p>Line Type: {selectedReport.line_type}</p>
                {selectedReport.line_type === "solid" && (
                  <>
                    <p>
                      Yellow Solid Footage:{" "}
                      {selectedReport.yellow_solid_footage}
                    </p>
                    <p>Yellow Solid Size: {selectedReport.yellow_solid_size}</p>
                  </>
                )}
                {selectedReport.line_type === "skip" && (
                  <>
                    <p>
                      Yellow Skip Footage: {selectedReport.yellow_skip_footage}
                    </p>
                    <p>Yellow Skip Size: {selectedReport.yellow_skip_size}</p>
                  </>
                )}
                {selectedReport.line_type === "both" && (
                  <>
                    <p>
                      Yellow Solid Footage:{" "}
                      {selectedReport.yellow_solid_footage}
                    </p>
                    <p>Yellow Solid Size: {selectedReport.yellow_solid_size}</p>
                    <p>
                      Yellow Skip Footage: {selectedReport.yellow_skip_footage}
                    </p>
                    <p>Yellow Skip Size: {selectedReport.yellow_skip_size}</p>
                  </>
                )}
              </>
            )}
            {selectedReport.color === "both" && (
              <>
                <p>White Line Type: {selectedReport.white_line_type}</p>
                {selectedReport.white_line_type === "solid" && (
                  <>
                    <p>
                      White Solid Footage: {selectedReport.white_solid_footage}
                    </p>
                    <p>White Solid Size: {selectedReport.white_solid_size}</p>
                  </>
                )}
                {selectedReport.white_line_type === "skip" && (
                  <>
                    <p>
                      White Skip Footage: {selectedReport.white_skip_footage}
                    </p>
                    <p>White Skip Size: {selectedReport.white_skip_size}</p>
                  </>
                )}
                {selectedReport.white_line_type === "both" && (
                  <>
                    <p>
                      White Solid Footage: {selectedReport.white_solid_footage}
                    </p>
                    <p>White Solid Size: {selectedReport.white_solid_size}</p>
                    <p>
                      White Skip Footage: {selectedReport.white_skip_footage}
                    </p>
                    <p>White Skip Size: {selectedReport.white_skip_size}</p>
                  </>
                )}
                <p>Yellow Line Type: {selectedReport.yellow_line_type}</p>
                {selectedReport.yellow_line_type === "solid" && (
                  <>
                    <p>
                      Yellow Solid Footage:{" "}
                      {selectedReport.yellow_solid_footage}
                    </p>
                    <p>Yellow Solid Size: {selectedReport.yellow_solid_size}</p>
                  </>
                )}
                {selectedReport.yellow_line_type === "skip" && (
                  <>
                    <p>
                      Yellow Skip Footage: {selectedReport.yellow_skip_footage}
                    </p>
                    <p>Yellow Skip Size: {selectedReport.yellow_skip_size}</p>
                  </>
                )}
                {selectedReport.yellow_line_type === "both" && (
                  <>
                    <p>
                      Yellow Solid Footage:{" "}
                      {selectedReport.yellow_solid_footage}
                    </p>
                    <p>Yellow Solid Size: {selectedReport.yellow_solid_size}</p>
                    <p>
                      Yellow Skip Footage: {selectedReport.yellow_skip_footage}
                    </p>
                    <p>Yellow Skip Size: {selectedReport.yellow_skip_size}</p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Header />
      <h2>Daily Reports Dashboard</h2>
      <div>
        <div>
          <h3>Daily Reports</h3>
          {renderReportList()}
        </div>
        <div>
          {renderSelectedReport()}
          {selectedReport && (
            <div>
              <button onClick={handleDownloadPDF}>Download PDF</button>
              <Link to={`/reports/${selectedReport.id}`}>
                <button>Edit Report</button>
              </Link>
              <button onClick={handleDelete}>
                Delete Report {selectedReport.id}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
