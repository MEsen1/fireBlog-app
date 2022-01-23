import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const PrivateRouter = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRouter;
