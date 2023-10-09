import React from "react";
import "./styles/style.css";
import { useDispatch } from "react-redux";
import { IncrementReaction } from "./PostSlice";

const Reactions = ({ reactions, postId }) => {
  const Rxns = Object.entries(reactions);
  const dispatch = useDispatch();
  return (
    <div>
      {Rxns.map(([name, num]) => {
        return (
          <button
            className="reactions-btn"
            key={name}
            onClick={() => dispatch(IncrementReaction({ name, postId }))}
          >
            {name} {num}
          </button>
        );
      })}
    </div>
  );
};

export default Reactions;
