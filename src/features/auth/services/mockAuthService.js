let mockUsers = [
  {
    studentId: '2314513',  // email을 studentId로 변경
    password: 'password123',
    name: 'testUser'
  }
];

export const mockAuthService = {
  // 로그인 테스트
  async login({ studentId, password }) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.studentId === studentId);
    
    if (!user || user.password !== password) {
      throw new Error('학번 또는 비밀번호가 올바르지 않습니다.');
    }

    const mockToken = 'mock-jwt-token-' + Math.random();
    localStorage.setItem('token', mockToken);
    
    return {
      user: { studentId: user.studentId, name: user.name },
      token: mockToken
    };
  },

  // 회원가입 테스트
  async signup(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers.some(u => u.studentId === userData.studentId)) {
      throw new Error('이미 등록된 학번입니다.');
    }

    mockUsers = [...mockUsers, userData];
    return { message: '회원가입이 완료되었습니다.' };
  },

  // 로그아웃
  logout() {
    localStorage.removeItem('token');
  },

  // 현재 사용자 확인
  isAuthenticated() {
    const token = localStorage.getItem('token');
    // 토큰이 있을 때만 true 반환
    return token !== null && token !== undefined;
  }
};