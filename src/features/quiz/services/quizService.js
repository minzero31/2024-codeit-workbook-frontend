// src/features/quiz/services/quizService.js
import axios from 'axios';

export const quizService = {
  async createQuiz(files, subjectData) {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('subject', subjectData.subject);
      formData.append('professor', subjectData.professor);
      formData.append('university', subjectData.university);

      const response = await axios.post('/api/quiz/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          return percentCompleted;
        },
      });

      return response.data;
    } catch (error) {
      throw new Error('문제 생성 중 오류가 발생했습니다.');
    }
  },
};