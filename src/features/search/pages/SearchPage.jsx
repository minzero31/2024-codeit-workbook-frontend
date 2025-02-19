// src/features/search/pages/SearchPage.jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchFilter from '../components/SearchFilter';
import Navigation from '../../../components/Layout/Navigation';
import { searchService } from '../services/searchService';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('latest');
  const [filters, setFilters] = useState({});

  const searchTerm = searchParams.get('q') || '';

  const handleSearch = async (term) => {
    if (!term.trim()) return;
    setSearchParams({ q: term });
    setCurrentPage(1);
  };

  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchService.search(searchTerm, currentPage, sortBy, filters);
        setResults(response.results);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('검색 결과를 불러오는데 실패했습니다.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, currentPage, sortBy, filters]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 상단 검색바 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <SearchBar 
            className="w-full"
            initialSearchTerm={searchTerm}
            onSearch={handleSearch}
          />
        </div>

        {/* 필터&정렬 섹션 */}
        <div className="mb-4 flex justify-between items-center">
          <SearchFilter 
            onFilterChange={(filterType, value) => {
              setFilters(prev => ({
                ...prev,
                [filterType]: value
              }));
              setCurrentPage(1);
            }} 
          />

          {/* 정렬 옵션 */}
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">최신순</option>
            <option value="rating">별점순</option>
          </select>
        </div>


        {/* 검색 결과 */}
        <div className="bg-white rounded-lg shadow-lg">
          {loading ? (
            <div className="p-4 text-center">검색 중...</div>
          ) : error ? (
            <div className="p-4 text-red-500 text-center">{error}</div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center">
              {searchTerm ? '검색 결과가 없습니다.' : '검색어를 입력해주세요.'}
            </div>
          ) : (
            <SearchResults 
              results={results}
              loading={loading}
              error={error}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              sortBy={sortBy}
              onSortChange={handleSort}
              searchTerm={searchTerm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;