import React, { useState, useEffect } from "react";
import "./Dashboard.css"; // Import CSS file for styles

const Dashboard = () => {
  const [dailyReports, setDailyReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchDailyReports();
  }, []);

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

  const handleDownloadPDF = async (reportId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/generate-pdf/`);
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

  const renderReportList = () => {
    return (
      <div className="card-container">
        <ul>
          {" "}
          {/* Apply card-container class */}
          {dailyReports.map((report) => (
            <li
              key={report.id}
              onClick={() => handleReportClick(report)}
              className="card"
            >
              {" "}
              {/* Apply card class */}
              <span>{report.road_name}</span>
              {"  |  "}
              <span>{report.date_submitted}</span>
              {"  |  "}
              <span>{report.contractor}</span> <span>{report.workers}</span>
              {"  |  "}
              <span>{report.job_time_arrived}</span>
              {"  |  "}
              <span>{report.job_time_finished}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSelectedReport = () => {
    if (selectedReport) {
      return (
        <div>
          <button onClick={() => handleDownloadPDF(selectedReport.id)}>
            Download PDF
          </button>
          <h3>Selected Report</h3>
          <p>Road Name: {selectedReport.road_name}</p>
          <p>Contractor: {selectedReport.contractor}</p>
          <p>Workers: {selectedReport.workers}</p>
          <p>Job Time Arrived: {selectedReport.job_time_arrived}</p>
          <p>Job Time Finished: {selectedReport.job_time_finished}</p>
          <p>Color: {selectedReport.color}</p>
          <p>Material: {selectedReport.material}</p>
          <p>Line Type: {selectedReport.line_type}</p>
          <p>White Footage: {selectedReport.white_footage}</p>
          <p>White Size: {selectedReport.white_size}</p>
          <p>Yellow Footage: {selectedReport.yellow_footage}</p>
          <p>Yellow Size: {selectedReport.yellow_size}</p>
          <p>DOT Employee: {selectedReport.dot_employee}</p>
          <p>User: {selectedReport.user}</p>
          <p>ID: {selectedReport.id}</p>
        </div>
      );
    }
    return null;
  };

  return (
      <div>
        <h2>Daily Reports Dashboard</h2>
        <div>
          <div>
            <h3>Daily Reports</h3>
            {renderReportList()}
          </div>
          <div>{renderSelectedReport()}</div>
        </div>
      </div>
  );
};

export default Dashboard;
