import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#7096D1] p-4">
      {/* 상단 헤더 */}
      <header className="flex justify-between items-center mb-8 p-4">
        <h1 className="text-2xl font-bold text-white">개구리</h1>
        <div className="flex gap-4">
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">문제 생성하기</h2>
          
          {/* 파일 업로드 섹션 */}
          <div className="bg-gray-100 rounded-lg p-6 mb-6">
            <p className="text-center mb-2">강의자료를 업로드해주세요.</p>
            <p className="text-center text-gray-500 text-sm mb-4">PDF, PPT, WORD 파일 지원</p>
            <button className="w-full py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200">
              +
            </button>
          </div>

          {/* 선택 옵션 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              학교 선택
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              과목 선택
            </div>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              교수님 선택
            </div>
          </div>

          {/* 생성 버튼 */}
          <button className="w-full py-3 bg-blue-200 text-blue-800 rounded-lg hover:bg-blue-300">
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
      </main>
    </div>
  );
};

export default MainPage;