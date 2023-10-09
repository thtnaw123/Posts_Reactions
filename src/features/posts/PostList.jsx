import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts, selectPostError, selectPostStatus } from "./PostSlice";
import "./styles/style.css";

import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(selectPostStatus);
  const postError = useSelector(selectPostError);

  // useEffect(() => {
  //   if (postStatus === "idle") {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);

  let content = [];

  if (postStatus === "loading") {
    content = <h1> Loading...</h1>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ));
  } else if (postStatus === "failed") {
    content = <h1> Failed {postError}</h1>;
  }

  return (
    <>
      {postStatus === "succeeded" && content.length === 0 ? (
        <h1>there are no posts yet!</h1>
      ) : (
        <>{content}</>
      )}
    </>
  );
};

export default PostList;
