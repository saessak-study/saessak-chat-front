import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FindUserInfoPage from './pages/FindUserInfoPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mainchat" element={<HomePage />} />
        <Route path="/registration" element={<RegisterPage />} />
        <Route path="/infoinquiry" element={<FindUserInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
