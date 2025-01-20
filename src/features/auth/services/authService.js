// src/features/auth/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // 실제 백엔드 API URL

export const authService = {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  },

  isAuthenticated() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!token && !!user;
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};