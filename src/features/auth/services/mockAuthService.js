let mockUsers = [
  {
    email: 'test@example.com',
    password: 'password123',
    name: '테스트 사용자'
  }
];

export const mockAuthService = {
  // 로그인 테스트
  async login({ email, password }) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const mockToken = 'mock-jwt-token-' + Math.random();
    localStorage.setItem('token', mockToken);
    
    return {
      user: { email: user.email, name: user.name },
      token: mockToken
    };
  },

  // 회원가입 테스트
  async signup(userData) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('이미 존재하는 이메일입니다.');
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
    return !!localStorage.getItem('token');
  }
};