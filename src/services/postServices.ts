import { IPost } from "../types/post";
import { mockPosts } from "../utils/constants/posts";

export const getAllPosts = () => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")];

  lsPosts.length === 0 &&
    localStorage.setItem("posts", JSON.stringify(mockPosts));

  return lsPosts.length === 0 ? mockPosts : lsPosts;
};

export const getPost = (id: number) => {
  const lsPosts = JSON.parse(localStorage.getItem("posts") || "[]");

  return lsPosts.find((p: IPost) => p.id === id);
};

export const addOrRemoveLike = (id: number) => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")];

  const postIndex = lsPosts?.findIndex((p: IPost) => p.id === id);

  lsPosts[postIndex].likes = lsPosts[postIndex]?.likes?.includes("You")
    ? lsPosts[postIndex]?.likes?.filter((l: string) => l !== "You")
    : ["You", ...lsPosts[postIndex]?.likes];

  localStorage.setItem("posts", JSON.stringify(lsPosts));

  return lsPosts;
};

export const addComment = (id: number, comment: string) => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")];

  const postIndex = lsPosts?.findIndex((p: IPost) => p.id === id);

  lsPosts[postIndex].comments = [
    ...lsPosts[postIndex].comments,
    {
      id:
        (lsPosts[postIndex].comments[lsPosts[postIndex].comments.length - 1]
          ?.id || 0) + 1,
      text: comment,
      createdAt: new Date(),
    },
  ];

  localStorage.setItem("posts", JSON.stringify(lsPosts));

  return lsPosts;
};

export const removeComment = (postId: number, commentId: number) => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")];

  const postIndex = lsPosts?.findIndex((p: IPost) => p.id === postId);

  lsPosts[postIndex].comments = lsPosts[postIndex].comments.filter(
    (c: any) => c.id !== commentId,
  );

  localStorage.setItem("posts", JSON.stringify(lsPosts));

  return lsPosts;
};

export const editComment = (
  postId: number,
  commentId: number,
  newComment: string,
) => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")];

  const postIndex = lsPosts?.findIndex((p: IPost) => p.id === postId);

  const commentIndex = lsPosts[postIndex].comments.findIndex(
    (c: any) => c.id === commentId,
  );

  lsPosts[postIndex].comments[commentIndex].text = newComment;

  localStorage.setItem("posts", JSON.stringify(lsPosts));

  return lsPosts;
};

export const editPost = (postId: number, newPost: Partial<IPost>) => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")];

  const postIndex = lsPosts?.findIndex((p: IPost) => p.id === postId);

  lsPosts[postIndex] = {
    ...lsPosts[postIndex],
    title: newPost.title,
    text: newPost.text,
  };

  localStorage.setItem("posts", JSON.stringify(lsPosts));

  return lsPosts;
};

export const deletePost = (postId: number) => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")].filter(
    (p) => p.id !== postId,
  );

  localStorage.setItem("posts", JSON.stringify(lsPosts));

  return lsPosts;
};

export const addNewPost = () => {
  const lsPosts = [...JSON.parse(localStorage.getItem("posts") || "[]")];

  lsPosts.push({
    ...mockPosts[0],
    id: (lsPosts[lsPosts.length - 1].id || 0) + 1,
  });

  localStorage.setItem("posts", JSON.stringify(lsPosts));

  return lsPosts;
};
