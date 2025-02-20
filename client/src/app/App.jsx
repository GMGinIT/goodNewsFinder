import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from '../widgets/Layout/Layout'
import RegistrationPage from '../pages/RegistrationPage/RegistrationPage'
import LoginPage from '../pages/LoginPage/LoginPage'

// import UserApi from '../entities/User/UserApi'

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   UserApi.refreshTokens().then(console.log);
  //   UserApi.refreshTokens()
  //     .then(({ error, data, statusCode, message }) => {
  //       
  //       if (error) {
  //         setUser(null);
  //         return;
  //       }
  //       if (statusCode === 200) {
  //         setUser(data.user);
  //         setAccessToken(data.accessToken);
  //       }
  //     })
  //     .catch(({ message }) => {
  //       console.log(message);
  //     });
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout user={user} setUser={setUser} />}>
          <Route path='/reg' element={<RegistrationPage setUser={setUser} />} />
          <Route path='/login' element={<LoginPage setUser={setUser} />} /> 
        
        
        
        </Route>
      </Routes>
      привет
    </>
  )
}

export default App
