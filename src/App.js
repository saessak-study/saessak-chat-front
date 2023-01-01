import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FindUserInfoPage from "./pages/FindUserInfoPage"
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage/>} />
        <Route path="/FindUserInfoPage" element={<FindUserInfoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
