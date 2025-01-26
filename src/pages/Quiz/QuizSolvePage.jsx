// src/pages/Quiz/QuizSolvePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizSolveInterface from '../../features/quiz/components/QuizSolveInterface';

const QuizSolvePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleSave = () => {
    // 저장 로직
    navigate('/main');
  };

  const handleDiscard = () => {
    // 폐기 로직
    navigate('/main');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <QuizSolveInterface 
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </div>
  );
};

export default QuizSolvePage;