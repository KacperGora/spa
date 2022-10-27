import { MdPerson } from "react-icons/md";
import { useSelector } from "react-redux";
import classes from "./navbarCfg.module.css";
import LogoutButton from "./LogoutButton";
import CustomLinkBox from "../../components/UI/CustomLinkBox/CustomLinkBox";
function useNavbarConfig() {
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
      title: <LogoutButton />,
      address: "",
      condition: isLogged,
    },
    {
      title: (
        <CustomLinkBox primary sm destination={"/login"}>
          Zaloguj
        </CustomLinkBox>
      ),
      address: "/login",
      condition: !isLogged,
    },
    {
      title: (
        <CustomLinkBox primary sm destination={"/calendar"}>
          Umów wizytę
        </CustomLinkBox>
      ),
      address: "/calendar",
      condition: isLogged,
    },
  ];
  return navbarLinksConfiguration;
}

export default useNavbarConfig;
