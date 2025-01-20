import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import MainPage from './features/main/pages/MainPage';
import { mockAuthService } from './features/auth/services/mockAuthService';

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = mockAuthService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// props 타입 검증
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  // 로그인 상태 확인
  const [isAuthenticated, setIsAuthenticated] = useState(mockAuthService.isAuthenticated());

  // 인증 상태 변경 감지
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(mockAuthService.isAuthenticated());
    };

    // localStorage 변경 이벤트 리스너
    window.addEventListener('storage', checkAuth);

    // 로컬 상태 변경 감지를 위한 interval 설정
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* 기본 경로 처리 */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />} 
        />
        
        {/* 인증 페이지 */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/main" /> : <LoginPage />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/main" /> : <SignupPage />} 
        />

        {/* 보호된 라우트 */}
        <Route
          path="/main/*"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />

        {/* 알 수 없는 경로 처리 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;