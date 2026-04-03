import { useEffect, useState } from "react";
import { getJobs, createJob, getAnalytics } from "./api/api";
import JobCard from "./components/JobCard";
import AnalyticsChart from "./components/AnalyticsChart";

function App() {
  const [jobs, setJobs] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");

  const loadJobs = async () => {
    const res = await getJobs();
    setJobs(res.data);
  };

  

  const loadAnalytics = async () => {
    try {
      const res = await getAnalytics();
      setAnalytics(res.data);
    } catch {
      setAnalytics({
        totalApplications: 0,
        interviews: 0,
        offers: 0,
        responseRate: "0%"
      });
    }
  };

  const refresh = () => {
    loadJobs();
    loadAnalytics();
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async () => {
    if (!title || !company) return;

    await createJob({ title, company, location, link });

    setTitle("");
    setCompany("");
    setLocation("");
    setLink("");

    refresh();

  };

  

return (
  <div className="container">
    <h1> Smart Job Tracker</h1>

    {/* FORM */}
    <div className="form">
      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        placeholder="Job Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button className="btn-primary" onClick={handleCreate}>
        Add Job
      </button>
    </div>

    {/* ANALYTICS */}
    {analytics && (
<div className="analytics">
  <div className="stat total">
    <h3>{analytics.totalApplications}</h3>
    <p>Total</p>
  </div>

  <div className="stat interviews">
    <h3>{analytics.interviews}</h3>
    <p>Interviews</p>
  </div>

  <div className="stat offers">
    <h3>{analytics.offers}</h3>
    <p>Offers</p>
  </div>

  <div className="stat rate">
    <h3>{analytics.responseRate}</h3>
    <p>Response Rate</p>
  </div>
</div>



    )}

    {analytics && <AnalyticsChart analytics={analytics} />}

    {/* JOBS */}
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} refresh={refresh} />
      ))}
    </div>
  </div>
);



}

export default App;