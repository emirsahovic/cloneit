import { Routes, Route } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<AuthRoute />}>
          <Route path="/signup" element={<Registration />} />
        </Route>
        <Route path="/signin" element={<AuthRoute />}>
          <Route path="/signin" element={<Login />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
