import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "./UsersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUsers);

  const RenderUsers = users.map((user) => (
    <li key={user.name}>
      <Link to={`${user.id}`} style={{ color: "white", marginTop: "40px" }}>
        {user.name}
      </Link>
    </li>
  ));
  return <div style={{ marginTop: "30px" }}>{RenderUsers}</div>;
};

export default UsersList;
