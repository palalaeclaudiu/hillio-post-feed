import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostDetails from "../pages/PostDetails";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import { getAllPosts } from "../services/postServices";
import userEvent from "@testing-library/user-event";
import Feed from "../pages/Feed";

test("Edit button", async () => {
  getAllPosts();

  render(
    <Router initialEntries={["/post/1"]}>
      <Routes>
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </Router>,
  );

  const editPostBtn = await screen.findByTestId("editPostBtn");

  await userEvent.click(editPostBtn);

  await waitFor(async () => {
    expect(await screen.findByTestId("savePostBtn")).toBeInTheDocument();
  });

  await userEvent.click(await screen.findByTestId("savePostBtn"));

  await waitFor(async () => {
    expect(screen.queryByTestId("savePostBtn")).not.toBeInTheDocument();
  });
});

test("Like and dislike post", async () => {
  getAllPosts();

  render(
    <Router initialEntries={["/post/1"]}>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </Router>,
  );

  const likeButton = screen.getByTestId("likeBtn");

  expect(likeButton).toBeInTheDocument();

  await userEvent.click(likeButton);

  await waitFor(() => {
    expect(screen.getByText("You")).toBeInTheDocument();
  });

  await userEvent.click(likeButton);

  await waitFor(() => {
    expect(
      screen.queryByText("You, Nicholas Freeman, Susanne Miller"),
    ).not.toBeInTheDocument();
  });
});

test("Add comment", async () => {
  getAllPosts();

  render(
    <Router initialEntries={["/post/1"]}>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </Router>,
  );

  const addCommentInput = await screen.findByTestId("addCommentInput");
  const addCommentBtn = await screen.findByTestId("addCommentBtn");

  fireEvent.change(addCommentInput, {
    target: { value: "test-comment" },
  });

  fireEvent.click(addCommentBtn);

  await waitFor(async () => {
    expect(screen.queryAllByText("test-comment")).toHaveLength(1);
  });

  fireEvent.change(addCommentInput, {
    target: { value: "test-comment" },
  });

  fireEvent.click(addCommentBtn);

  await waitFor(async () => {
    expect(screen.queryAllByText("test-comment")).toHaveLength(2);
  });

  const firstCommentRemoveBtn =
    await screen.findAllByTestId("removeCommentBtn");

  fireEvent.click(firstCommentRemoveBtn[0]);

  await waitFor(async () => {
    expect(screen.queryAllByText("test-comment")).toHaveLength(1);
  });
});

test("Delete post button", async () => {
  getAllPosts();

  render(
    <Router initialEntries={["/post/1"]}>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post/:postId" element={<PostDetails />} />
      </Routes>
    </Router>,
  );

  const editPostBtn = await screen.findByTestId("removePostBtn");

  await userEvent.click(editPostBtn);

  await waitFor(async () => {
    expect(screen.queryAllByText("Robert")).toHaveLength(1);
  });
});
