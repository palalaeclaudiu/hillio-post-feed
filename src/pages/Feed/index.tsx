import { useEffect, useState } from "react";
import { CatButton, CatCard, CatScrollable } from "@haiilo/catalyst-react";

import Post from "../../components/Post";
import { IPost } from "../../types/post";
import { addNewPost, getAllPosts } from "../../services/postServices";

const Feed = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  return (
    <div className="cat-m-xl">
      <CatScrollable style={{ maxHeight: "85vh" }}>
        {posts.map((post) => (
          <CatCard className="cat-elevation-3 cat-mb-l" key={post.id}>
            <Post
              refreshPosts={() => {
                setPosts(getAllPosts());
              }}
              post={post}
            />
          </CatCard>
        ))}
      </CatScrollable>
      <CatButton
        style={{ width: "100%" }}
        className="cat-mt-l"
        variant="filled"
        color="primary"
        data-testid="addNewPostBtn"
        onClick={() => {
          addNewPost();
          setPosts(getAllPosts());
        }}
      >
        Create new post
      </CatButton>
    </div>
  );
};

export default Feed;
