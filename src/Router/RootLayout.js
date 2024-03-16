import Layout from "antd/es/layout/layout";
import Header from "../Components/Layout/Header";
import Sidebar from "../Components/Layout/Sidebar";
import Footer from "../Components/Layout/Footer";

function RootLayoput({ children }) {
    return (
        <Layout>
            <Header />
            <Layout>
                <Sidebar />
                {children}
            </Layout>
            <Footer />
        </Layout>
    );
}

export default RootLayoput;