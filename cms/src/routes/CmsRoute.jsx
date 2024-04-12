import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import * as Pages from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";

export const CmsRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout></Layout>}>
            <Route
              index
              element={
                <PrivateRoute
                  element={<Pages.Dashboard></Pages.Dashboard>}></PrivateRoute>
              }></Route>
            <Route
              path="profile/edit"
              element={
                <PrivateRoute
                  element={
                    <Pages.Profile.Edit></Pages.Profile.Edit>
                  }></PrivateRoute>
              }></Route>
            <Route
              path="profile/password"
              element={
                <PrivateRoute
                  element={
                    <Pages.Profile.Password></Pages.Profile.Password>
                  }></PrivateRoute>
              }></Route>
            <Route
              path="journalist"
              element={
                <PrivateRoute
                  element={
                    <AdminRoute element={<Outlet></Outlet>}></AdminRoute>
                  }></PrivateRoute>
              }>
              <Route
                index
                element={
                  <Pages.Journalist.List></Pages.Journalist.List>
                }></Route>
              <Route
                path="create"
                element={
                  <Pages.Journalist.Create></Pages.Journalist.Create>
                }></Route>
              <Route
                path=":id/edit"
                element={
                  <Pages.Journalist.Edit></Pages.Journalist.Edit>
                }></Route>
            </Route>
            <Route
              path="visitors"
              element={
                <PrivateRoute element={<Outlet></Outlet>}></PrivateRoute>
              }>
              <Route
                index
                element={<Pages.Visitor.List></Pages.Visitor.List>}></Route>
              <Route
                path="create"
                element={<Pages.Visitor.Create></Pages.Visitor.Create>}></Route>
              <Route
                path=":id/edit"
                element={<Pages.Visitor.Edit></Pages.Visitor.Edit>}></Route>
            </Route>
            <Route
              path="categories"
              element={
                <PrivateRoute
                  element={
                    <AdminRoute element={<Outlet></Outlet>}></AdminRoute>
                  }></PrivateRoute>
              }>
              <Route
                index
                element={<Pages.Category.List></Pages.Category.List>}></Route>
              <Route
                path="create"
                element={
                  <Pages.Category.Create></Pages.Category.Create>
                }></Route>
              <Route
                path=":id/edit"
                element={<Pages.Category.Edit></Pages.Category.Edit>}></Route>
            </Route>
            <Route
              path="posts"
              element={
                <PrivateRoute
                  element={
                    <AdminRoute element={<Outlet></Outlet>}></AdminRoute>
                  }></PrivateRoute>
              }>
              <Route
                index
                element={<Pages.Post.List></Pages.Post.List>}></Route>
              <Route
                path="create"
                element={<Pages.Post.Create></Pages.Post.Create>}></Route>
              <Route
                path=":id/edit"
                element={<Pages.Post.Edit></Pages.Post.Edit>}></Route>
            </Route>
            <Route
              path="reviews"
              element={
                <PrivateRoute
                  element={<Pages.Reviews></Pages.Reviews>}></PrivateRoute>
              }></Route>
            <Route path="login" element={<Pages.Login></Pages.Login>}></Route>
          </Route>
          <Route path="*" element={<Pages.Error404></Pages.Error404>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
