import { Navigate, Route, Routes } from "react-router-dom";
import Calendar from "../components/appointment/Calendar";
import AboutMe from "../pages/aboutMe/AboutMe";
import Kontakt from "../pages/contactUs/Kontakt";
import Register from "../pages/loginPage/components/register/Register";
import LoginPage from "../pages/loginPage/LoginPage";
import Main from "../pages/mainPage/Main";
import Portfolio from "../pages/portfolio/Portfolio";
import Profile from "../pages/profile/Profile";
import { useSelector } from "react-redux";
import { RequireAuth } from "./RequireAuth";
const Routers = () => {
  const admin = useSelector((state)=> state.auth.admin)
   const isAuth = useSelector((state) => state.auth.isLogged);
   const user = useSelector((state) => state.user.user.name);
   const isLogged = (isAuth && user) || admin;

  return (
    <div>
      <Routes>
        <Route element={<AboutMe />} path="/about" />
        <Route element={<Portfolio />} path="/portfolio" />
        <Route element={<Kontakt />} path="/kontakt" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            // isLogged ? (
              <Calendar />
            // // ) : (
            //   <RequireAuth>
            //     <Calendar />
            //   </RequireAuth>
            // )
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
