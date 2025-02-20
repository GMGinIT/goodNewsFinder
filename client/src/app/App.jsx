import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "../pages/MainPage/MainPage";
import Layout from "../widgets/Layout/Layout";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<MainPage setUser={setUser} />} />
          <Route path="/reg" element={<RegistrationPage setUser={setUser} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
