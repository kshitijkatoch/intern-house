import { useState } from "react";
import { createJob } from "../api/jobs.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualifications: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(form).some((v) => !v)) {
      toast.error("All fields are required");
      return;
    }

    try {
      await createJob({
        ...form,
        salary: Number(form.salary),
        qualifications: form.qualifications.split(","),
      });
      toast.success("Job posted successfully");
      navigate("/");
    } catch {
      toast.error("Failed to post job");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Post a Job</h2>

      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="mb-3">
          <label className="form-label">Job Title:</label>
          <input
            type="text"
            className="form-control"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Company Name */}
        <div className="mb-3">
          <label className="form-label">Company Name:</label>
          <input
            type="text"
            className="form-control"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          />
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        {/* Salary */}
        <div className="mb-3">
          <label className="form-label">Salary:</label>
          <input
            type="number"
            className="form-control"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
        </div>

        {/* Job Type */}
        <div className="mb-3">
          <label className="form-label">Job Type:</label>
          <select
            className="form-select"
            value={form.jobType}
            onChange={(e) => setForm({ ...form, jobType: e.target.value })}
          >
            <option value="">Select job type</option>
            <option>Full-time (On-site)</option>
            <option>Part-time (On-site)</option>
            <option>Full-time (Remote)</option>
            <option>Part-time (Remote)</option>
          </select>
        </div>

        {/* Job Description */}
        <div className="mb-3">
          <label className="form-label">Job Description:</label>
          <textarea
            className="form-control"
            rows="2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Job Qualifications */}
        <div className="mb-4">
          <label className="form-label">Job Qualifications:</label>
          <textarea
            className="form-control"
            rows="2"
            value={form.qualifications}
            onChange={(e) =>
              setForm({ ...form, qualifications: e.target.value })
            }
          />
        </div>

        <button className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
