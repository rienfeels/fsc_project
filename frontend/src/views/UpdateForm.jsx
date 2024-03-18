import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState({});

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get-daily-report/${reportId}/`
      );
      if (response.ok) {
        const data = await response.json();
        setReport(data);
      } else {
        console.error("Error fetching report");
      }
    } catch (error) {
      console.error("Error fetching report:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/daily-reports/${reportId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(report),
        }
      );
      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        console.error("Failed to update report");
      }
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="user">User:</label>
      <input
        type="text"
        id="user"
        name="user"
        value={report.user}
        onChange={handleChange}
      />
      {/* <label htmlFor="date_submitted">Date Submitted:</label>
      <input
        type="date"
        id="date_submitted"
        name="date_submitted"
        value={report.date_submitted}
        onChange={handleChange}
      /> */}
      <label htmlFor="road_name">Road Name:</label>
      <input
        type="text"
        id="road_name"
        name="road_name"
        value={report.road_name}
        onChange={handleChange}
      />
      <label htmlFor="contractor">Contractor:</label>
      <input
        type="text"
        id="contractor"
        name="contractor"
        value={report.contractor}
        onChange={handleChange}
      />
      <label htmlFor="workers">Number of Workers:</label>
      <input
        type="text"
        id="workers"
        name="workers"
        value={report.workers}
        onChange={handleChange}
      />
      <label htmlFor="job_time_arrived">Job Time Arrived:</label>
      <input
        type="time"
        id="job_time_arrived"
        name="job_time_arrived"
        value={report.job_time_arrived}
        onChange={handleChange}
      />
      <label htmlFor="job_time_finished">Job Time Finished:</label>
      <input
        type="time"
        id="job_time_finished"
        name="job_time_finished"
        value={report.job_time_finished}
        onChange={handleChange}
      />
      <label htmlFor="color">Color:</label>
      <input
        type="text"
        id="color"
        name="color"
        value={report.color}
        onChange={handleChange}
      />
      <label htmlFor="material">Material:</label>
      <input
        type="text"
        id="material"
        name="material"
        value={report.material}
        onChange={handleChange}
      />
      <label htmlFor="line_type">Line Type:</label>
      <input
        type="text"
        id="line_type"
        name="line_type"
        value={report.line_type}
        onChange={handleChange}
      />

      <label htmlFor="white_footage">White Footage:</label>
      <input
        type="text"
        id="white_footage"
        name="white_footage"
        value={report.white_footage}
        onChange={handleChange}
      />
      <label htmlFor="white_size">White Size:</label>
      <input
        type="text"
        id="white_size"
        name="white_size"
        value={report.white_size}
        onChange={handleChange}
      />

      <label htmlFor="yellow_footage">Yellow Footage:</label>
      <input
        type="text"
        id="yellow_footage"
        name="yellow_footage"
        value={report.yellow_footage}
        onChange={handleChange}
      />
      <label htmlFor="yellow_size">Yellow Size:</label>
      <input
        type="text"
        id="yellow_size"
        name="yellow_size"
        value={report.yellow_size}
        onChange={handleChange}
      />

      <label htmlFor="dot_employee">DOT Employee:</label>
      <input
        type="text"
        id="dot_employee"
        name="dot_employee"
        value={report.dot_employee}
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateForm;
