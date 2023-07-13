import React, { useState } from "react";
import "./App.css";
import PostList from "./feaures/Posts/PostList";
import AddPost from "./feaures/Posts/AddPost";
// import Axios from "axios";

const App = () => {
  // const [data, setData] = useState("");
  // const getData = () => {
  //   Axios.get("https://jsonplaceholder.typicode.com/todos/1").then(
  //     (response) => {
  //       setData(response.data.title);
  //       console.log(response.data);
  //     }
  //   );
  // };
  return (
    <div>
      <AddPost />
      <PostList />

      {/* <button onClick={() => getData()}>get fata</button> */}
      {/* <h3>{data}</h3> */}
    </div>
  );
};

export default App;
