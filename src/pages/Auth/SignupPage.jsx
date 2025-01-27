import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../features/auth/components/SignupForm';
import AuthLayout from '../../components/Layout/AuthLayout';
import { mockAuthService } from '../../features/auth/services/mockAuthService';

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSignup = async (userData) => {
    try {
      await mockAuthService.signup(userData);
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
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
      <SignupForm onSubmit={handleSignup} />
    </AuthLayout>
  );
};

export default SignupPage;