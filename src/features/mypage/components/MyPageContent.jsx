import { useState } from 'react';
import Navigation from '../../../components/Layout/Navigation';
import SearchBar from '../../search/components/SearchBar';

const MyPageContent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedRating, setSelectedRating] = useState('all');
  const [visibleQuizCount, setVisibleQuizCount] = useState(3);

  // mock 데이터 - 실제로는 API에서 받아올 데이터
  const quizHistory = [
    {
      id: 1,
      title: '웹프로그래밍 2주차',
      date: '2024.11.1',
      school: '숙명여자대학교',
      professor: '김OO 교수님',
      subject: '웹프로그래밍',
      questionCount: '15문제',
      thumbnail: '/api/placeholder/200/120' // 실제 이미지(URL)로 대체 필요
    },
    {
      id: 2,
      title: '알고리즘 입문 3주차',
      date: '2024.11.1',
      school: '숙명여자대학교',
      professor: '이OO 교수님',
      subject: '알고리즘',
      questionCount: '15문제',
      thumbnail: '/api/placeholder/200/120'
    },
    {
      id: 3,
      title: '자료구조 1주차',
      date: '2024.11.1',
      school: '숙명여자대학교',
      professor: '박OO 교수님',
      subject: '자료구조',
      questionCount: '15문제',
      thumbnail: '/api/placeholder/200/120'
    },
    {
      id: 4,
      title: '데이터베이스 2주차',
      date: '2024.11.1',
      school: '숙명여자대학교',
      professor: '최OO 교수님',
      subject: '데이터베이스',
      questionCount: '15문제',
      thumbnail: '/api/placeholder/200/120'
    }
  ];

  const solvedQuizzes = [
    { id: 1, title: '자료구조 1주차', rating: 5, date: '2024.11.1' },
    { id: 2, title: '웹프로그래밍 1주차', rating: 4, date: '2024.11.1' },
    { id: 3, title: '알고리즘 2주차', rating: 3, date: '2024.11.1' },
    { id: 4, title: '데이터베이스 3주차', rating: 4, date: '2024.11.1' },
    { id: 5, title: '운영체제 1주차', rating: 5, date: '2024.11.1' },
    { id: 6, title: '컴퓨터구조 2주차', rating: 3, date: '2024.11.1' },
  ];

  // 별점 평균 평점 계산
  const averageRating = solvedQuizzes.reduce((acc, quiz) => acc + quiz.rating, 0) / solvedQuizzes.length;

  // 선택된 평점에 따른 퀴즈 필터링
  const filteredQuizzes = selectedRating === 'all' 
    ? solvedQuizzes 
    : solvedQuizzes.filter(quiz => quiz.rating === Number(selectedRating));

  // 더보기 처리를 위한 슬라이스
  const visibleQuizzes = filteredQuizzes.slice(0, visibleQuizCount);

  const handleLoadMore = () => {
    setVisibleQuizCount(prev => prev + 3);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-4">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-[#7096D1] rounded-t-lg px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">마이페이지</h1>
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
          <div className="bg-white rounded-b-lg p-6 shadow-lg">
            {/* 생성기록 섹션 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">생성기록</h2>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-4" style={{ minWidth: 'min-content' }}>
                  {quizHistory.map(quiz => (
                    <div key={quiz.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 w-80 flex-shrink-0">
                      <div className="aspect-video mb-3 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={quiz.thumbnail} 
                          alt={quiz.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{quiz.title}</h3>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">{quiz.questionCount}</p>
                        <p className="text-sm text-gray-600">생성일: {quiz.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 평점별 문제 섹션 */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">평점별 문제</h2>
                <select 
                  value={selectedRating}
                  onChange={(e) => {
                    setSelectedRating(e.target.value);
                    setVisibleQuizCount(3); // 필터 변경 시 보이는 개수 초기화
                  }}
                  className="p-2 border rounded-lg"
                >
                  <option value="all">전체 보기</option>
                  <option value="5">5점</option>
                  <option value="4">4점</option>
                  <option value="3">3점</option>
                  <option value="2">2점</option>
                  <option value="1">1점</option>
                </select>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.round(averageRating))}
                    {'☆'.repeat(5 - Math.round(averageRating))}
                  </div>
                  <span className="text-lg">{averageRating.toFixed(1)}</span>
                </div>

                {/* 필터링된 문제 목록 */}
                <div className="space-y-2 mt-4">
                  {visibleQuizzes.map(quiz => (
                    <div key={quiz.id} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <div>{quiz.title}</div>
                          <div className="text-sm text-gray-500">{quiz.date}</div>
                        </div>
                        <div className="flex text-yellow-400">
                          {'★'.repeat(quiz.rating)}
                          {'☆'.repeat(5 - quiz.rating)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 더보기 버튼 */}
                {visibleQuizCount < filteredQuizzes.length && (
                  <button
                    onClick={handleLoadMore}
                    className="w-full mt-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    더보기...
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation 컴포넌트 */}
      <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default MyPageContent;