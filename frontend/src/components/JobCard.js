import { useEffect, useState } from "react";
import { addNote, getNotes, updateJob, deleteJob } from "../api/api";


function JobCard({ job, refresh }) {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  const loadNotes = async () => {
    try {
      const res = await getNotes(job.id);
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to load notes", err);
    }
  };

  const handleDelete = async () => {
  const confirmDelete = window.confirm("Delete this job?");
  if (!confirmDelete) return;

  await deleteJob(job.id);
  refresh(); // reload jobs + analytics
};

  useEffect(() => {
    loadNotes();
  }, []);

const handleAddNote = async () => {
  if (!noteInput.trim()) return; 

  try {
    await addNote(job.id, noteInput);
    setNoteInput("");
    loadNotes();
  } catch (err) {
    console.error("Add note failed", err);
  }
};

  const handleStatus = async (status) => {
    try {
      await updateJob(job.id, status);
      refresh(); // reload jobs + analytics
    } catch (err) {
      console.error(err);
    }
  };

return (
<div className={`card ${job.status.toLowerCase()}`}>
    <h3>{job.title}</h3>

    <p>
      {job.company} — {job.location || "No location"}
    </p>

    <p>Role: {job.roleType}</p>
    <p>Status: {job.status}</p>

    {job.link && (
      <a href={job.link} target="_blank" rel="noreferrer">
        🔗 View Job
      </a>
    )}

    <div style={{ marginTop: "10px" }}>
      <button
        className="btn-secondary"
        onClick={() => handleStatus("SCREENING")}
      >
        Screening
      </button>

      <button
        className="btn-secondary"
        onClick={() => handleStatus("INTERVIEW")}
      >
        Interview
      </button>

      <button
        className="btn-secondary"
        onClick={() => handleStatus("OFFER")}
      >
        Offer
      </button>

      <button
        className="btn-danger"
        onClick={handleDelete}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>

    {/* NOTES */}
    <div style={{ marginTop: "10px" }}>
      <h4> Notes</h4>

      {notes.map((note) => (
        <div key={note.id}>- {note.content}</div>
      ))}

      <input
        placeholder="Add note..."
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
      />

      <button className="btn-primary" onClick={handleAddNote}>
        Add
      </button>
    </div>
  </div>
);





}

export default JobCard;