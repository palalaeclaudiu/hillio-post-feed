import { CatAvatar, CatButton, CatIcon } from "@haiilo/catalyst-react";

import { IPost } from "../../types/post";
import CommentInput from "../CommentInput";
import { useNavigate } from "react-router-dom";
import { addComment, addOrRemoveLike } from "../../services/postServices";

interface Props {
  post: IPost;
  refreshPosts?: () => void;
}

const Post = (props: Props) => {
  const { post, refreshPosts } = props;

  const navigate = useNavigate();

  return (
    <div>
      <div className="cat-flex cat-flex-row cat-gap-m">
        <CatAvatar
          src="https://tinyurl.com/bdcu9va5"
          label="Sample User"
          round
          size="l"
        />
        <div>
          <p className="cat-h4">{post.author}</p>
          <p className="cat-text-m cat-muted">4 hours ago</p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 200,
          background: `url(${post.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 8,
          marginTop: 10,
        }}
      />
      <p className="cat-h2 cat-mt-l cat-mb-m">{post.title}</p>
      <p className="cat-text-m cat-mb-l">{post.text}</p>

      <CatButton
        variant="text"
        color="primary"
        className="cat-p-blank"
        onClick={() => {
          navigate(`/post/${post.id}`);
        }}
      >
        Read entire post
      </CatButton>

      <hr className="cat-mb-s cat-mt-s" />
      <div className="cat-flex cat-flex-row cat-gap-m">
        <CatButton
          onClick={() => {
            addOrRemoveLike(post.id);
            refreshPosts && refreshPosts();
          }}
          data-testid="likeBtn"
          icon="32-reaction-thumbs-up"
          color={post.likes.includes("You") ? "primary" : undefined}
          variant="text"
        >
          {!post.likes.includes("You") ? "Like" : "Dislike"}
        </CatButton>
      </div>
      <hr className="cat-mb-s cat-mt-s" />
      <div className="cat-flex cat-flex-row cat-gap-xs">
        <CatIcon icon="likes-circle-filled" />
        <p className="cat-text-m cat-muted">
          {post.likes.slice(0, 3).join(", ")}{" "}
          {post.likes.length > 3 && `and ${post.likes.length - 3} others`}
        </p>
      </div>
      <CommentInput
        handleAddComment={(comment) => {
          addComment(post.id, comment);
          refreshPosts && refreshPosts();
        }}
      />
    </div>
  );
};

export default Post;
