// src/features/search/components/SearchResults.jsx

import PropTypes from 'prop-types';

const SearchResults = ({ 
  searchTerm,
  results,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  sortBy,
  onSortChange
}) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="w-full p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{`"${searchTerm}"에 대한 검색 결과입니다.`}</h2>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        >
          <option value="latest">최신순</option>
          <option value="rating">별점순</option>
        </select>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{result.userName}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <div className="text-gray-600 mb-1">
                {`${result.subject} - ${result.professor}교수`}
              </div>
              <div className="text-sm text-gray-500">
                <div>문제 수: {result.questionCount}개</div>
                <div>제한시간: {result.timeLimit}</div>
                <div>생성일: {result.createdAt}</div>
              </div>
              <div className="flex items-center mt-2">
                {renderStars(result.rating)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array(totalPages)
            .fill(0)
            .map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

SearchResults.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userName: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      professor: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      questionCount: PropTypes.number.isRequired,
      timeLimit: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  sortBy: PropTypes.oneOf(['latest', 'rating']).isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default SearchResults;