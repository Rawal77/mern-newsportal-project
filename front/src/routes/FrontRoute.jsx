import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";

export const FrontRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route
              index
              element={<Pages.Front.Home></Pages.Front.Home>}></Route>
            <Route
              path="category/:id"
              element={<Pages.Front.Category></Pages.Front.Category>}></Route>
            <Route
              path="post/:id"
              element={<Pages.Front.Posts></Pages.Front.Posts>}></Route>

            <Route
              path="search"
              element={<Pages.Front.Search></Pages.Front.Search>}></Route>

            <Route
              path="register"
              element={<Pages.Auth.Register></Pages.Auth.Register>}></Route>

            <Route
              path="login"
              element={<Pages.Auth.Login></Pages.Auth.Login>}></Route>

            <Route
              path="profile"
              element={<Pages.Dashboard></Pages.Dashboard>}></Route>
          </Route>

          <Route path="*" element={<Pages.Error404></Pages.Error404>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
