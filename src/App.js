import Layout from "antd/es/layout/layout";
import Header from "./Components/Layout/Header";
import Sidebar from "./Components/Layout/Sidebar";
import Footer from "./Components/Layout/Footer";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import crypto from "crypto-js";

import Login from "./Pages/account/Login";
import HomePage from "./Pages/HomePage/HomePage";
import SyllabusList from "./Pages/SyllabusList/SyllabusList";
import SyllabusDetailInformation from "./Pages/SyllabusDetailInformation";
import CreateSyllabusPage from "./Pages/CreateSyllabus/CreateSyllabusPage";
import TranningListPage from "./Pages/TranningProgramListPage";
import TranningProgramDetail from "./Pages/TrainingProgramDetail";
import CreateProgram from "./Pages/CreateProgram/CreateProgram";
import ClassListPage from "./Pages/ClassListPage";
import ViewClass from "./Pages/ViewClass";
import CreateClass from "./Pages/CreateClass/CreateClass";
import TrainingCalendarPage from "./Pages/TrainingCalendarPage";
import UserListPage from "./Pages/UserListPage";
import UserPermissionPage from "./Pages/UserPermissionPage";
import LearningMaterials from "./Pages/LearningMaterials/LearningMaterials";
import { message } from "antd";

function App() {

  const [isLoggedIn, setLoggedIn] = useState(() => {
    const storedStatus = sessionStorage.getItem("isLoggedIn");
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

  const handleLogin = async (user) => {
    try {
      setLoggedIn(true);
      sessionStorage.setItem("isLoggedIn", JSON.stringify(true));

      // Mã hóa roleName trc khi set vào session

      const encryptedRoleName = crypto.AES.encrypt(
        user.role.roleName,
        "react02"
      ).toString();

      const encryptedSyllabus = crypto.AES.encrypt(
        user.role.syllabus,
        "react02"
      ).toString();

      const encryptedTrainingProgram = crypto.AES.encrypt(
        user.role.trainingProgram,
        "react02"
      ).toString();

      const encryptedClass = crypto.AES.encrypt(
        user.role.class,
        "react02"
      ).toString();

      const encryptedLearningMaterial = crypto.AES.encrypt(
        user.role.learningMaterial,
        "react02"
      ).toString();

      sessionStorage.setItem("fullName", user.fullName);
      sessionStorage.setItem("roleName", encryptedRoleName);
      sessionStorage.setItem("RoleSyllabus", encryptedSyllabus);
      sessionStorage.setItem("RoleTrainingProgram", encryptedTrainingProgram);
      sessionStorage.setItem("RoleClass", encryptedClass);
      sessionStorage.setItem("RoleLearningMaterial", encryptedLearningMaterial);

      const token = sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token);

      // Kỉm tra coi thời hạn token còn bao nhiêu (theo giây)
      const isTokenValid = decodedToken.exp > Date.now() / 1000;
      if (!isTokenValid) {
        // Token hết đát
        handleLogout();
        return;
      }

      navigate("/home");
    } catch (error) {
      // Handle API response errors
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Incorrect email or password. Please try again.";

      // Display error message using Ant Design message.error
      message.error(errorMessage);

      // Perform logout if needed
      handleLogout();
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("roleName");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("fullName");
    sessionStorage.removeItem("RoleSyllabus");
    sessionStorage.removeItem("RoleTrainingProgram");
    sessionStorage.removeItem("RoleClass");
    sessionStorage.removeItem("RoleLearningMaterial");

    navigate("/login");
  };

  useEffect(() => {
    // Decode roleName đã mã hóa
    const encryptedRoleName = sessionStorage.getItem("roleName");
    const encryptedToken = sessionStorage.getItem("token");

    if (encryptedRoleName) {
      const decryptedRoleName = crypto.AES.decrypt(
        encryptedRoleName,
        "react02"
      ).toString(crypto.enc.Utf8);
      console.log("Role:", decryptedRoleName);
    }
  }, [isLoggedIn]);

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
                <Route path="/home" element={<SyllabusDetailInformation />} />
                <Route path="/view-syllabus" element={<SyllabusList />} />
                <Route path="/view-syllabus-detail" element={<SyllabusDetailInformation />} />
                <Route path="/create-syllabus" element={<CreateSyllabusPage />} />
                <Route path="/tranning-program-list" element={<TranningListPage />} />
                <Route path="/view-tranning-program-detail/:id" element={<TranningProgramDetail />} />
                <Route path="/create-program" element={<CreateProgram />} />
                <Route path="/class-list" element={<ClassListPage />} />
                <Route path="/view-class-detail/:id" element={<ViewClass />} />
                <Route path="/create-class" element={<CreateClass />} />
                <Route path="/training-calendar" element={<TrainingCalendarPage />} />
                <Route path="/user-list" element={<UserListPage />} />
                <Route path="/user-permission" element={<UserPermissionPage />} />
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
