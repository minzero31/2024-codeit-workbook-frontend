import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Navigation from '../../../components/Layout/Navigation';

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = {
  'application/pdf': ['.pdf'],
  'application/vnd.ms-powerpoint': ['.ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};

const LECTURE_DATA = [
  { id: 1, school: '숙명여자대학교', subject: '데이터구조', professor: '박영호' },
  { id: 2, school: '숙명여자대학교', subject: '프로그래밍 입문', professor: '이종우' },
  { id: 3, school: '숙명여자대학교', subject: '오픈소스프로그래밍', professor: '김병규' },
  { id: 4, school: '숙명여자대학교', subject: '컴퓨터아키텍쳐', professor: '김철연' },
  { id: 5, school: '숙명여자대학교', subject: '기기구조론', professor: '김철연' },
  { id: 6, school: '숙명여자대학교', subject: '공학수학', professor: '강지우' },
  { id: 7, school: '숙명여자대학교', subject: '서버운영및보안', professor: '정성훈' },
  { id: 8, school: '숙명여자대학교', subject: '웹프로그래밍', professor: '김상연' },
  { id: 9, school: '숙명여자대학교', subject: '인공지능입문', professor: '김상연' }
];

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [headerSearchTerm, setHeaderSearchTerm] = useState('');
  const [isCreatingProblem, setIsCreatingProblem] = useState(false);
  const [problemTitle, setProblemTitle] = useState('');
  const [recentProblems, setRecentProblems] = useState([
    {
      id: 1,
      title: '웹프로그래밍 1주차',
      status: 'generating',
      progress: '2/10'
    },
    {
      id: 2,
      title: '알고리즘 입문 2주차',
      status: 'completed',
      reference: '상세 참조'
    }
  ]);

  // ... 기존 함수들은 모두 동일하게 유지 ...
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(file => {
        if (file.size > MAX_FILE_SIZE) {
          alert('파일 크기는 50MB를 초과할 수 없습니다.');
        } else {
          alert('허용되지 않는 파일 형식입니다.');
        }
      });
    }
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true
  });

  const removeFile = (fileIndex) => {
    setFiles(prev => prev.filter((_, index) => index !== fileIndex));
  };

  const filteredSubjects = LECTURE_DATA
    .filter((lecture, index, self) => 
      index === self.findIndex(l => l.subject === lecture.subject) &&
      lecture.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map(lecture => lecture.subject);

  const availableProfessors = selectedSubject
    ? [...new Set(LECTURE_DATA
        .filter(lecture => lecture.subject === selectedSubject)
        .map(lecture => lecture.professor))]
    : [];

  const isCreateEnabled = files.length > 0 && selectedSubject && selectedProfessor;

  const handleCreateProblem = () => {
    const newProblem = {
      id: Date.now(),
      title: problemTitle,
      status: 'generating',
      progress: '0/10'
    };

    setRecentProblems(prev => [newProblem, ...prev].slice(0, 2));
    setIsCreatingProblem(false);
    setProblemTitle('');
    setFiles([]);
    setSelectedSubject('');
    setSelectedProfessor('');
  };

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
                <input
                  type="text"
                  value={headerSearchTerm}
                  onChange={(e) => setHeaderSearchTerm(e.target.value)}
                  className={`w-full p-2 rounded-lg bg-white border border-gray-300 transition-all duration-300 ${
                    showSearch ? 'opacity-100' : 'opacity-0'
                  }`}
                  placeholder="검색어를 입력하세요"
                  {...(showSearch ? { autoFocus: true } : {})}
                />
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`absolute ${showSearch ? 'right-2' : 'right-0'} top-1/2 transform -translate-y-1/2`}
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
            
            <div 
              {...getRootProps()} 
              className={`bg-gray-50 rounded-lg p-8 mb-6 text-center border-2 border-dashed 
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                transition-colors duration-200 cursor-pointer`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <p className="mb-2">강의자료를 업로드해주세요.</p>
                <p className="text-sm text-gray-500 mb-4">PDF, PPT, WORD 파일 지원</p>
                <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center justify-center text-xl">
                  +
                </button>
              </div>
              
              {files.length > 0 && (
                <div className="mt-4 text-left">
                  <h4 className="font-medium mb-2">업로드된 파일:</h4>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between bg-white p-2 rounded">
                        <span className="truncate">{file.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

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
                  value={searchTerm || selectedSubject}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (selectedSubject) setSelectedSubject('');
                  }}
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300"
                />
                {searchTerm && (
                  <div className="absolute mt-1 w-[calc(33.333% - 1rem)] bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                    {filteredSubjects.map((subject) => (
                      <div
                        key={subject}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedSubject(subject);
                          setSearchTerm('');
                          setSelectedProfessor('');
                        }}
                      >
                        {subject}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <select
                value={selectedProfessor}
                onChange={(e) => setSelectedProfessor(e.target.value)}
                className="p-3 rounded-lg bg-gray-50 border border-gray-300"
                disabled={!selectedSubject}
              >
                <option value="">교수님 선택</option>
                {availableProfessors.map((professor) => (
                  <option key={professor} value={professor}>
                    {professor} 교수님
                  </option>
                ))}
              </select>
            </div>

            {!isCreatingProblem ? (
              <button 
                className={`w-full py-3 rounded-lg transition-colors ${
                  isCreateEnabled 
                    ? 'bg-blue-200 text-blue-800 hover:bg-blue-300' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isCreateEnabled}
                onClick={() => setIsCreatingProblem(true)}
              >
                문제 생성하기
              </button>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="문제 제목을 입력하세요"
                  value={problemTitle}
                  onChange={(e) => setProblemTitle(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300"
                />
                <div className="flex gap-4">
                  <button
                    className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    onClick={() => {
                      setIsCreatingProblem(false);
                      setProblemTitle('');
                    }}
                  >
                    취소
                  </button>
                  <button
                    className={`flex-1 py-3 rounded-lg ${
                      problemTitle 
                        ? 'bg-blue-200 text-blue-800 hover:bg-blue-300' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!problemTitle}
                    onClick={handleCreateProblem}
                  >
                    생성
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="font-bold mb-4">최근 생성된 문제</h3>
              <div className="grid grid-cols-2 gap-4">
                {recentProblems.map(problem => (
                  <div key={problem.id} className="bg-gray-100 p-4 rounded-lg">
                    <h4>{problem.title}</h4>
                    <p className="text-sm text-gray-500">
                      {problem.status === 'generating' 
                        ? `생성 중...(${problem.progress})`
                        : problem.reference
                      }
                    </p>
                  </div>
                ))}
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