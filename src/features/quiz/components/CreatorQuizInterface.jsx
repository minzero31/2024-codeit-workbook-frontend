import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizService } from '../services/quizService';

const CreatorQuizInterface = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => {
      const ext = file.name.toLowerCase().split('.').pop();
      return ['pdf', 'ppt', 'pptx', 'doc', 'docx'].includes(ext);
    });
    
    setFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length !== files.length) {
      alert('지원하지 않는 파일 형식이 포함되어 있습니다.');
    }
  };

  const handleCreateQuiz = async () => {
    if (!files.length || !selectedSubject || !selectedProfessor) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setIsCreating(true);
    setError('');

    try {
      const quizData = await quizService.createQuiz(files, {
        subject: selectedSubject,
        professor: selectedProfessor,
        university: '숙명여자대학교'
      });

      // 문제 생성이 성공하면 solve 페이지로 이동
      navigate('/quiz/solve', { state: { quizData } });
    } catch (error) {
      setError(error.message || '문제 생성 중 오류가 발생했습니다.');
      setIsCreating(false);
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <p className="mb-2 font-medium">강의자료를 업로드해주세요.</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                multiple
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer text-blue-500 hover:text-blue-600"
              >
                파일 선택 또는 여기로 드래그하세요
              </label>
              <p className="text-sm text-gray-500 mt-1">
                PDF, PPT, WORD 파일 지원
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">업로드된 파일</h3>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              value="숙명여자대학교"
              disabled
              className="p-2 border rounded bg-gray-50"
            />
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">과목 선택</option>
              <option value="웹프로그래밍">웹프로그래밍</option>
              <option value="알고리즘">알고리즘</option>
              <option value="데이터구조">데이터구조</option>
            </select>
            <select 
              value={selectedProfessor}
              onChange={(e) => setSelectedProfessor(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">교수님 선택</option>
              <option value="김상연">김상연 교수님</option>
              <option value="박영호">박영호 교수님</option>
            </select>
          </div>

          <button
            onClick={handleCreateQuiz}
            disabled={isCreating || !files.length || !selectedSubject || !selectedProfessor}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isCreating ? '문제 생성 중...' : '문제 생성하기'}
          </button>

          {isCreating && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorQuizInterface;