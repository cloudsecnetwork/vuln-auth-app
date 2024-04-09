import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './components/LoginPage';
import Register from './components/RegisterPage';
import Dashboard from './components/DashboardPage';
import ForgotPwd from './components/ForgotPwdPage';
import TransactionDetail from './components/TransactionDetailPage';
import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPwd />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaction/:reference" element={<TransactionDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
