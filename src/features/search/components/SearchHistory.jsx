// src/features/search/components/SearchHistory.jsx

import PropTypes from 'prop-types';

const SearchHistory = ({ histories, onHistoryClick }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      {histories.map((history, index) => (
        <div 
          key={index}
          className="p-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => onHistoryClick(history)}
        >
          {history}
        </div>
      ))}
    </div>
  );
};

SearchHistory.propTypes = {
  histories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onHistoryClick: PropTypes.func.isRequired
};

export default SearchHistory;