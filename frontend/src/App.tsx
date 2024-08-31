import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AuthLayout,
  Dashboard,
  DashboardLayout,
  Landing,
  UserLogin,
  UserRegister,
} from "./pages";
import Quizzes from "./pages/Quizzes";
import CreateQuiz from "./pages/CreateQuiz";
import PlayQuiz from "./pages/PlayQuiz";
import ProtectedRouteProvider from "./providers/ProtectedRouteProvider";
import ForbiddenPage from "./pages/ForbiddenPage";
import ProfilePage from "./pages/UserProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<UserRegister />} />
        <Route path="login" element={<UserLogin />} />
      </Route>
      <Route
        element={<ProtectedRouteProvider allowedRoles={["user", "admin"]} />}
      >
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index={true} element={<DashboardLayout />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="quizzes/:quizId" element={<PlayQuiz />} />
      </Route>
      <Route element={<ProtectedRouteProvider allowedRoles={["admin"]} />}>
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Route>
      <Route path="/unauthorized" element={<ForbiddenPage />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
