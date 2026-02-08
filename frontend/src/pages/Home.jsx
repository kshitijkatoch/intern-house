import { useEffect, useState } from "react";
import { getAllJobs, deleteJob } from "../api/jobs.api";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      setJobs(res.data);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Job deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()),
  );

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

  if (!loading && jobs.length === 0) {
    return (
      <div className="text-center mt-5">
        <h5>No jobs available</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <input
        className="form-control mb-4"
        placeholder="Search by job title..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <h1 className="mb-3">All Jobs</h1>
      <div className="row">
        {filteredJobs.map((job) => (
          <div className="col-md-4 mb-4" key={job._id}>
            <JobCard job={job} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
