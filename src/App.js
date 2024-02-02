import Layout from "antd/es/layout/layout";
import Header from "./Components/Layout/Header";
import Sidebar from "./Components/Layout/Sidebar";
import Footer from "./Components/Layout/Footer";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import UserListPage from "./Pages/UserListPage";
import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/account/Login";
import LearningMaterials from "./Pages/LearningMaterials/LearningMaterials";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const storedStatus = localStorage.getItem("isLoggedIn");
    return storedStatus ? JSON.parse(storedStatus) : false;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (location.pathname === "/") {
      navigate("/home");
    } else if (location.pathname === "/login") {
      navigate("/home");
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    navigate("/home");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className="App">
      <Layout>
        {isLoggedIn && location.pathname !== "/login" && (
          <Header onLogout={handleLogout} />
        )}
        <Layout>
          {isLoggedIn && location.pathname !== "/login" && <Sidebar />}
          <Routes>
            {isLoggedIn ? (
              <>
              {/* ROUTE CODE TRONG ĐÂY NHA MẤY NÍ */}

                <Route path="/home" element={<HomePage />} />
                <Route path="/user-list" element={<UserListPage />} />
                <Route path="/materials" element={<LearningMaterials />} />

              </>
            ) : (
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            )}
          </Routes>
        </Layout>
        {isLoggedIn && location.pathname !== "/login" && <Footer />}
      </Layout>
    </div>
  );
}

export default App;
