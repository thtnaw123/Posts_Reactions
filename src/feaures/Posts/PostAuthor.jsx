import React from "react";
import { useSelector } from "react-redux";
import { selectAllUser } from "../Users/UserSlices";

const PostAuthor = ({ post }) => {
  const users = useSelector(selectAllUser);
  const author = users.find((user) => user.id === Number(post.userId));

  return (
    <div>
      <span> {author ? <>{author.name}</> : <>unknown author</>}</span>
    </div>
  );
};

export default PostAuthor;
