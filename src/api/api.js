const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const getCandidateByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);

    if(!res.ok) {
        throw new Error("Candidate not found");
    }

    return res.json();
};

export async function getJobs() {
  const res = await fetch(`${BASE_URL}/api/jobs/get-list`);
  if (!res.ok) {
    throw new Error("Error fetching jobs");
  }
  return res.json();
}

export async function applyToJob(body) {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Error applying to job");
  }

  return res.json();
}
