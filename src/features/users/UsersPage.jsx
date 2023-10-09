import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPostsByUser } from "../posts/PostSlice";
import { selectUserById } from "./UsersSlice";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const { userId } = useParams();
  const posts = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  return (
    <>
      <h1>{user[0]?.name}</h1>
      <h3>has {posts?.length} posts</h3>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            to={`/post/${post.id}`}
            style={{ color: "white", marginTop: "40px" }}
          >
            {post.title}
          </Link>
        </li>
      ))}
    </>
  );
};

export default UsersPage;
