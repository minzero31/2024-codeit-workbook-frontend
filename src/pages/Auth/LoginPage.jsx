import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../features/auth/components/LoginForm';
import AuthLayout from '../../components/Layout/AuthLayout';
import { mockAuthService } from '../../features/auth/services/mockAuthService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    try {
      const response = await mockAuthService.login(credentials);
      if (response && response.token) {
        // 로그인 성공 후 추가 처리
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/main');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <LoginForm onSubmit={handleLogin} />
    </AuthLayout>
  );
};

export default LoginPage;