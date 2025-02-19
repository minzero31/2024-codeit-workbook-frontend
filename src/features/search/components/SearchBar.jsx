// src/features/search/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navigation from '../../../components/Layout/Navigation';

const SearchBar = ({ className = '', onSearch }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 검색어 제안 데이터
  const searchSuggestions = [
    "데이터구조",
    "데이터베이스",
    "웹프로그래밍",
    "알고리즘",
    "프로그래밍입문",
    "오픈소스프로그래밍",
    "컴퓨터아키텍쳐",
    "자료구조",
    "운영체제"
  ];

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim()) {
      const filtered = searchSuggestions.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setShowHistory(false);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowHistory(true);
    }
  };

  const handleFocus = () => {
    if (searchText.trim()) {
      setShowSuggestions(true);
      setShowHistory(false);
    } else {
      setShowHistory(true);
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowHistory(false);
      setShowSuggestions(false);
    }, 200);
  };

  const handleSearch = (text) => {
    if (text.trim()) {
      const newHistory = [text, ...searchHistory.filter(item => item !== text)]
        .slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      
      setShowHistory(false);
      setShowSuggestions(false);
      const searchQuery = encodeURIComponent(text.trim());
      navigate(`/search?q=${searchQuery}`);
      setSearchText('');
      
      if (onSearch) {
        onSearch(text.trim());
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(searchText);
    }
  };

  const removeSearch = (index, e) => {
    e.stopPropagation();
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleHistoryItemClick = (item) => {
    setSearchText(item);
    setShowHistory(false);

    const filtered = searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(item.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full p-2 border rounded-lg pl-10 pr-16"
          placeholder="검색어를 입력하세요"
        />
        <svg 
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <div className="absolute right-2 flex items-center gap-2">
          {searchText && (
            <button 
              onClick={() => setSearchText('')}
              className="p-1"
            >
              <svg 
                className="w-5 h-5 text-gray-400 hover:text-gray-600"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  d="M6 18L18 6M6 6l12 12" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
          
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-1"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 검색어 제안 목록 */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      
      {/* 검색 기록 표시 */}
      {showHistory && searchHistory.length > 0 && !showSuggestions && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          {searchHistory.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleHistoryItemClick(item)}
            >
              <span>{item}</span>
              <button
                onClick={(e) => removeSearch(index, e)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func
};

SearchBar.defaultProps = {
  className: '',
  onSearch: null
};

export default SearchBar;