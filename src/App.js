import './App.css'
import Layout from 'antd/es/layout/layout';
import Header from "./Components/Layout/Header";
import Sidebar from "./Components/Layout/Sidebar";
import Footer from "./Components/Layout/Footer";
import { Route, Routes } from 'react-router-dom';
import UserListPage from './Pages/UserListPage';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />
        <Layout>
          <Sidebar />
          <Routes>
            <Route path='/user-list' element={<UserListPage />} />
          </Routes>
        </Layout>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
