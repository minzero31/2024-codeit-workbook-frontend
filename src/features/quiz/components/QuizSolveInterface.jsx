import { useState } from 'react';
import PropTypes from 'prop-types';

const QuizSolveInterface = ({ currentStep, setCurrentStep, onSave, onDiscard }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const totalQuestions = 20;

  const quizData = {
    title: "숙명여대 알고리즘 입문 중간고사",
    totalQuestions: 20,
    currentQuestion: {
      number: currentStep,
      text: "다음과 같이 배열에 저장된 입력 자료들을 삽입 정렬(Insertion Sort)로 오름차순 정렬하고자 한다. 정렬과정에서 단계별 정렬 순서로 나타낼 수 있는 것은?",
      answers: [
        "1, 3, 15, 18, 35, 20, 4, 26",
        "4, 3, 15, 18, 35, 20, 4, 26",
        "7, 3, 15, 18, 35, 20, 4, 26",
        "1, 3, 15, 18, 35, 20, 4, 26"
      ]
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      setSelectedAnswer(null);
    }
  };

  const handleNext = () => {
    if (currentStep < totalQuestions) {
      setCurrentStep(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const isLastPage = currentStep === totalQuestions;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold">개구리</span>
          <span className="text-gray-600">{currentStep}/{totalQuestions}문제</span>
        </div>

        <div className="p-6 bg-blue-50 rounded-t-lg">
          <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
            <h2 className="text-base text-gray-600 mb-2">{quizData.title}</h2>
            <p className="text-gray-900 font-bold text-xl mb-2">문제 {currentStep}번</p>
            <p className="text-gray-800">{quizData.currentQuestion.text}</p>
          </div>

          <div className="space-y-3">
            {quizData.currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full p-3 bg-white rounded-lg cursor-pointer border-2 transition-colors
                  ${selectedAnswer === index ? 'border-blue-500' : 'border-transparent hover:border-blue-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${selectedAnswer === index ? 'border-blue-500' : 'border-gray-300'}`}
                  >
                    {selectedAnswer === index && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <span className="text-left">{answer}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between p-4">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>
          
          {isLastPage ? (
            <div className="flex gap-4">
              <button
                onClick={onDiscard}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                폐기
              </button>
              <button
                onClick={onSave}
                disabled={selectedAnswer === null}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                저장
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

QuizSolveInterface.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired
};

export default QuizSolveInterface;