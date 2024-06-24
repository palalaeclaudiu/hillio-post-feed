import { CatAvatar, CatButton } from "@haiilo/catalyst-react";
import { ComponentProps, useState } from "react";

interface Props extends ComponentProps<any> {
  handleAddComment: (comment: string) => void;
}

const CommentInput = (props: Props) => {
  const { handleAddComment } = props;

  const [comment, setComment] = useState<string>("");

  return (
    <div
      className="cat-flex cat-flex-row cat-items-center"
      style={{
        position: "relative",
        height: 50,
        marginTop: 15,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 10,
        }}
      >
        <CatAvatar
          src="https://tinyurl.com/bdcu9va5"
          label="Sample User"
          round
          size="s"
        />
      </div>
      <input
        className="cat-border-none"
        placeholder="Leave a comment..."
        data-testid="addCommentInput"
        style={{
          height: "100%",
          paddingLeft: 50,
          paddingRight: 130,
          backgroundColor: "#f2f3f7",
          width: "100%",
          borderRadius: 8,
        }}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 10,
          display: "flex",
          alignItems: "center",
          gap: 0,
        }}
      >
        <CatButton
          disabled
          icon="rte-link"
          variant="text"
          icon-only="true"
          size="s"
        />
        <CatButton
          disabled
          icon="smile"
          variant="text"
          icon-only="true"
          size="s"
        />
        <CatButton
          variant="text"
          size="xs"
          data-testid="addCommentBtn"
          onClick={() => {
            comment && handleAddComment(comment);
            setComment("");
          }}
        >
          Post
        </CatButton>
      </div>
    </div>
  );
};

export default CommentInput;
