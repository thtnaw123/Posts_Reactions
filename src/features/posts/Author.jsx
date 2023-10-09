import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/UsersSlice";

const Author = ({ userId }) => {
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === Number(userId));
  return <p> by {author ? author.name : "unknown author"}</p>;
};

export default Author;
