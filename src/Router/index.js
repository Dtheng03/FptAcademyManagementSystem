import { Outlet, createBrowserRouter } from "react-router-dom";
import Authentication from "./Authentication";
import RootLayoput from "./RootLayout";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage/HomePage";
import SyllabusList from "../Pages/SyllabusList/SyllabusList";
import SyllabusDetailInformation from "../Pages/SyllabusDetailInformation";
import CreateSyllabusPage from "../Pages/CreateSyllabus/CreateSyllabusPage";
import TranningListPage from "../Pages/TranningProgramListPage";
import TranningProgramDetail from "../Pages/TrainingProgramDetail";
import CreateProgram from "../Pages/CreateProgram/CreateProgram";
import ClassListPage from "../Pages/ClassListPage";
import ViewClass from "../Pages/ViewClass";
import CreateClass from "../Pages/CreateClass/CreateClass";
import TrainingCalendarPage from "../Pages/TrainingCalendarPage";
import UserListPage from "../Pages/UserListPage";
import UserPermissionPage from "../Pages/UserPermissionPage";
import LearningMaterials from "../Pages/LearningMaterials/LearningMaterials";
import ChangePasswordPage from "../Pages/ChangePasswordPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Authentication>
                <RootLayoput>
                    <Outlet />
                </RootLayoput>
            </Authentication>
        ),
        errorElement: (
            <RootLayoput>
                <ErrorPage />
            </RootLayoput>
        ),
        children: [
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "view-syllabus",
                element: <SyllabusList />,
            },
            {
                path: "view-syllabus-detail/:id",
                element: <SyllabusDetailInformation />,
            },
            {
                path: "create-syllabus",
                element: <CreateSyllabusPage />,
            },
            {
                path: "tranning-program-list",
                element: <TranningListPage />,
            },
            {
                path: "view-tranning-program-detail/:id",
                element: <TranningProgramDetail />,
            },
            {
                path: "create-program",
                element: <CreateProgram />,
            },
            {
                path: "class-list",
                element: <ClassListPage />,
            },
            {
                path: "view-class-detail/:id",
                element: <ViewClass />,
            },
            {
                path: "create-class",
                element: <CreateClass />,
            },
            {
                path: "training-calendar",
                element: <TrainingCalendarPage />,
            },
            {
                path: "user-list",
                element: <UserListPage />,
            },
            {
                path: "user-permission",
                element: <UserPermissionPage />,
            },
            {
                path: "materials",
                element: <LearningMaterials />,
            },
            {
                path: "password",
                element: <ChangePasswordPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default router;