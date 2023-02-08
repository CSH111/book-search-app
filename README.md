# 도서 검색 서비스

## 배포주소

https://chosungho-book-search-app.netlify.app
<br>

## 프로젝트 개요

- [daum 책 검색 API](https://developers.kakao.com/docs/latest/ko/daum-search/dev-guide#search-book)를 활용해 도서를 검색할 수 있는 토이프로젝트 입니다.
- 메인 검색페이지와 검색결과 페이지도 구성되어있습니다.

<br>

## 프로젝트 기간

- 2022-12-08 ~
  - 기능구현: 필터별(제목, 저자) 검색, 검색어추천, 페이지네이션, 반응형 레이아웃, 딥링크

<br>

## 기술스택 및 사용라이브러리

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">  
<img src="https://img.shields.io/badge/Material--UI-f6f8fa?style=for-the-badge&logo=mui&logoColor=007fff"> <img src="https://img.shields.io/badge/mui--icons-e7e7e7?style=for-the-badge">  
<img src="https://img.shields.io/badge/Redux--toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white">  
<img src="https://img.shields.io/badge/axios-e7e7e7?style=for-the-badge">

<br>

## 학습, 구현 및 개선사항

- Public API(daum 책검색api) 활용 및 REST api 통신
- typescript + IDE(VScode)의 자동완성 및 선제적 오류확인을 통한 생산성 향상
- redux toolkit을 이용한 전역상태관리 및 thunk를 이용한 redux 비동기 처리
- http 생성 및 service 호출 로직에 의존성 주입(DI) 패턴을 적용해 프로그램 유연성 향상
- UI 라이브러리(mui)를 활용한 생산성 향상
- UI 라이브러리 커스터마이징을 통한 검색창 , 페이지네이션, 반응형 웹 등 UI 구현
- URL 쿼리 파리미터에 api 호출 상태를 연동해 필터링 및 검색결과에 대한 사용자의 접근성 향상
- 추천 검색어 API 요청 로직에 디바운싱을 적용해 API 호출 횟수 최적화

<br>

## 기능소개

- [ 도서검색](#도서검색)
- [필터별 검색](#필터별-검색)
- [검색어 추천](#검색어-추천)
- [페이지네이션](#페이지네이션)
- [반응형 레이아웃](#반응형-레이아웃)
- [검색페이지 딥링크](#검색페이지-딥링크)

<br>

### 도서검색

![basicSearch](https://user-images.githubusercontent.com/105113833/208283458-d51b045a-9dcd-40cc-b7c1-d180c1ed1950.gif)

- 검색창의 인풋 값을 쿼리로 이용해 api요청을 보냅니다
- 표지이미지 등 데이터를 받아와 출력합니다.

<br>

### 필터별 검색

![filterChange](https://user-images.githubusercontent.com/105113833/208283463-aca4d01c-fd36-4d8b-aee5-37d9110b17f9.gif)

- 제목, 저자별 필터를 변경하면 그에따른 target 파라미터를 설정해 api요청을 보냅니다.

<br>

### 검색어 추천

![recommend2](https://user-images.githubusercontent.com/105113833/208283862-206dc1fe-a4f4-4251-a39b-830097b3bfb9.gif)

- 검색어의 인풋값이 변경되면 api요청을 보내 데이터를 받아오고 그를 이용해 추천검색어를 표시합니다.
- 과도한 api 요청을 방지하기 위해 디바운싱을 적용했습니다.
- 방향키 및 엔터키 혹은 마우스 클릭으로 추천아이템을 검색할 수 있습니다.
- 추천 검색어가 없을 경우 메세지를 표시합니다.

<br>

### 페이지네이션

![pagination](https://user-images.githubusercontent.com/105113833/208283529-05f2ed2a-c02e-4a53-9161-a17ffaeed1e8.gif)

- mui 페이지네이션 컴포넌트를 이용해 구현했습니다.
- api response data 중 pagable_count를 이용해 마지막 페이지수를 적용했습니다.

<br>

### 반응형 레이아웃

![responsive](https://user-images.githubusercontent.com/105113833/208283558-47b3cab7-a527-459c-8d14-90f3fde691e3.gif)

```js
breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
```

- mui theme을 활용해 5개의 break points 를 설정하고 반응형 웹을 구현했습니다.

<br>

### 검색페이지 딥링크

![deep](https://user-images.githubusercontent.com/105113833/208283568-fc394678-69fc-4d8f-924a-8ef002a7516f.gif)

- 검색 요청 파라미터(target, query, page, size) 및 필터상태를 url에 저장합니다.
- 이를 통해 직접 결과링크로 접근할 수 있도록 구현해 사용자의 접근성을 향상시켰습니다.

- https://chosungho-book-search-app.netlify.app/books?target=title&filter=title&query=부자아빠&page=5&size=10

<br>

### 코드개선 계획

- 스타일링 방식 기준 정하기(mui inline vs mui styled engine)
- 로직분리
  - 디바운싱 커스텀훅이용 분리
  - 기본 파라미터 설정위치 변경(페이지 컴포넌트에서 하도록)
- state 객체화
