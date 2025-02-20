import SignInForm from '../../features/SignInForm/SignInForm';

function LoginPage({ setUser }) {
  return (
  <SignInForm setUser={setUser}>Login Page</SignInForm>
  )
}

export default LoginPage;
