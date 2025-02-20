import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router";
import MainPage from "../pages/MainPage/MainPage";
import Layout from "../widgets/Layout/Layout";
import { useEffect, useState } from "react";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import FavoritePage from "../pages/FavoritePage/FavoritePage";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route path="/" element={<MainPage setUser={setUser} />} />
          <Route path="/reg" element={<RegistrationPage setUser={setUser} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/favorites" element={<FavoritePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
