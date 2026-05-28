import { BrowserRouter, Routes, Route } from "react-router-dom";

import Body from "./Componant/Body";
import Login from "./Componant/Login";
import Profile from "./Componant/Profile";
import Feed from "./Componant/Feed";
import Connection from "./Componant/Connection";
import Request from "./Componant/Request";
import ProtectedRoute from "./Componant/ProtectedRoute";
import Premium from "./Componant/Premium";

import { Provider } from "react-redux";
import { appstore } from "./utils/appstore";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Signup } from "./Componant/Signup";
import ForgotPassword from "./Componant/ForgotPassword";
import Home from "./Componant/Home";
function App() {
  return (
    <Provider store={appstore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }
          >
            <Route index element={<Feed />} />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
          </Route>

          <Route
            path="/connection"
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }
          >
            <Route index element={<Connection />} />
          </Route>

          <Route
            path="/request"
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }
          >
            <Route index element={<Request />} />
          </Route>
          <Route
            path="/premium"
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }
          >
            <Route index element={<Premium />} />
          </Route>
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
