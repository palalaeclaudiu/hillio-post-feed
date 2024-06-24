import React from "react";
import ReactDOM from "react-dom/client";
import { defineCustomElements } from "@haiilo/catalyst/loader";
import { catIconRegistry } from "@haiilo/catalyst";
import { ci } from "@haiilo/catalyst-icons";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Feed from "./pages/Feed";
import PostDetails from "./pages/PostDetails";

import "./App.scss";

catIconRegistry.addIcons(ci);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/post/:postId",
    element: <PostDetails />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
defineCustomElements();
reportWebVitals();
