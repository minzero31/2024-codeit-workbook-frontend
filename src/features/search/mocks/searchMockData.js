// src/features/search/mocks/searchMockData.js

export const SEARCH_RESULTS = [
  {
    id: 1,
    userName: "이서영",
    university: "숙명여자대학교",
    subject: "데이터구조",
    professor: "박영호",
    createdAt: "2024.1.1",
    rating: 3,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 2,
    userName: "김민영",
    university: "숙명여자대학교",
    subject: "웹프로그래밍",
    professor: "김상연",
    createdAt: "2024.1.5",
    rating: 4,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 3,
    userName: "유은서",
    university: "숙명여자대학교",
    subject: "웹프로그래밍",
    professor: "김상연",
    createdAt: "2024.1.10",
    rating: 3,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 4,
    userName: "이서영",
    university: "숙명여자대학교",
    subject: "프로그래밍입문",
    professor: "이종우",
    createdAt: "2024.1.15",
    rating: 5,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 5,
    userName: "김민영",
    university: "숙명여자대학교",
    subject: "오픈소스프로그래밍",
    professor: "김병규",
    createdAt: "2024.1.20",
    rating: 4,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 6,
    userName: "박지원",
    university: "숙명여자대학교",
    subject: "컴퓨터아키텍쳐",
    professor: "김철연",
    createdAt: "2024.1.25",
    rating: 3,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 7,
    userName: "최수진",
    university: "숙명여자대학교",
    subject: "기기구조론",
    professor: "김철연",
    createdAt: "2024.1.30",
    rating: 5,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 8,
    userName: "정다은",
    university: "숙명여자대학교",
    subject: "공학수학",
    professor: "강지우",
    createdAt: "2024.2.1",
    rating: 4,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 9,
    userName: "한소희",
    university: "숙명여자대학교",
    subject: "서버운영및보안",
    professor: "정성훈",
    createdAt: "2024.2.5",
    rating: 3,
    questionCount: 15,
    timeLimit: "15분"
  },
  {
    id: 10,
    userName: "송지현",
    university: "숙명여자대학교",
    subject: "인공지능입문",
    professor: "김상연",
    createdAt: "2024.2.10",
    rating: 5,
    questionCount: 15,
    timeLimit: "15분"
  }
];

export const mockFetchResults = async (searchTerm, page, sortBy) => {
  // 검색어로 필터링
  let filteredResults = [...SEARCH_RESULTS];
  
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredResults = filteredResults.filter(result => 
      result.subject.toLowerCase().includes(searchLower) ||
      result.professor.toLowerCase().includes(searchLower) ||
      result.userName.toLowerCase().includes(searchLower)
    );
  }

  // 정렬
  if (sortBy === 'latest') {
    filteredResults.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortBy === 'rating') {
    filteredResults.sort((a, b) => b.rating - a.rating);
  }

  // 페이지네이션
  const itemsPerPage = 5;
  const start = (page - 1) * itemsPerPage;
  const paginatedResults = filteredResults.slice(start, start + itemsPerPage);

  return {
    data: paginatedResults,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(filteredResults.length / itemsPerPage),
      totalItems: filteredResults.length,
      itemsPerPage
    }
  };
};

// 과목별 필터 옵션
export const SUBJECT_OPTIONS = [
  "데이터구조",
  "웹프로그래밍",
  "프로그래밍입문",
  "오픈소스프로그래밍",
  "컴퓨터아키텍쳐",
  "기기구조론",
  "공학수학",
  "서버운영및보안",
  "인공지능입문"
];

// 교수별 필터 옵션
export const PROFESSOR_OPTIONS = [
  "박영호",
  "김상연",
  "이종우",
  "김병규",
  "김철연",
  "강지우",
  "정성훈"
];