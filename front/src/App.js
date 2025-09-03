import react, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import AddlinksPage from "./pages/AddlinksPage";
import AddNameBio from "./pages/AddNameBio";
import AdminLinks from "./pages/AdminLinks";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";

axios.defaults.baseURL = "https://lynqo.onrender.com/";
axios.defaults.withCredentials = true;
function App() {
  const { Auth, setAuth } = useContext(AuthContext);
  const [loading, setloading] = useState(true);
  const getme = async () => {
    try {
      const res = await axios.get("/api/auth/getmyprofile");
      setAuth(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getme();
  }, []);
  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <Routes>
      <Route index path="/" element={<HomePage />} />
      <Route path="/:username" element={<ProfilePage />} />

      <Route
        path="/auth/signup"
        element={Auth ? <Navigate to={"/admin/links"} /> : <SignUpPage />}
      />
      <Route
        path="/auth/login"
        element={Auth ? <Navigate to={"/admin/links"} /> : <LoginPage />}
      />

      <Route
        path="/create/add-links"
        element={Auth ? <Navigate to={"/admin/links"} /> : <AddlinksPage />}
      />
      <Route
        path="/create/name-image-bio"
        element={Auth ? <Navigate to={"/admin/links"} /> : <AddNameBio />}
      />
      <Route
        path="/admin/links"
        element={Auth ? <AdminLinks /> : <Navigate to={"/auth/login"} />}
      />
    </Routes>
  );
}

export default App;
