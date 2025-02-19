import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const mypageService = {
  // 사용자의 퀴즈 생성 기록 조회
  async getQuizHistory() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/quiz/history`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('퀴즈 기록 조회 실패:', error);
      throw error;
    }
  },

  // 사용자의 평점 정보 조회
  async getRatings() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/user/ratings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('평점 정보 조회 실패:', error);
      throw error;
    }
  }
};