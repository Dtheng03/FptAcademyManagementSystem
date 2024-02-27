import Layout from 'antd/es/layout/layout';
import Header from './Components/Layout/Header';
import Sidebar from './Components/Layout/Sidebar';
import Footer from './Components/Layout/Footer';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import Login from './Pages/account/Login';
import HomePage from './Pages/HomePage/HomePage';
import SyllabusList from './Pages/SyllabusList/SyllabusList';
import CreateSyllabusPage from './Pages/CreateSyllabus/CreateSyllabusPage';
import TranningListPage from './Pages/TranningProgramListPage';
import ClassListPage from './Pages/ClassListPage';
import UserListPage from './Pages/UserListPage';
import UserPermissionPage from './Pages/UserPermissionPage';
import LearningMaterials from './Pages/LearningMaterials/LearningMaterials';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const storedStatus = sessionStorage.getItem('isLoggedIn');
    return storedStatus ? JSON.parse(storedStatus) : false;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (location.pathname === '/') {
      navigate('/home');
    } else if (location.pathname === '/login') {
      navigate('/home');
    }
  }, [isLoggedIn, navigate, location.pathname]);

  const handleLogin = (user) => {
    setLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
    sessionStorage.setItem("roleName", user.roleName);
    sessionStorage.setItem("fullName", user.fullName);

    const token = sessionStorage.getItem("token");
    const decodedToken = jwtDecode(token); //token này là token nhận vào mai mốt làm thì gán dô 

    // Kỉm tra coi thời hạn token còn bao nhiêu (theo giây)
    const isTokenValid = decodedToken.exp > Date.now() / 1000;
    if (!isTokenValid) {
      // Token hết đát
      handleLogout();
      return;
    }

    navigate('/home');
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("roleName");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className='App'>
      <Layout>
        {isLoggedIn && location.pathname !== '/login' && <Header onLogout={handleLogout} />}
        <Layout>
          {isLoggedIn && location.pathname !== '/login' && <Sidebar />}
          <Routes>
            {isLoggedIn ? (
              <>
                {/* ROUTE CODE TRONG ĐÂY NHA MẤY NÍ */}
                <Route path='/home' element={<HomePage />} />
                <Route path='/view-syllabus' element={<SyllabusList />} />
                <Route path='/create-syllabus' element={<CreateSyllabusPage />} />
                <Route path='/tranning-program-list' element={<TranningListPage />} />
                <Route path='/class-list' element={<ClassListPage />} />
                <Route path='/user-list' element={<UserListPage />} />
                <Route path='/user-permission' element={<UserPermissionPage />} />
                <Route path='/materials' element={<LearningMaterials />} />

              </>
            ) : (
              <Route path='/login' element={<Login onLogin={handleLogin} />} />
            )}
          </Routes>
        </Layout>
        {isLoggedIn && location.pathname !== '/login' && <Footer />}
      </Layout>
    </div>
  );
}

export default App;
