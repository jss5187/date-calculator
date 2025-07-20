# 날짜 차이 계산기

두 날짜 사이의 일수를 계산하는 간단한 웹 애플리케이션입니다.

## 🎯 주요 기능

- 시작일과 종료일을 선택하여 두 날짜 사이의 총 일수를 계산합니다.
- D-day, 기념일, 프로젝트 기간 등을 쉽게 확인할 수 있습니다.
- 반응형 웹 디자인으로 모바일에서도 최적화된 사용자 경험을 제공합니다.
- UTC 기준 계산으로 정확한 날짜 차이를 보장합니다.

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 모던 스타일링 (CSS 변수, Flexbox)
- **JavaScript (Vanilla)**: 날짜 계산 로직
- **Google Fonts**: 한글 폰트 지원 (Noto Sans KR)

## 🚀 실행 방법

### Node.js (추천)

```bash
# 의존성 없이 바로 실행
npm start

# 개발 모드 (브라우저 자동 열기)
npm run dev

# 사용 가능한 모든 스크립트
npm run serve  # Python 서버로 실행
```

### 직접 명령어 실행

```bash
# Node.js serve 사용
npx serve .
npx serve -s . -p 3000

# Node.js http-server 사용
npx http-server -p 8080 -o

# Python 사용
python3 -m http.server 8000
```

### 브라우저에서 직접 열기

```bash
# 파일 탐색기에서 index.html을 더블클릭하거나
# 브라우저에서 파일 > 열기 > index.html 선택
```

## 📱 사용법

1. **시작일**과 **종료일**을 각각 선택합니다
2. **"계산하기"** 버튼을 클릭합니다
3. 결과창에 두 날짜 사이의 일수가 표시됩니다

## ✨ 특징

- **정확한 계산**: UTC 기준으로 날짜를 계산하여 시간대 문제 방지
- **다양한 케이스 처리**:
  - 같은 날짜인 경우
  - 시작일이 종료일보다 늦은 경우도 계산 가능
- **SEO 최적화**: 검색 엔진 최적화를 위한 메타 태그 포함
- **소셜 미디어 지원**: Open Graph 태그로 공유 최적화
- **접근성 고려**: 시맨틱 HTML과 적절한 라벨링

## 🌐 배포

이 프로젝트는 정적 사이트로, 다음 플랫폼에 쉽게 배포할 수 있습니다:

- **Vercel**: `vercel --prod`
- **Netlify**: 드래그 앤 드롭 배포
- **GitHub Pages**: Settings > Pages에서 활성화
- **Firebase Hosting**: `firebase deploy`

## 📦 프로젝트 구조

```
date-calculator/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css       # 스타일 시트
├── js/
│   └── script.js       # JavaScript 로직
├── package.json        # npm 스크립트 설정
├── README.md          # 프로젝트 문서
├── robots.txt         # 검색 엔진 크롤링 설정
└── sitemap.xml        # 사이트맵
```

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.
