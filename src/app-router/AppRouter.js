import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import React, { Fragment } from "react";
import NavbarComp from "../components/Navbar";
import NewBlog from "../pages/NewBlog";
import Details from "../pages/Details";
import Profile from "../pages/Profile";
import UpdateBlog from "../pages/UpdateBlog";
const AppRouter = () => {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/new-blog"
          element={
            <PrivateRouter>
              <NewBlog />
            </PrivateRouter>
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRouter>
              <Details />
            </PrivateRouter>
          }
        />

        <Route
          path="/update-blog/:id"
          element={
            <PrivateRouter>
              <UpdateBlog />
            </PrivateRouter>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRouter>
              <Profile />
            </PrivateRouter>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
