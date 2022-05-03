import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./component/Header";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import { useEffect } from "react";
import AddEditTour from "./pages/AddEditTour";
import SingleTour from "./pages/SingleTour";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivetRoute from "./component/PrivetRoute";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  //Routing
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tag/:id" element={<Home />} />
            <Route path="/tours/search" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
            path="/addTour"
            element={
              <PrivetRoute>
                <AddEditTour />
              </PrivetRoute>
            }
            />
            <Route
            path="/editTour/:id"
            element={
              <PrivetRoute>
                <AddEditTour />
              </PrivetRoute>
            }
            />

            <Route path="/tour/:id" element={<SingleTour />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
