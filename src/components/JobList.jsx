import JobItem from "./JobItem";

function JobList({ jobs, candidate }) {
  return (
    <div>
      <h2>Open Positions</h2>
      <div className="open-positions">
        {jobs.map((job) => (
            <JobItem key={job.id} job={job} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
