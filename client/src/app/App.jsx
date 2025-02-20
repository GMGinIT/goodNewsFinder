import RegistrationPage from '../pages/RegistrationPage/RegistrationPage'
import LoginPage from '../pages/LoginPage/LoginPage'
// import UserApi from '../entities/User/UserApi'
import { BrowserRouter, Route, Routes } from "react-router";
// import MainPage from "./pages/MainPage/MainPage";
import Layout from "./widgets/Layout/Layout";
import { useEffect, useState } from "react";
// import { setAccessToken } from "../shared/lib/axiosInstance";

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
    </BrowserRouter>
  )
}

export default App;
