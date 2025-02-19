// src/features/search/components/SearchFilter.jsx
import PropTypes from 'prop-types';

const SearchFilter = ({ onFilterChange }) => {
  const filters = {
    years: [2024, 2023, 2022, 2021, 2020],
    semesters: ['1학기', '여름학기', '2학기', '겨울학기'],
    examTypes: ['중간고사', '기말고사']
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm mb-4">
      <select
        onChange={(e) => onFilterChange('year', e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="">전체 연도</option>
        {filters.years.map(year => (
          <option key={year} value={year}>{year}년</option>
        ))}
      </select>

      <select
        onChange={(e) => onFilterChange('semester', e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="">전체 학기</option>
        {filters.semesters.map(semester => (
          <option key={semester} value={semester}>{semester}</option>
        ))}
      </select>

      <select
        onChange={(e) => onFilterChange('examType', e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue=""
      >
        <option value="">전체 시험</option>
        {filters.examTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  );
};

SearchFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired
};

export default SearchFilter;