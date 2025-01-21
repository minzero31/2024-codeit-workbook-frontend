// src/components/Layout/Navigation.jsx
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ isOpen, onClose }) => {
  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={onClose}
        />
      )}
      
      {/* 사이드 메뉴 */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">메뉴</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          
          {/* 메뉴 항목들 */}
          <nav className="space-y-4">
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">홈</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">프로필</a>
            <a href="#" className="block p-2 hover:bg-gray-100 rounded">설정</a>
          </nav>
        </div>
      </div>
    </>
  );
};

Navigation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Navigation;