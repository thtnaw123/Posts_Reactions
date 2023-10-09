import React, { useState } from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { addNewPost } from "./PostSlice";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UsersSlice";
import { useNavigate } from "react-router-dom";

const AddPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const UsersOptions = () => {
    return users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <div>
      <h2>Add Posts</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <select
          name="user"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">select author</option>
          <UsersOptions />
        </select>

        <input
          type="text"
          name="title"
          placeholder="enter title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="content"
          placeholder="enter content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" disabled={!canSave} name="save post">
          save post
        </button>
      </form>
    </div>
  );
};

export default AddPosts;
