import { useSelector } from "react-redux";
import Login from "../../components/auth/login/Login";
import NavBar from "../../components/layout/navBar/NavBar"; 
import { useNavigate } from "react-router-dom";
const LoginPage = () => {

  return (
    <div>
      <NavBar />
      <Login />
    
    </div>
  );
};

export default LoginPage;
