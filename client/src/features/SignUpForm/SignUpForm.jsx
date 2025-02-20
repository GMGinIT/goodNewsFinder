import { useState } from 'react';
import styles from './SignUpForm.module.css';
import UserValidator from '../../entities/User/User.validator';
import { setAccessToken } from '../../shared/lib/axiosInstance';
import { useNavigate } from 'react-router';
import UserApi from '../../entities/User/UserApi';
import Swal from 'sweetalert2';

const INITIAL_INPUTS_DATA = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export default function SignUpForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  function onChangeHandler(event) {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const { isValid, error } = UserValidator.validateSignUp(inputs);

    if (!isValid) return alert(error);

    try {
      const {
        statusCode,
        data,
        error: responseError,
        message,
      } = await UserApi.signUp(inputs);

      if (responseError) {
        alert(responseError);
        return;
      }

      if (statusCode === 201) {
        setUser(data.user);
        setAccessToken(data.setAccessToken);
        setInputs(INITIAL_INPUTS_DATA);
        Swal.fire(`Поздравляем с регистрацией, ${username}!`)
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  const { username, email, password, repeatPassword } = inputs;

  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
        <label>
          Имя пользователя:{' '}
          <input
            name='username'
            onChange={onChangeHandler}
            value={username}
            autoFocus
            type='text'
            className='input'
            placeholder='Введите имя'
            required
          />
        </label>
        <br />
        <label>
          Email:{' '}
          <input
            name='email'
            onChange={onChangeHandler}
            value={email}
            type='email'
            className='input'
            placeholder='email@email.com'
            required
          />
        </label>
        <br />
        <label>
          Пароль:{' '}
          <input
            name='password'
            onChange={onChangeHandler}
            value={password}
            type='password'
            className='input'
            placeholder='Введите пароль'
            required
          />
        </label>
        <br />
        <label>
          Подтвердите пароль:{' '}
          <input
            name='repeatPassword'
            onChange={onChangeHandler}
            value={repeatPassword}
            type='password'
            className='input'
            placeholder='Повторите пароль'
            required
          />
        </label>
        <br />
        <button type='submit' className='button'>
          Отправить
        </button>
      </form>
    </div>
  );
}
