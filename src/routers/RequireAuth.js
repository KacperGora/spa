import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

export const RequireAuth = () => {
  const [user, setUser] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user.uid);
    }
  });
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
