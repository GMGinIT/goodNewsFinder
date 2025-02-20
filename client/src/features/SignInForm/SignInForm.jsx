import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../shared/ui/Regforms.module.css';
import UserValidator from '../../entities/User/User.validator';
import UserApi from '../../entities/User/UserApi';
import { setAccessToken } from '../../shared/lib/axiosInstance';

const INITIAL_INPUTS_DATA = {
  email: '',
  password: '',
};

export default function SignInForm({ setUser }) {
  const [inputs, setInputs] = useState(INITIAL_INPUTS_DATA);
  const navigate = useNavigate();

  function onChangeHandler(event) {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const { isValid, error } = UserValidator.validateSignIn(inputs);

    if (!isValid) {
      return alert(error);
    }

    try {
      const {
        statusCode,
        data,
        error: responseError,
        message,
      } = await UserApi.signIn(inputs);

      if (responseError) {
        alert(responseError);
        return;
      }

      if (statusCode === 200) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        setInputs(INITIAL_INPUTS_DATA);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  const { email, password } = inputs;
  return (
    <div className={styles.body}>
      <form className={styles.form} onSubmit={onSubmitHandler}>
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
        <button type='submit' className='button'>
          Отправить
        </button>
      </form>
    </div>
  );
}
