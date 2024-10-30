import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Landing from "./Landing-Page/Landing";
import Register from "./Regsiter-Page/Register";
import Login from "./Login-Page/Login";
import Main from "./Main-Page/Main";
import Create from "./Create-Form/Create";
import Profile from "./Profile/Profile";
import MyThought from "./My-Thought/MyThought";
import Protected from "./Protected-Routes/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <Navbar />
                <Landing />
                <ToastContainer />
              </>
            }
            path="/"
          />
          <Route
            element={
              <>
                <Navbar />
                <Login />
                <ToastContainer />
              </>
            }
            path="/login"
          />
          <Route
            element={
              <>
                <Navbar />
                <Register />
                <ToastContainer />
              </>
            }
            path="/register"
          />

          <Route element={<Protected />}>
            <Route
              element={
                <>
                  <Navbar />
                  <Main />
                  <ToastContainer />
                </>
              }
              path="/main"
            />
            <Route
              element={
                <>
                  <Navbar />
                  <Profile />
                  <ToastContainer />
                </>
              }
              path="/profile"
            />
            <Route
              element={
                <>
                  <Navbar />
                  <MyThought />
                  <ToastContainer />
                </>
              }
              path="/mythoughts"
            />
            <Route
              element={
                <>
                  <Navbar />
                  <Create />
                  <ToastContainer />
                </>
              }
              path="/create"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
