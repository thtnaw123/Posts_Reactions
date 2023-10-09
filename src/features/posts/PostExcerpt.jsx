import React from "react";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";
import { useDispatch } from "react-redux";
import { deletePost } from "./PostSlice";
import Author from "./Author";
import { Link } from "react-router-dom";

let PostExcerpt = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      <article className="unitPost">
        <div>
          <h2>{post.title}</h2>
          <h4>{post.body.substring(0, 75)} ...</h4>
          <Reactions reactions={post.reactions} postId={post.id} />
          <div className="post-footer">
            <Link
              style={{ color: "black", marginRight: "10px" }}
              to={`post/${post.id}`}
            >
              View Post
            </Link>
            <Author userId={post.userId} />
            <TimeAgo timestamp={post.date} />
          </div>
        </div>
        <button
          className="deleteBtn"
          onClick={() => {
            dispatch(deletePost({ id: post.id }));
          }}
        >
          X
        </button>
      </article>
    </div>
  );
};

PostExcerpt = React.memo(PostExcerpt);

export default PostExcerpt;
