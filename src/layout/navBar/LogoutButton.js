import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../../store/loginSlice";
import classes from "./LogoutButton.module.css";
function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
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
  );
}

export default LogoutButton;
