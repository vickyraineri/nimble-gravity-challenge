import { useState } from "react";
import { applyToJob } from "../api/api";

function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage(null);

      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl,
      });

      setMessage("Application sent successfully!");
    } catch (err) {
      setMessage("Error sending application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-item">
      <h3>{job.title}</h3>
      <div className="input-container">
        <input
            type="text"
            placeholder="GitHub repository URL"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            style={{ width: "10rem" }}
        />
        <button onClick={handleSubmit} disabled={loading || !repoUrl}>
            {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default JobItem;