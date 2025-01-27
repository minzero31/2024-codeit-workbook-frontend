// src/features/auth/components/LoginForm.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // 입력이 변경되면 에러 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
        <p className="mt-2 text-sm text-gray-600">
          또는{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            새 계정 만들기
          </Link>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
            학번
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading}
            pattern="[0-9]*"  // 숫자만 입력 가능
            maxLength="10"    // 최대 10자리
            placeholder="학번을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              로그인 상태 유지
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              비밀번호를 잊으셨나요?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D0E3F1] hover:bg-[#E8D0F1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};


export default LoginForm;