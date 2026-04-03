import axios from "axios";

const API = "http://localhost:5000";

// JOBS
export const getJobs = () => axios.get(`${API}/jobs`);
export const createJob = (data) => axios.post(`${API}/jobs`, data);
export const updateJob = (id, status) =>
  axios.put(`${API}/jobs/${id}`, { status });

// ANALYTICS
export const getAnalytics = () =>
  axios.get(`${API}/analytics/summary`);

// NOTES
export const addNote = (jobId, content) =>
  axios.post(`${API}/jobs/${jobId}/notes`, { content });

export const getNotes = (jobId) =>
  axios.get(`${API}/jobs/${jobId}/notes`);

//delete
export const deleteJob = (id) =>
  axios.delete(`http://localhost:5000/jobs/${id}`);