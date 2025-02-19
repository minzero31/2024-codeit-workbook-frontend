import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../../components/Layout/Navigation';
import SearchBar from '../../search/components/SearchBar';

const MainPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <div className="pt-4">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#7096D1] rounded-t-lg px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">개구리</h1>
            <div className="flex gap-6 items-center">
              <div className={`relative transition-all duration-300 ${
                showSearch ? 'w-80' : 'w-10'
              }`}>
                {showSearch && (
                  <div className="w-full">
                    <SearchBar className="w-full" />
                  </div>
                )}
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`absolute ${showSearch ? 'right-2' : 'right-0'} top-1/2 transform -translate-y-1/2 z-10`}
                >
                  {showSearch ? (
                    <span className="text-gray-500 text-xl">×</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )}
                </button>
              </div>
              
              <button 
                className="p-2 hover:bg-[#8BA7D9] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main>
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6">문제 생성하기</h2>
            
            {/* 파일 업로드 섹션 */}
            <div className="bg-gray-50 rounded-lg p-8 mb-6 text-center border-2 border-dashed border-gray-300">
              <div className="flex flex-col items-center">
                <p className="mb-2">강의자료를 업로드해주세요.</p>
                <p className="text-sm text-gray-500 mb-4">PDF, PPT, WORD 파일 지원</p>
                <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center justify-center text-xl">
                  +
                </button>
              </div>
            </div>

            {/* 강의 정보 입력 섹션 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <input
                  type="text"
                  value="숙명여자대학교"
                  disabled
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="과목 검색"
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
                />
              </div>
              <select
                className="p-3 rounded-lg bg-gray-50 border border-gray-300"
                defaultValue=""
              >
                <option value="">교수님 선택</option>
              </select>
            </div>

            {/* 문제 생성 버튼 */}
            <button 
              className="w-full py-3 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
              disabled
            >
              문제 생성하기
            </button>

            {/* 최근 생성된 문제 섹션 */}
            <div className="mt-8">
              <h3 className="font-bold mb-4">최근 생성된 문제</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4>웹프로그래밍 1주차</h4>
                  <p className="text-sm text-gray-500">생성 중...(2/10)</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4>알고리즘 입문 2주차</h4>
                  <p className="text-sm text-gray-500">상세 참조</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default MainPage;