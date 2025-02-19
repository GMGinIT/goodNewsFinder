import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "./pages/MainPage/MainPage";
import Layout from "./widgets/Layout/Layout";
import { useEffect, useState } from "react";
import { setAccessToken } from "../shared/lib/axiosInstance";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserApi.refreshTokens().then(console.log);
    UserApi.refreshTokens()
      .then(({ error, data, statusCode, message }) => {
        if (error) {
          setUser(null);
          return;
        }
        if (statusCode === 200) {
          setUser(data.user);
          setAccessToken(data.accessToken);
        }
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/reg" element={<RegPage setUser={setUser} />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/tasks/:id" element={<OneTaskPage />} />
        </Route>
        <Route path="*" element={<>ВЫ кто такие, я вас не звал</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
