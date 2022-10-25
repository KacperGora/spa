import { Route, Routes } from "react-router-dom";
import AboutMe from "../pages/About Me Page/AboutMe";
import Portfolio from "../pages/Portfolio Page/PortfolioPage";
import Profile from "../pages/ProfilePage/ProfilePage";
import { useSelector } from "react-redux";
import { RequireAuth } from "./RequireAuth";
import Calendar from "../pages/Calendar/Calendar";
import LoginPage from "../pages/Login Page/LoginPage";
import Register from "../pages/Register Page/RegisterPage";
import Contact from "../pages/Contact Page/Contact";
import Main from "../pages/Main Page/MainPage";

const Routers = () => {
  const admin = useSelector((state) => state.auth.admin);
  const isAuth = useSelector((state) => state.auth.isLogged);
  const user = useSelector((state) => state.user?.user?.name);
  const isLogged = (isAuth && user) || admin;

  return (
    <div>
      <Routes>
        <Route element={<AboutMe />} path="/about" />
        <Route element={<Portfolio />} path="/portfolio" />
        <Route element={<Contact />} path="/kontakt" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            isLogged ? (
              <Calendar />
            ) : (
              <RequireAuth>
                <Calendar />
              </RequireAuth>
            )
          }
          path="/calendar"
        />

        <Route
          element={
            isLogged ? (
              <Profile />
            ) : (
              <RequireAuth>
                <Profile />
              </RequireAuth>
            )
          }
          path="/profile"
        />
        <Route element={<Main />} path="/"></Route>
      </Routes>
    </div>
  );
};
export default Routers;
