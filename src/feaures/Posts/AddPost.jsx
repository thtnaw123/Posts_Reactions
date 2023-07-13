import React, { useState } from "react";
import { addPost, selectAllPosts } from "./PostSlices";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectAllUser } from "../Users/UserSlices";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState();

  const dispatch = useDispatch();
  const users = useSelector(selectAllUser);
  const posts = useSelector(selectAllPosts);

  const handleSubmits = (e) => {
    e.preventDefault();
    console.log({ title, content, userId });

    if (title && content) {
      dispatch(
        addPost({
          id: posts.length + 1,
          title,
          content,
          userId: userId,
          reactions: { thumbsup: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
        })
      );
    }
    setTitle("");
    setContent("");
    setUserId(0);
  };

  const canSave = Boolean(title && content);
  return (
    <div>
      <form action="" className="post-form" onSubmit={(e) => handleSubmits(e)}>
        <select
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input type="submit" disabled={!canSave} />
      </form>
    </div>
  );
};

export default AddPost;
