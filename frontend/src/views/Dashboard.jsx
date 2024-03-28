import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./DashHeader";
import "./Dashboard.css"; // Import CSS file for styles

const Dashboard = () => {
  const [dailyReports, setDailyReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [report, setReport] = useState({});
  const [filters, setFilters] = useState({
    road_name: "",
    date_submitted: "",
    contractor: "",
  });
  const [filterType, setFilterType] = useState("road_name");
  const [selectedFilterType, setSelectedFilterType] = useState("road_name");
  const selectedReportRef = useRef(null);

  useEffect(() => {
    fetchDailyReports();
  }, []);

  const handleDelete = () => {
    console.log("selectedReport", selectedReport);
    fetch(
      `https://master-7rqtwti-zknwxgnexcf4w.us.platformsh.site/api/get-daily-report/delete/${selectedReport.id}/`,
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
      const response = await fetch(
        "https://master-7rqtwti-zknwxgnexcf4w.us.platformsh.site/api/daily-reports/"
      );
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
        `https://master-7rqtwti-zknwxgnexcf4w.us.platformsh.site/api/generate-pdf/${selectedReport.id}/`
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
    // Ensure the element is scrolled into view after it has been updated
    setTimeout(() => {
      selectedReportRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
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

  const formatDateForFilter = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are 0-based
    const day = date.getDate();
    const year = date.getFullYear();
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  };

  const handleDateChange = (e) => {
    const newDate = e.target.valueAsDate;
    const formattedDate = newDate.toISOString().split("T")[0];

    setFilters({
      ...filters,
      date_submitted: formattedDate,
    });
  };

  const renderReportList = () => {
    const filteredReports = dailyReports.filter((report) => {
      console.log(report);
      switch (selectedFilterType) {
        case "road_name":
          return (
            filters.road_name === "" ||
            report.road_name
              .toLowerCase()
              .includes(filters.road_name.toLowerCase())
          );
        case "contractor":
          return (
            filters.contractor === "" ||
            report.contractor
              .toLowerCase()
              .includes(filters.contractor.toLowerCase())
          );
        case "date_submitted":
          if (filters.date_submitted === "") {
            return true;
          } else {
            // Convert both dates to a comparable format

            const selectedDate = new Date(filters.date_submitted);
            const reportDate = new Date(report.date_submitted);

            const timezone = selectedDate.getTimezoneOffset();
            const compareDate = new Date(
              selectedDate.getTime() + timezone * 60000
            );
            // const formattedInputDate = formatDate(
            //   selectedDate.toISOString().split("T")[0]
            // );

            // const formattedReportDate = formatDate(report.date_submitted);
            console.log("comparedDate", formatDate(compareDate));
            console.log("reportDate", formatDate(reportDate));
            return formatDate(reportDate) <= formatDate(compareDate);
          }
        default:
          return true; // Always return true if the filter type doesn't match expected cases to ensure no unintended filtering.
      }
    });

    return (
      <div>
        <div className="card-container">
          <ul>
            {" "}
            {filteredReports.map((report) => (
              <li
                key={report.id}
                onClick={() => handleReportClick(report)}
                className="card"
              >
                {" "}
                <span>{report.road_name}</span>
                {"   |   "}
                <span>{formatDate(report.date_submitted)}</span>
                {"   |   "}
                <span>{report.contractor}</span>
                {"   |   "}
                <span>{report.workers}</span>
                {"   |   "}
                <span>{formatTime(report.job_time_arrived)}</span>
                {"   |   "}
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
        <div ref={selectedReportRef}>
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
              </>
            )}
            {selectedReport.color === "yellow" && (
              <>
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
      <h2>Daily Reports Dashboard</h2>
      <Header />
      <div className="report-container">
        <div className="filter-container">
          <select
            value={selectedFilterType}
            onChange={(e) => setSelectedFilterType(e.target.value)}
          >
            <option value="road_name">Road Name</option>
            <option value="contractor">Contractor</option>
            <option value="date_submitted">Date Submitted</option>
          </select>

          {selectedFilterType === "road_name" && (
            <input
              type="text"
              placeholder="Road Name"
              value={filters.road_name}
              onChange={(e) =>
                setFilters({ ...filters, road_name: e.target.value })
              }
            />
          )}

          {selectedFilterType === "date_submitted" && (
            <input
              type="date"
              placeholder="Date Submitted"
              value={filters.date_submitted}
              onChange={handleDateChange}
            />
          )}

          {selectedFilterType === "contractor" && (
            <input
              type="text"
              placeholder="Contractor"
              value={filters.contractor}
              onChange={(e) =>
                setFilters({ ...filters, contractor: e.target.value })
              }
            />
          )}
        </div>

        {/* <h3>Daily Reports</h3> */}
        {renderReportList()}
        {renderSelectedReport()}
        {selectedReport && (
          <div className="button-trio">
            <div className="div-buttons">
              <button
                className="button2"
                type="button"
                onClick={handleDownloadPDF}
              >
                <span className="button__text">Download</span>
                <span className="button__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35 35"
                    id="bdd05811-e15d-428c-bb53-8661459f9307"
                    data-name="Layer 2"
                    className="svg"
                  >
                    <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                    <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                    <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="div-buttons">
              <Link to={`/reports/${selectedReport.id}`}>
                <button className="button2" type="button">
                  <span className="button__text">Edit</span>
                  <span className="button__icon">
                    <svg
                      fill="#000000"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16px"
                      height="16px"
                      viewBox="0 0 494.936 494.936"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path>
                            <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </span>
                </button>
              </Link>
            </div>

            <div className="div-buttons">
              <button onClick={handleDelete} className="button2" type="button">
                <span className="button__text">Delete</span>
                <span className="button__icon">
                  <svg
                    fill="#000000"
                    width="16px"
                    height="16px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#000000"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M4,23H20a1,1,0,0,0,1-1V6a1,1,0,0,0-.293-.707l-4-4A1,1,0,0,0,16,1H4A1,1,0,0,0,3,2V22A1,1,0,0,0,4,23ZM5,3H15.586L19,6.414V21H5Zm10.207,7.207L13.414,12l1.793,1.793a1,1,0,1,1-1.414,1.414L12,13.414l-1.793,1.793a1,1,0,0,1-1.414-1.414L10.586,12,8.793,10.207a1,1,0,0,1,1.414-1.414L12,10.586l1.793-1.793a1,1,0,0,1,1.414,1.414Z"></path>
                    </g>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
