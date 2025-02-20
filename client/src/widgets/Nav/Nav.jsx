// import RegistrationPage from '../../pages/RegistrationPage/RegistrationPage';
// import LoginPage from '../../pages/LoginPage/LoginPage';
import { NavLink } from 'react-router';
import styles from './Nav.module.css';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import UserApi from '../../entities/User/UserApi';


export default function Nav({ user, setUser }) {
    const navigate = useNavigate();
    async function signOutHandler() {
        try {
            const result = await Swal.fire({
              title: 'Вы уверены?',
              text: 'Это действие нельзя отменить!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Да, выйти',
              cancelButtonText: 'Отмена',
            });
      
            if (result.isConfirmed) {
              const { statusCode, message, error } = await UserApi.signOut();
      
              if (error) {
                return Swal.fire('Ошибка!', error, 'error');
              }
      
              if (statusCode === 200) {
                Swal.fire('Готово!', message, 'success');
                setUser(null);
                navigate('/');
              }
            }
          } catch ({ message }) {
            console.error('Ошибка выхода:', message);
            Swal.fire('Ошибка!', 'Не удалось выйти. Попробуйте снова.', 'error');
          }
        }

    return (
    <nav className={styles.container}>
      <div className={styles.goodnews}><NavLink to='/'>Good News</NavLink></div>
      {!user && (

      <div className={styles.authcontainer}>
        <NavLink to='/login'>Вход</NavLink>
        <NavLink to='/reg'>Регистрация</NavLink>
      </div>
      )}
      {user && (
        <div className={styles.authcontainer}>
            <NavLink to='/'>{user.username}</NavLink>
            <NavLink to='/favorites'>Favorites</NavLink>
            <NavLink to='/' onClick={signOutHandler}>Выход</NavLink>

        </div>

      )}
    </nav>
  );
}
