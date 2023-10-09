import React from "react";
import { useSelector } from "react-redux";
import { selectPostById, selectPostStatus } from "./PostSlice";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";
import Author from "./Author";
import { Link, useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();
  const SinglePost = useSelector((state) =>
    selectPostById(state, Number(postId))
  );
  const postStatus = useSelector(selectPostStatus);
  return (
    <div>
      {postStatus === "succeeded" && SinglePost ? (
        <article className="unitPost">
          <div>
            <h2>{SinglePost.title}</h2>
            <h4>{SinglePost.body.substring(0, 100)}</h4>
            <Reactions
              reactions={SinglePost.reactions}
              postId={SinglePost.id}
            />
            <div className="post-footer">
              <Link
                style={{ color: "black", marginRight: "10px" }}
                to={`/post/edit/${SinglePost.id}`}
              >
                Edit Post
              </Link>
              <Author userId={SinglePost.userId} />
              <TimeAgo timestamp={SinglePost.date} />
            </div>
          </div>
        </article>
      ) : postStatus === "loading" && !SinglePost ? (
        <h1>Loading...</h1>
      ) : (
        <h1>Post not found! </h1>
      )}
    </div>
  );
};

export default SinglePostPage;
