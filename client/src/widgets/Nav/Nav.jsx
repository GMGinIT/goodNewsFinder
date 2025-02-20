// import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
// import LoginPage from '../../pages/LoginPage/LoginPage';
import { NavLink } from "react-router";
import styles from "./Nav.module.css";

export default function Nav({ user, setUser }) {
  return (
    <nav className={styles.container}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/reg">Registration</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
    </nav>
  );
}
