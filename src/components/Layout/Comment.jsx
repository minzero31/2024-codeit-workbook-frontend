import React, { useState } from 'react';
import CommentModal from '../../components/CommentModal';

const Comment = ({ quizData, wrongAnswers }) => {
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState([
        {
            id: 1,
            username: "한석희",
            rating: 3,
            comment: "5번 문제 어려웠어요. 자세한 설명 부탁드려요."
        },
        {
            id: 2,
            username: "문소영",
            rating: 4,
            comment: "5번 문제 설명해드리자면, 재귀 호출의 원리를 이해하면 쉽게 풀 수 있습니다."
        }
    ]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 border-b">
                    <span className="font-bold">개구리</span>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        코멘트 보내기
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full" />
                                <span className="font-medium">{comment.username}</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`text-xl ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-700">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </div>

            <CommentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={(rating, comment) => {
                    setComments(prev => [...prev, {
                        id: prev.length + 1,
                        username: "사용자",
                        rating,
                        comment
                    }]);
                    setShowModal(false);
                }}
            />
        </div>
    );
};

export default Comment;