import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section>
      <input type="text" placeholder="Email"></input>
      <input type="password" placeholder="password"></input>
      <button>Zaloguj</button>
      <Link to='/register'>Nie masz konta?</Link>
    </section>
  );
};

export default Login
