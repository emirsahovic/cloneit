import { Routes, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Registration from "./pages/Registration";
import Surveys from "./pages/Surveys";

function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Routes>
        <Route path="/signup" element={<AuthRoute />}>
          <Route path="/signup" element={<Registration />} />
        </Route>
        <Route path="/signin" element={<AuthRoute />}>
          <Route path="/signin" element={<Login />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Surveys />} />
        <Route path="/profile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
