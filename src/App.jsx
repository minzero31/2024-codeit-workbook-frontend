import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import MainPage from './features/main/pages/MainPage';
import { mockAuthService } from './features/auth/services/mockAuthService';
import QuizInterface from './components/Layout/QuizInterface';
import Comment from './components/Layout/Comment';
import SearchPage from './features/search/pages/SearchPage';
import CreatorQuizInterface from './features/quiz/components/CreatorQuizInterface';
import QuizSolvePage from './pages/Quiz/QuizSolvePage'; // QuizSolvePage import 추가

function App() {
    const isAuthenticated = mockAuthService?.isAuthenticated?.() || true;

    return (
        <Routes>
            {/* 기본 경로 처리 */}
            <Route
                path="/"
                element={isAuthenticated ? <Navigate to="/search" /> : <Navigate to="/login" />}
            />

            {/* 인증 페이지 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 메인 페이지 */}
            <Route
                path="/main"
                element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />}
            />

            {/* 검색 페이지 */}
            <Route
                path="/search"
                element={isAuthenticated ? <SearchPage /> : <Navigate to="/login" />}
            />

            {/* 퀴즈 페이지 */}
            <Route
                path="/quiz"
                element={isAuthenticated ? <QuizInterface /> : <Navigate to="/login" />}
            />
            <Route path="/quiz/comment" element={<Comment />} />

            {/* 퀴즈 생성 페이지 */}
            <Route
                path="/quiz/create"
                element={isAuthenticated ? <CreatorQuizInterface /> : <Navigate to="/login" />}
            />

            {/* 퀴즈 풀기 페이지 */}
            <Route
                path="/quiz/solve"
                element={isAuthenticated ? <QuizSolvePage /> : <Navigate to="/login" />}
            />

            {/* 알 수 없는 경로 처리 */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;