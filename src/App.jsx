import { useState } from "react";
import { getCandidateByEmail, getJobs } from "./api/api";
import JobList from "./components/JobList";

function App() {
  const [email, setEmail] = useState("");
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLoadData = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const candidateData = await getCandidateByEmail(email);
      const jobsData = await getJobs();

      setCandidate(candidateData);
      setJobs(jobsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Nimble Gravity Positions</h1>

      {!candidate && (
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLoadData}>Load Positions</button>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {candidate && (
        <JobList jobs={jobs} candidate={candidate} />
      )}
    </div>
  );
}

export default App;
