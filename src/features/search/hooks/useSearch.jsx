import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTerm = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'course';
  const page = parseInt(searchParams.get('page')) || 1;

  // 검색 로직
  const handleSearch = async (term, type = searchType) => {
    if (!term.trim()) return;
    
    setSearchParams({ q: term, type, page: '1' });
  };

  // 페이지 변경
  const handlePageChange = (newPage) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: newPage.toString() });
  };

  return {
    searchTerm,
    searchType,
    page,
    results,
    loading,
    error,
    handleSearch,
    handlePageChange
  };
};