import React, { useState } from "react";
import Headers from "./ReportHeader";
import { useNavigate } from "react-router-dom";
import Header from "./DashHeader";
// import { useHistory } from "react-router-dom";

const DailyReportForm = () => {
  const initialFormData = {
    user_id: 2,
    road_name: "",
    contract_number: "",
    contractor: "",
    workers: "",
    job_time_arrived: "",
    job_time_finished: "",
    color: "",
    material: "",
    // white_footage: 0,
    // white_size: "",
    // yellow_footage: 0,
    // yellow_size: "",
    dot_employee: false,
    dot_employee_name: "",
    hand_work: false,
    stop_bars: "",
    arrows: "",
    onlys: "",
    railroad_crossing: "",
    rpm: "",
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const submitButton = document.querySelector(".submit-button");
    submitButton.classList.add("animating");

    setTimeout(() => {
      submitButton.classList.remove("animating");
      setIsSubmitting(false);
    }, 2000);

    try {
      const response = await fetch(
        "https://master-7rqtwti-zknwxgnexcf4w.us.platformsh.site/api/daily-reports/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Report submitted successfully");
        setFormData(initialFormData);
        navigate("/dashboard");
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
    <div>
      <Headers />
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
            <label htmlFor="contract_number">Contract Number:</label>
            <input
              className="form-input"
              type="text"
              id="contract_number"
              name="contract_number"
              value={formData.contract_number}
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
              onChange={handleChange}
            />
          </div>

          {formData.dot_employee && ( // Conditionally render the input field
            <div className="form-input-container">
              <div className="form-label">
                <label htmlFor="dot_employee_name">DOT Employee Name/ID:</label>
              </div>
              <input
                className="form-input"
                type="text"
                id="dot_employee_name"
                name="dot_employee_name"
                value={formData.dot_employee_name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-input-container">
            <label htmlFor="hand_work">Hand Work:</label>
            <input
              className="form-input"
              type="checkbox"
              id="hand_work"
              name="hand_work"
              checked={formData.hand_work}
              onChange={handleChange}
            />
          </div>

          {formData.hand_work && (
            <>
              <div className="form-input-container">
                <label htmlFor="stop_bars">Stop Bars:</label>
                <input
                  className="form-input"
                  type="text"
                  id="stop_bars"
                  name="stop_bars"
                  value={formData.stop_bars}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="arrows">Arrows:</label>
                <input
                  className="form-input"
                  type="text"
                  id="arrows"
                  name="arrows"
                  value={formData.arrows}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="onlys">Onlys:</label>
                <input
                  className="form-input"
                  type="text"
                  id="onlys"
                  name="onlys"
                  value={formData.onlys}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="railroad_crossing">Railroad Crossing:</label>
                <input
                  className="form-input"
                  type="text"
                  id="railroad_crossing"
                  name="railroad_crossing"
                  value={formData.railroad_crossing}
                  onChange={handleChange}
                />
              </div>
              <div className="form-input-container">
                <label htmlFor="rpm">RPM:</label>
                <input
                  className="form-input"
                  type="text"
                  id="rpm"
                  name="rpm"
                  value={formData.rpm}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {renderInputs()}
          <div className="submit-div">
            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              <p className="submit-p">
                {isSubmitting ? "Submitting..." : "Submit"}
              </p>
            </button>
          </div>

          {submissionError && <p className="error">{submissionError}</p>}
        </form>
      </div>
    </div>
  );
};

export default DailyReportForm;
