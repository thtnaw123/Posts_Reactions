import React, { useState } from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { selectPostById, updatePost } from "./PostSlice";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UsersSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postId } = useParams();

  const users = useSelector(selectAllUsers);
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

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
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  return (
    <>
      {!post ? (
        <h1>Page not found!</h1>
      ) : (
        <div>
          <h2>Add Posts</h2>
          <form onSubmit={handleSubmit} className="post-form">
            <select
              id="author"
              defaultValue={userId}
              onChange={(e) => setUserId(Number(e.target.value))}
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
      )}
    </>
  );
};

export default EditPost;
