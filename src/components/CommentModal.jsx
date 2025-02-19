import React, { useState } from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
            <div className="bg-white w-full max-w-4xl rounded-t-lg p-6 animate-slide-up">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">코멘트 작성하기</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex justify-center mb-4">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            className="text-3xl px-1"
                            onMouseEnter={() => setHoveredRating(value)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(value)}
                        >
                            <span className={`${(hoveredRating || rating) >= value ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                            </span>
                        </button>
                    ))}
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="코멘트를 입력하세요..."
                    className="w-full h-32 p-3 border rounded-lg mb-4 resize-none"
                />

                <div className="flex justify-end">
                    <button
                        onClick={() => {
                            if (rating > 0) {
                                onSubmit(rating, comment);
                                setRating(0);
                                setComment('');
                            }
                        }}
                        className={`px-6 py-2 rounded-md ${
                            rating > 0
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        보내기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;