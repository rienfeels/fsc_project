import React, { useState } from "react";

const DailyReportForm = () => {
  const initialFormData = {
    user_id: 2,
    // date_submitted: "",
    road_name: "",
    contractor: "",
    workers: "",
    job_time_arrived: "",
    job_time_finished: "",
    color: "",
    material: "",
    line_type: "",
    white_footage: 0,
    white_size: "",
    yellow_footage: 0,
    yellow_size: "",
    dot_employee: false,
    // user: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Example: Send form data to backend API
      const response = await fetch("http://localhost:8000/api/daily-reports/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Report submitted successfully");
        // Reset form data after successful submission
        setFormData(initialFormData);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during report submission:", error.message);
      setSubmissionError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="user">User:</label>
        <input
          type="text"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
        />
        <label htmlFor="date_submitted">Date Submitted:</label>
        <input
          type="date"
          id="date_submitted"
          name="date_submitted"
          value={formData.date_submitted}
          onChange={handleChange}
        />
        <label htmlFor="road_name">Road Name:</label>
        <input
          type="text"
          id="road_name"
          name="road_name"
          value={formData.road_name}
          onChange={handleChange}
        />
        <label htmlFor="contractor">Contractor:</label>
        <input
          type="text"
          id="contractor"
          name="contractor"
          value={formData.contractor}
          onChange={handleChange}
        />
        <label htmlFor="workers">Number of Workers:</label>
        <input
          type="text"
          id="workers"
          name="workers"
          value={formData.workers}
          onChange={handleChange}
        />
        <label htmlFor="job_time_arrived">Job Time Arrived:</label>
        <input
          type="time"
          id="job_time_arrived"
          name="job_time_arrived"
          value={formData.job_time_arrived}
          onChange={handleChange}
        />
        <label htmlFor="job_time_finished">Job Time Finished:</label>
        <input
          type="time"
          id="job_time_finished"
          name="job_time_finished"
          value={formData.job_time_finished}
          onChange={handleChange}
        />
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <label htmlFor="material">Material:</label>
        <input
          type="text"
          id="material"
          name="material"
          value={formData.material}
          onChange={handleChange}
        />
        <label htmlFor="line_type">Line Type:</label>
        <input
          type="text"
          id="line_type"
          name="line_type"
          value={formData.line_type}
          onChange={handleChange}
        />
        <label htmlFor="white_footage">White Footage:</label>
        <input
          type="number"
          id="white_footage"
          name="white_footage"
          value={formData.white_footage}
          onChange={handleChange}
        />
        <label htmlFor="white_size">White Size:</label>
        <input
          type="text"
          id="white_size"
          name="white_size"
          value={formData.white_size}
          onChange={handleChange}
        />
        <label htmlFor="yellow_footage">Yellow Footage:</label>
        <input
          type="number"
          id="yellow_footage"
          name="yellow_footage"
          value={formData.yellow_footage}
          onChange={handleChange}
        />
        <label htmlFor="yellow_size">Yellow Size:</label>
        <input
          type="text"
          id="yellow_size"
          name="yellow_size"
          value={formData.yellow_size}
          onChange={handleChange}
        />
        <label htmlFor="dot_employee">DOT Employee:</label>
        <input
          type="checkbox"
          id="dot_employee"
          name="dot_employee"
          checked={formData.dot_employee}
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              dot_employee: e.target.checked,
            }))
          }
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {submissionError && <p className="error">{submissionError}</p>}
      </form>
    </div>
  );
};

export default DailyReportForm;
