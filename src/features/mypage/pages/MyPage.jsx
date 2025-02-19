import React from 'react';
import MyPageContent from '../components/MyPageContent';

const MyPage = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center p-4 border-b">
                    <h1 className="text-xl font-bold">마이페이지</h1>
                </div>
                <MyPageContent />
            </div>
        </div>
    );
};

export default MyPage;