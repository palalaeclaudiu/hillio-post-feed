import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CatAvatar,
  CatButton,
  CatCard,
  CatDropdown,
  CatIcon,
  CatInput,
  CatTextarea,
} from "@haiilo/catalyst-react";

import CommentInput from "../../components/CommentInput";
import { IPost } from "../../types/post";
import {
  addComment,
  addOrRemoveLike,
  deletePost,
  editComment,
  editPost,
  getPost,
  removeComment,
} from "../../services/postServices";

const PostDetails = () => {
  const [post, setPost] = useState<IPost>();
  const [editCommentId, setEditCommentId] = useState<number | undefined>(
    undefined,
  );
  const [newComment, setNewComment] = useState<string | undefined>(undefined);
  const [editPostActive, setEditPostActive] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { postId } = params;

  useEffect(() => {
    if (!postId) {
      navigate("/");
    }

    setPost(getPost(Number(postId)));
  }, [postId, navigate]);

  return !post ? (
    <>Loading</>
  ) : (
    <div className="cat-p-l">
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
        <CatDropdown placement="bottom-end">
          <CatButton
            slot="trigger"
            icon="more-horizontal-filled"
            size="m"
            variant="text"
            className="cat-ml-auto"
          />
          <nav slot="content">
            <ul>
              <li>
                <CatButton
                  variant="text"
                  style={{ width: "100%" }}
                  data-testid="editPostBtn"
                  onClick={() => {
                    setEditPostActive(true);
                  }}
                >
                  Edit post
                </CatButton>
              </li>
              <li>
                <CatButton
                  variant="text"
                  style={{ width: "100%" }}
                  data-testid="removePostBtn"
                  onClick={() => {
                    deletePost(Number(postId));
                    navigate("/");
                  }}
                >
                  Remove post
                </CatButton>
              </li>
            </ul>
          </nav>
        </CatDropdown>
      </div>
      {editPostActive ? (
        <div>
          <CatInput
            data-testid="titleInput"
            value={post.title}
            onCatChange={(e) => {
              setPost({ ...post, title: e.target.value || "" });
            }}
          />
          <CatTextarea
            data-testid="textTextArea"
            value={post.text}
            onCatChange={(e) => {
              setPost({ ...post, text: e.target.value || "" });
            }}
          />
        </div>
      ) : (
        <>
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
        </>
      )}

      {editPostActive && (
        <CatButton
          data-testid="savePostBtn"
          color="primary"
          variant="filled"
          className="cat-p-blank cat-mt-s"
          onClick={() => {
            editPost(Number(postId), post);
            setEditPostActive(false);
            setPost(getPost(Number(postId)));
          }}
        >
          Save
        </CatButton>
      )}
      <hr className="cat-mb-s cat-mt-s" />
      <div className="cat-flex cat-flex-row cat-gap-m">
        <CatButton
          onClick={() => {
            addOrRemoveLike(post?.id);
            setPost(getPost(Number(postId)));
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
          addComment(post?.id, comment);
          setPost(getPost(Number(postId)));
        }}
      />
      <div className="cat-mt-l">
        <p className="cat-h4">Comments</p>
        {post.comments.map((c) => (
          <CatCard
            className="cat-elevation-5 cat-m-s cat-flex cat-justify-between"
            key={c.id}
          >
            <div className="cat-flex cat-items-center cat-gap-xs">
              <CatAvatar
                src="https://tinyurl.com/bdcu9va5"
                label="Sample User"
                round
                size="xs"
              />
              {editCommentId === c.id ? (
                <CatInput
                  value={newComment}
                  onCatChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
              ) : (
                c.text
              )}
            </div>

            <div className="cat-flex cat-items-center">
              {c.createdAt && (
                <div>
                  {new Date(c.createdAt).getDate()}/
                  {new Date(c.createdAt).getMonth()}/
                  {new Date(c.createdAt).getFullYear()}{" "}
                  {new Date(c.createdAt).getHours()}:
                  {new Date(c.createdAt).getMinutes()}
                </div>
              )}
              <CatButton
                icon="16-editor-delete"
                variant="text"
                icon-only="true"
                size="xs"
                data-testid="removeCommentBtn"
                onClick={() => {
                  removeComment(post?.id, c.id);
                  setPost(getPost(Number(postId)));
                }}
              />
              {editCommentId === c.id ? (
                <CatButton
                  icon="check-outlined"
                  variant="text"
                  icon-only="true"
                  size="xs"
                  onClick={() => {
                    setEditCommentId(undefined);
                    setNewComment(undefined);
                    editComment(post?.id, c.id, newComment!);
                    setPost(getPost(Number(postId)));
                  }}
                />
              ) : (
                <CatButton
                  icon="16-pen-outlined"
                  variant="text"
                  icon-only="true"
                  size="xs"
                  onClick={() => {
                    setEditCommentId(c.id);
                    setNewComment(c.text);
                  }}
                />
              )}
            </div>
          </CatCard>
        ))}
      </div>
    </div>
  );
};

export default PostDetails;
