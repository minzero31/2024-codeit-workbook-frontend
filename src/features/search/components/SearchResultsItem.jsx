// src/features/search/components/SearchResultItem.jsx
import React from 'react';

const SearchResultItem = ({ result }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-xl ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-lg font-semibold">{result.userName}</div>
          <div className="text-gray-600">
            {result.university} {result.subject} ({result.professor} 교수)
          </div>
        </div>
        <div className="flex items-center">
          {renderStars(result.rating)}
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2">
        생성일: {result.createdAt} | 문제 수: {result.questionCount}개 | 
        제한시간: {result.timeLimit}
      </div>
    </div>
  );
};

export default SearchResultItem;