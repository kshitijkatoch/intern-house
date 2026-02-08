import { Link } from "react-router-dom";

const JobCard = ({ job, onDelete }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body p-4">
        <h5 className="mb-3">{job.title}</h5>
        <p className="mb-2">
          <b>Company Name: </b> {job.companyName}
        </p>
        <p className="mb-2">
          <b>Location: </b>
          {job.location}
        </p>
        <p className="mb-2">
          <b>Job Type: </b>
          {job.jobType}
        </p>
        <div className="d-flex flex-wrap gap-3 mt-4">
          <Link
            className="col-md-4 col-12 btn btn-primary btn-sm"
            to={`/jobs/${job._id}`}
          >
            See Details
          </Link>
          <button
            className="col-md-4 col-12 btn btn-danger btn-sm"
            onClick={() => onDelete(job._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
