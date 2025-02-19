// src/features/search/services/searchService.js
import { mockFetchResults, SUBJECT_OPTIONS, PROFESSOR_OPTIONS } from '../mocks/searchMockData';

export const searchService = {
  async search(query, page = 1, sortBy = 'latest', filters = {}) {
    try {
      const response = await mockFetchResults(query, page, sortBy, filters);
      return {
        results: response.data,
        currentPage: response.pagination.currentPage,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
        itemsPerPage: response.pagination.itemsPerPage
      };
    } catch (error) {
      console.error('Search error:', error);
      throw new Error('검색 중 오류가 발생했습니다.');
    }
  },

  async getFilterOptions() {
    return {
      subjects: SUBJECT_OPTIONS,
      professors: PROFESSOR_OPTIONS
    };
  }
};