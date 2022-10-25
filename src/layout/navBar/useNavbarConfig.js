import { MdPerson } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../store/loginSlice";
import classes from "./navbarCfg.module.css";

function useNavbarConfig() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isLogged);
  const user = useSelector((state) => state.user.user?.name);
  const admin = useSelector((state) => state.auth.admin);

  const isLogged = (isAuth && user) || admin;

  const navbarLinksConfiguration = [
    {
      title: "O mnie",
      address: "/about",
      condition: true,
    },
    {
      title: "Portfolio",
      address: "/portfolio",
      condition: true,
    },
    {
      title: "Kontakt",
      address: "/kontakt",
      condition: true,
    },
    {
      title: <MdPerson className={classes.icons} />,
      address: "/profile",
      condition: isLogged,
    },
    {
      title: (
        <button
          className={classes.logoutButton}
          onClick={() => {
            dispatch(loginActions.logout());
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Wyloguj
        </button>
      ),
      address: "",
      condition: isLogged,
    },
    {
      title: "Zaloguj",
      address: "/login",
      condition: !isLogged,
    },
    {
      title: "Umów wizytę",
      address: "/calendar",
      condition: isLogged,
    },
  ];
  return navbarLinksConfiguration;
}

export default useNavbarConfig;
