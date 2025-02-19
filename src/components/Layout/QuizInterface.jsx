import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizInterface = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [showReview, setShowReview] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});

    const quizData = {
        title: "숙명여대 알고리즘 입문 중간고사",
        totalQuestions: 10,
        questions: [
            {
                number: 1,
                text: "다음과 같이 배열에 저장된 입력 자료들을 삽입 정렬(Insertion Sort)로 오름차순 정렬하고자 한다. 정렬과정에서 단계별 정렬 순서로 나타낼 수 있는 것은?",
                answers: [
                    "1, 3, 15, 18, 35, 20, 4, 26",
                    "4, 3, 15, 18, 35, 20, 4, 26",
                    "7, 3, 15, 18, 35, 20, 4, 26",
                    "1, 3, 15, 18, 35, 20, 4, 26"
                ],
                correctAnswer: 2,
                explanation: "삽입 정렬은 두 번째 자료부터 시작하여 그 앞의 자료들과 비교하여 삽입할 위치를 지정한 후 자료를 뒤로 옮기고 지정한 자리에 자료를 삽입하여 정렬하는 알고리즘입니다. 각 단계별로 정렬된 결과를 보면 정답을 확인할 수 있습니다."
            }
        ]
    };

    // Generate sample questions with explanations
    for (let i = 1; i < 10; i++) {
        quizData.questions.push({
            number: i + 1,
            text: `알고리즘 문제 ${i + 1}번`,
            answers: ["보기 1", "보기 2", "보기 3", "보기 4"],
            correctAnswer: Math.floor(Math.random() * 4),
            explanation: `문제 ${i + 1}번 풀이입니다. 이 문제는 [주요 개념]을 이해하고 있는지 확인하는 문제입니다. [핵심 풀이 과정]을 통해 답을 도출할 수 있습니다.`
        });
    }

    const handleAnswerSelect = (answer) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentStep]: answer
        }));
    };

    const handlePrevious = () => {
        if (showReview) {
            setShowReview(false);
            return;
        }
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentStep === quizData.totalQuestions) {
            setShowReview(true);
            return;
        }
        if (currentStep < quizData.totalQuestions) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleSaveWrongAnswers = () => {
        const wrongAnswers = Object.entries(userAnswers)
            .filter(([questionNum, answer]) =>
                answer !== quizData.questions[parseInt(questionNum) - 1].correctAnswer
            )
            .map(([questionNum, answer]) => ({
                questionNum: parseInt(questionNum),
                userAnswer: answer,
                correctAnswer: quizData.questions[parseInt(questionNum) - 1].correctAnswer,
                question: quizData.questions[parseInt(questionNum) - 1]
            }));

        // Save wrong answers to localStorage or your preferred storage
        localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));

        // Navigate to comment page with the data
        navigate('/quiz/comment', {
            state: {
                wrongAnswers,
                quizData
            }
        });
    };

    if (showReview) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                        <span className="font-bold">개구리</span>
                        <span className="text-gray-600">전체 문제 리뷰</span>
                    </div>

                    <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                        {quizData.questions.map((question, index) => {
                            const userAnswer = userAnswers[index + 1];
                            const isCorrect = userAnswer === question.correctAnswer;

                            return (
                                <div key={index} className="bg-blue-50 p-4 rounded-lg">
                                    <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-gray-900 font-bold text-xl">문제 {index + 1}번</p>
                                            {userAnswer !== undefined && (
                                                <span className={`px-3 py-1 rounded-full text-sm ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {isCorrect ? '정답' : '오답'}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-800">{question.text}</p>
                                    </div>

                                    <div className="space-y-3 mb-4">
                                        {question.answers.map((answer, ansIndex) => (
                                            <div
                                                key={ansIndex}
                                                className={`w-full p-3 bg-white rounded-lg border-2 relative
                                                    ${ansIndex === question.correctAnswer ? 'border-green-500' : ''}
                                                    ${userAnswer === ansIndex && ansIndex !== question.correctAnswer ? 'border-red-500' : ''}
                                                    ${ansIndex !== userAnswer && ansIndex !== question.correctAnswer ? 'border-transparent' : ''}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                                        ${ansIndex === question.correctAnswer ? 'border-green-500' : ''}
                                                        ${userAnswer === ansIndex && ansIndex !== question.correctAnswer ? 'border-red-500' : ''}
                                                        ${ansIndex !== userAnswer && ansIndex !== question.correctAnswer ? 'border-gray-300' : ''}`}
                                                    >
                                                        {(userAnswer === ansIndex || ansIndex === question.correctAnswer) && (
                                                            <div className={`w-3 h-3 rounded-full
                                                                ${ansIndex === question.correctAnswer ? 'bg-green-500' : ''}
                                                                ${userAnswer === ansIndex && ansIndex !== question.correctAnswer ? 'bg-red-500' : ''}`}
                                                            />
                                                        )}
                                                    </div>
                                                    <span className="text-left">{answer}</span>
                                                </div>
                                                {ansIndex === question.correctAnswer && (
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">정답</span>
                                                )}
                                                {userAnswer === ansIndex && ansIndex !== question.correctAnswer && (
                                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">오답</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <h3 className="font-bold text-lg mb-2 text-yellow-800">📝 문제 풀이</h3>
                                        <p className="text-gray-800 whitespace-pre-line">
                                            {question.explanation}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between p-4 border-t">
                        <button
                            onClick={handlePrevious}
                            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                            다시 풀기
                        </button>
                        <button
                            onClick={handleSaveWrongAnswers}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            틀린 문제 저장
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="font-bold">개구리</span>
                    <span className="text-gray-600">{currentStep}/{quizData.totalQuestions}문제</span>
                </div>

                <div className="p-6 bg-blue-50 rounded-t-lg">
                    <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
                        <h2 className="text-base text-gray-600 mb-2">{quizData.title}</h2>
                        <p className="text-gray-900 font-bold text-xl mb-2">문제 {currentStep}번</p>
                        <p className="text-gray-800">
                            {quizData.questions[currentStep - 1].text}
                        </p>
                    </div>

                    <div className="space-y-3">
                        {quizData.questions[currentStep - 1].answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full p-3 bg-white rounded-lg cursor-pointer border-2 transition-colors
                                    ${userAnswers[currentStep] === index ? 'border-blue-500' : 'border-transparent hover:border-blue-200'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                        ${userAnswers[currentStep] === index ? 'border-blue-500' : 'border-gray-300'}`}
                                    >
                                        {userAnswers[currentStep] === index && (
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
                    <button
                        onClick={handleNext}
                        disabled={userAnswers[currentStep] === undefined}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentStep === quizData.totalQuestions ? '제출' : '다음'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizInterface;