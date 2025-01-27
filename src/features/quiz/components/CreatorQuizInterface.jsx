import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatorQuizInterface = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');

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
      return;
    }

    setIsCreating(true);
    try {
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProgress(i);
      }
      setIsCreating(false);
      navigate('/quiz/solve');
    } catch (error) {
      console.error('문제 생성 오류:', error);
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
          <div>
            <p className="mb-2 font-medium">강의자료를 업로드해주세요.</p>
            <input
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
              multiple
            />
            {files.length > 0 && (
              <div className="mt-2">
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
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
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isCreating ? `문제 생성 중... ${progress}%` : '문제 생성하기'}
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