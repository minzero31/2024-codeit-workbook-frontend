// src/features/search/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(history);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      const newHistory = [searchText, ...searchHistory.filter(item => item !== searchText)]
        .slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      setSearchText('');
    }
  };

  const removeSearch = (index) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleSearch}
          className="w-full p-2 border rounded-lg pl-10"
          placeholder="검색어를 입력하세요"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      
      {(searchText || searchHistory.length > 0) && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
          {searchHistory.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-100">
              <span>{item}</span>
              <button
                onClick={() => removeSearch(index)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;