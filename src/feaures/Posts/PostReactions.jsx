import React from "react";
import "./post.css";
import { addReaction } from "./PostSlices";
import { useDispatch } from "react-redux";

const PostReactions = ({ post }) => {
  const reaction = {
    thumbsup: "like",
    wow: "wow",
    heart: "loved",
    rocket: "rock",
    coffee: "coffee",
  };

  const dispatch = useDispatch();
  const { reactions, id } = post;

  return (
    <div>
      {Object.entries(reaction).map(([name, emoji]) => {
        return (
          <button
            className="reactionButton"
            onClick={() => dispatch(addReaction({ name, postId: id }))}
            key={name}
          >
            {emoji} {reactions[name]}
          </button>
        );
      })}
    </div>
  );
};

export default PostReactions;
