import React from "react";
import "./App.css";
import PostList from "./features/posts/PostList";
import AddPost from "./features/posts/AddPosts";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPost from "./features/posts/EditPost";
import UsersList from "./features/users/UsersList";
import UsersPage from "./features/users/UsersPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />

          <Route path="post">
            <Route index element={<AddPost />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPost />} />
          </Route>
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
