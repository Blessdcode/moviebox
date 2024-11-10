import { Route, Routes } from "react-router-dom";

import Home from "./pages/home.component";
import SignUp from "./pages/sign-up";
import Login from "./pages/login";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
