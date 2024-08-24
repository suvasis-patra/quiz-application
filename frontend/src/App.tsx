import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AuthLayout,
  Dashboard,
  Landing,
  UserLogin,
  UserRegister,
} from "./pages";
// import ProtectedRouteProvider from "./providers/ProtectedRouteProvider";
import Quizzes from "./pages/Quizzes";
import CreateQuiz from "./pages/CreateQuiz";
import PlayQuiz from "./pages/PlayQuiz";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="quizzes" element={<Quizzes />} />
      </Route>
      <Route path="quizzes/:quizId" element={<PlayQuiz />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<UserRegister />} />
        <Route path="login" element={<UserLogin />} />
      </Route>
      <Route path="/create-quiz" element={<CreateQuiz />} />
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
