import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobById } from "../api/jobs.api";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await getJobById(id);
        setJob(res.data);
      } catch {
        toast.error("Job not found");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mt-5 text-center">
        <h5>Job not found</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">{job.title}</h2>
      <div className="border p-4">
        <p>
          <strong>Company Name:</strong> {job.companyName}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Salary:</strong> ₹{job.salary}
        </p>
        <p>
          <strong>Job Type:</strong> {job.jobType}
        </p>

        <p>
          <strong>Description: </strong> {job.description}
        </p>

        <strong>Qualifications: </strong>
        <ol>
          {job.qualifications.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default JobDetails;
