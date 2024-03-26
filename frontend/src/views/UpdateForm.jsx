import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const { reportId } = useParams();
  const initialFormData = {
    user_id: 2,
    road_name: "",
    contractor: "",
    workers: "",
    job_time_arrived: "",
    job_time_finished: "",
    color: "",
    material: "",
    dot_employee: false,
  };
  // const [report, setReport] = useState({});
  const [formData, setFormData] = useState(initialFormData);
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await fetch(
        `https://master-7rqtwti-zknwxgnexcf4w.us.platformsh.site/api/get-daily-report/${reportId}/`
      );
      if (response.ok) {
        const data = await response.json();
        const formattedDate = data.date_submitted.split("T")[0];
        data.date_submitted = formattedDate;
        // setReport(data);
        setFormData(data);
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
        `https://master-7rqtwti-zknwxgnexcf4w.us.platformsh.site/api/daily-reports/${reportId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
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
    console.log("change handler called");
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevReport) => ({
      ...prevReport,
      [name]: value,
    }));
  };

  const renderInputs = () => {
    if (formData.color === "white") {
      return (
        <>
          <div className="form-input-container">
            <label htmlFor="white_line_type">White Line Type:</label>
            <select
              className="form-input"
              id="white_line_type"
              name="white_line_type"
              value={formData.white_line_type}
              onChange={handleChange}
            >
              <option value="">Select White Line Type</option>
              <option value="solid">Solid</option>
              <option value="skip">Skip</option>
              <option value="both">Both</option>
            </select>
          </div>
          {formData.white_line_type === "solid" && (
            <>
              <div className="form-input-container">
                <label htmlFor="white_footage">White Solid Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="white_solid_footage"
                  name="white_solid_footage"
                  value={formData.white_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_size">White Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_solid_size"
                  name="white_solid_size"
                  value={formData.white_solid_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.white_line_type === "skip" && (
            <>
              <div className="form-input-container">
                <label htmlFor="white_footage">White Skip Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="white_skip_footage"
                  name="white_skip_footage"
                  value={formData.white_skip_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_size">White Skip Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_skip_size"
                  name="white_skip_size"
                  value={formData.white_skip_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.white_line_type === "both" && (
            <>
              <div className="form-input-container">
                <label htmlFor="white_solid_footage">
                  White Solid Footage:
                </label>
                <input
                  className="form-input"
                  type="number"
                  id="white_solid_footage"
                  name="white_solid_footage"
                  value={formData.white_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_solid_size">White Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_solid_size"
                  name="white_solid_size"
                  value={formData.white_solid_size}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_skip_footage">White Skip Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="white_skip_footage"
                  name="white_skip_footage"
                  value={formData.white_skip_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_skip_size">White Skip Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_skip_size"
                  name="white_skip_size"
                  value={formData.white_skip_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </>
      );
    } else if (formData.color === "yellow") {
      return (
        <>
          <div className="form-input-container">
            <label htmlFor="yellow_line_type">Yellow Line Type:</label>
            <select
              className="form-input"
              id="yellow_line_type"
              name="yellow_line_type"
              value={formData.yellow_line_type}
              onChange={handleChange}
            >
              <option value="">Select Yellow Line Type</option>
              <option value="solid">Solid</option>
              <option value="skip">Skip</option>
              <option value="both">Both</option>
            </select>
          </div>
          {formData.yellow_line_type === "solid" && (
            <>
              <div className="form-input-container">
                <label htmlFor="yellow_footage">Yellow Solid Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_solid_footage"
                  name="yellow_solid_footage"
                  value={formData.yellow_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_size">Yellow Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_solid_size"
                  name="yellow_solid_size"
                  value={formData.yellow_solid_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.yellow_line_type === "skip" && (
            <>
              <div className="form-input-container">
                <label htmlFor="yellow_footage">Yellow Skip Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_skip_footage"
                  name="yellow_skip_footage"
                  value={formData.yellow_skip_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_size">Yellow Skip Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_skip_size"
                  name="yellow_skip_size"
                  value={formData.yellow_skip_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.yellow_line_type === "both" && (
            <>
              <div className="form-input-container">
                <label htmlFor="yellow_solid_footage">
                  Yellow Solid Footage:
                </label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_solid_footage"
                  name="yellow_solid_footage"
                  value={formData.yellow_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_solid_size">Yellow Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_solid_size"
                  name="yellow_solid_size"
                  value={formData.yellow_solid_size}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_skip_footage">
                  Yellow Skip Footage:
                </label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_skip_footage"
                  name="yellow_skip_footage"
                  value={formData.yellow_skip_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_skip_size">Yellow Skip Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_skip_size"
                  name="yellow_skip_size"
                  value={formData.yellow_skip_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </>
      );
    } else if (formData.color === "both") {
      return (
        <>
          <div className="form-input-container">
            <label htmlFor="white_line_type">White Line Type:</label>
            <select
              className="form-input"
              id="white_line_type"
              name="white_line_type"
              value={formData.white_line_type}
              onChange={handleChange}
            >
              <option value="">Select White Line Type</option>
              <option value="solid">Solid</option>
              <option value="skip">Skip</option>
              <option value="both">Both</option>
            </select>
          </div>
          {formData.white_line_type === "solid" && (
            <>
              <div className="form-input-container">
                <label htmlFor="white_footage">White Solid Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="white_solid_footage"
                  name="white_solid_footage"
                  value={formData.white_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_size">White Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_solid_size"
                  name="white_solid_size"
                  value={formData.white_solid_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.white_line_type === "skip" && (
            <>
              <div className="form-input-container">
                <label htmlFor="white_footage">White Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="white_footage"
                  name="white_footage"
                  value={formData.white_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_size">White Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_size"
                  name="white_size"
                  value={formData.white_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.white_line_type === "both" && (
            <>
              <div className="form-input-container">
                <label htmlFor="white_solid_footage">
                  White Solid Footage:
                </label>
                <input
                  className="form-input"
                  type="number"
                  id="white_solid_footage"
                  name="white_solid_footage"
                  value={formData.white_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_solid_size">White Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_solid_size"
                  name="white_solid_size"
                  value={formData.white_solid_size}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_skip_footage">White Skip Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="white_skip_footage"
                  name="white_skip_footage"
                  value={formData.white_skip_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="white_skip_size">White Skip Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="white_skip_size"
                  name="white_skip_size"
                  value={formData.white_skip_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="form-input-container">
            <label htmlFor="yellow_line_type">Yellow Line Type:</label>
            <select
              className="form-input"
              id="yellow_line_type"
              name="yellow_line_type"
              value={formData.yellow_line_type}
              onChange={handleChange}
            >
              <option value="">Select Yellow Line Type</option>
              <option value="solid">Solid</option>
              <option value="skip">Skip</option>
              <option value="both">Both</option>
            </select>
          </div>
          {formData.yellow_line_type === "solid" && (
            <>
              <div className="form-input-container">
                <label htmlFor="yellow_footage">Yellow Solid Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_solid_footage"
                  name="yellow_solid_footage"
                  value={formData.yellow_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_size">Yellow Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_solid_size"
                  name="yellow_solid_size"
                  value={formData.yellow_solid_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.yellow_line_type === "skip" && (
            <>
              <div className="form-input-container">
                <label htmlFor="yellow_footage">Yellow Skip Footage:</label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_skip_footage"
                  name="yellow_skip_footage"
                  value={formData.yellow_skip_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_size">Yellow Skip Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_skip_size"
                  name="yellow_skip_size"
                  value={formData.yellow_skip_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          {formData.yellow_line_type === "both" && (
            <>
              <div className="form-input-container">
                <label htmlFor="yellow_solid_footage">
                  Yellow Solid Footage:
                </label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_solid_footage"
                  name="yellow_solid_footage"
                  value={formData.yellow_solid_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_solid_size">Yellow Solid Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_solid_size"
                  name="yellow_solid_size"
                  value={formData.yellow_solid_size}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_skip_footage">
                  Yellow Skip Footage:
                </label>
                <input
                  className="form-input"
                  type="number"
                  id="yellow_skip_footage"
                  name="yellow_skip_footage"
                  value={formData.yellow_skip_footage}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="yellow_skip_size">Yellow Skip Size:</label>
                <input
                  className="form-input"
                  type="text"
                  id="yellow_skip_size"
                  name="yellow_skip_size"
                  value={formData.yellow_skip_size}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </>
      );
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="user">User:</label>
          </div>
          <input
            className="form-input"
            type="text"
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="date_submitted">Date Submitted:</label>
          </div>
          <input
            className="form-input"
            type="date"
            id="date_submitted"
            name="date_submitted"
            value={formData.date_submitted}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="road_name">Road Name:</label>
          </div>
          <input
            className="form-input"
            type="text"
            id="road_name"
            name="road_name"
            value={formData.road_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="contractor">Contractor:</label>
          </div>
          <input
            className="form-input"
            type="text"
            id="contractor"
            name="contractor"
            value={formData.contractor}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="workers">Workers:</label>
          </div>
          <input
            className="form-input"
            type="text"
            id="workers"
            name="workers"
            value={formData.workers}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="job_time_arrived">Job Time Arrived:</label>
          </div>
          <input
            className="form-input"
            type="time"
            id="job_time_arrived"
            name="job_time_arrived"
            value={formData.job_time_arrived}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="job_time_finished">Job Time Finished:</label>
          </div>
          <input
            className="form-input"
            type="time"
            id="job_time_finished"
            name="job_time_finished"
            value={formData.job_time_finished}
            onChange={handleChange}
          />
        </div>
        <div className="form-input-container">
          <label htmlFor="color">Color:</label>
          <select
            className="form-input"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          >
            <option value="">Select Color</option>
            <option value="white">White</option>
            <option value="yellow">Yellow</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="material">Material:</label>
          </div>
          <input
            className="form-input"
            type="text"
            id="material"
            name="material"
            value={formData.material}
            onChange={handleChange}
          />
        </div>

        <div className="form-input-container">
          <div className="form-label">
            <label htmlFor="dot_employee">DOT Employee:</label>
          </div>
          <input
            className="form-input"
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
        </div>
        {renderInputs()}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {submissionError && <p className="error">{submissionError}</p>}
      </form>
    </div>
  );
};

export default UpdateForm;
