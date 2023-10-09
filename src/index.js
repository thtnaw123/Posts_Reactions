import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/UsersSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchPosts } from "./features/posts/PostSlice";
const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
