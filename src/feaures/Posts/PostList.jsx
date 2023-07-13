import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectAllPosts } from "./PostSlices";
import { deletePost } from "./PostSlices";
import "./post.css";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  return (
    <div>
      {posts.length !== 0 ? (
        <>
          {posts.map((post) => {
            return (
              <div className="unitPost" key={post.id}>
                <div>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  <PostAuthor post={post} />
                  <PostReactions post={post} />
                </div>
                <button
                  className="deleteBtn"
                  onClick={() => dispatch(deletePost(post.id))}
                >
                  X
                </button>
              </div>
            );
          })}
        </>
      ) : (
        <h2>No posts yet!</h2>
      )}
    </div>
  );
};

export default PostList;
