import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Feed from "../pages/Feed";
import { mockPosts } from "../utils/constants/posts";
import { BrowserRouter } from "react-router-dom";

describe("Test suite for Feed page", () => {
  it("Post feed list without any post in localstorage", async () => {
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>,
    );

    const element = await screen.findAllByText("Robert");

    expect(element).toHaveLength(2);
  });

  it("Post feed list with posts in localstorage", async () => {
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>,
    );

    window.localStorage.setItem("posts", JSON.stringify(mockPosts));

    const element = screen.queryAllByText("Robert");

    expect(element).toHaveLength(2);
  });

  it("Like and dislike post", async () => {
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>,
    );

    const likeButtons = screen.queryAllByTestId("likeBtn");

    expect(likeButtons).toHaveLength(2);

    const firstPostLikeButton = likeButtons[0];

    await userEvent.click(firstPostLikeButton);

    await waitFor(() => {
      expect(screen.getByText("You")).toBeInTheDocument();
    });

    await userEvent.click(firstPostLikeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("You, Nicholas Freeman, Susanne Miller"),
      ).not.toBeInTheDocument();
    });
  });

  it("Create new post", async () => {
    render(
      <BrowserRouter>
        <Feed />
      </BrowserRouter>,
    );

    await userEvent.click(screen.getByTestId("addNewPostBtn"));

    await waitFor(() => {
      expect(screen.queryAllByText("Robert")).toHaveLength(3);
    });
  });
});
