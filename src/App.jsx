import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import MainPage from './pages/Main/MainPage';
import { mockAuthService } from './features/auth/services/mockAuthService';

function App() {
  // 로그인 상태 확인
  const isAuthenticated = mockAuthService.isAuthenticated();

  return (
    <div className="min-h-screen bg-[#7096D1]">
      <Router>
        <Routes>
          {/* 기본 경로 처리 */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          
          {/* 인증 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 메인 페이지 */}
          <Route 
            path="/main" 
            element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
          />

          {/* 알 수 없는 경로 처리 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;