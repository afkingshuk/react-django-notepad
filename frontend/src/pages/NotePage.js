import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  // let noteId = match.params.id;
  let noteId = useParams();
  let history = useNavigate();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId]);

  let getNote = async () => {
    if (noteId.id === "new") return;

    let response = await fetch(`/api/notes/${noteId.id}`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    fetch(`/api/notes/${noteId.id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let createNote = async () => {
    fetch(`/api/notes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/api/notes/${noteId.id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    history("/");
  };

  let handleSubmit = () => {
    if (noteId.id !== "new" && note.body === "") {
      deleteNote();
    } else if (noteId.id !== "new") {
      updateNote();
    } else if (noteId.id === "new" && note !== null) {
      createNote();
    }
    updateNote();
    history("/");
  };

  let handleChange = (value) => {
    setNote({ ...note, body: value });
    console.log("Handle change: " + note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId.id !== "new" ? (
          <button onClick={deleteNote}>DELETE</button>
        ) : (
          <button onClick={handleSubmit}> Done</button>
        )}
      </div>
      {/* <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        defaultValue={note?.body}
      ></textarea> */}

      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
