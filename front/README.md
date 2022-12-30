## Front Document

## Technologies Used
<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>

SSR(Server Side Rendering) 기반의 프레임워크입니다. 직관적인 라우팅이 가능하고 SEO(검색 기능 최적화)를 쉽게 설정할 수 있다는 점에서 선택하였습니다.

<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>

타입을 직접 지정해 주어 컴파일 단계에서 오류를 포착할 수 있습니다.   
명시적인 정적 타입을 지정하여 의도대로 명확하게 기술하여 코드의 가독성을 높이고
예측할 수 있게 하며 디버깅을 쉽게 하기 위하여 사용하였습니다.

<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>

데이터 Fetching, 캐싱, 동기화, 서버 데이터 업데이트 등을 쉽게 만들어 주는 React 라이브러리입니다.   
캐싱 된 데이터로 인해서 API 콜을 줄여주며 서버에 대한 부담을 줄여줄수 있습니다.   
사용자가 화면을 바라보고 있을 시점에 가장 최신의 데이터를 바라볼 수 있도록 옵션을 줄 수 있습니다.   

<img src="https://img.shields.io/badge/Recoil-black?style=flat-square&logo=Recoil&logoColor=white"/>

Store를 사용하는 Redux와 다르게 Recoil은 리액트의 state를 사용합니다. 리액트 훅과 사용 방식이 크게 다르지 않아 빠르게 익힐 수 있어 선택했습니다.

<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>

컴포넌트 별로 스타일을 관리하고, props를 이용하여 조건부 스타일을 적용하여 손쉽게 유지보수 할 수 있도록 사용하였습니다.

<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>

Axios 인터셉터를 사용하여 API를 체계적으로 관리하기 위해 사용했습니다.

<img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=flat-square&logo=ReactHookForm&logoColor=white"/>

입력 폼의 validation을 간편하게 구현하기 위해 사용했습니다.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run dev
```  

### Folder Structure

* components
    * 아이콘, 모달, 네비게이션 바, 각 페이지 별로 구분한 컴포넌트 폴더입니다.

* hocs
    * SEO 처리를 위한 withGetServerSideProps가 정의되어 있습니다.

* hooks
    * 커스텀 훅이 위치해 있습니다.

* pages
    * 라우팅을 위한 페이지 컴포넌트들이 있습니다.

* public
    * svg, png 파일이 있습니다.

* recoil
    * 상태 관리에 필요한 atom, selector를 정의한 파일이 있습니다.

* services
    * api 로직 모듈과 유틸 함수가 있습니다.

* styles
    * 디자인 적용에 필요한 style을 정의해 두었습니다.

* type
    * 타입스크립트 사용을 위한 타입을 관리하는 폴더입니다.

```bash
📦front
 ┣ 📂components
 ┃ ┣ 📂icons
 ┃ ┃ ┣ 📜AlarmIcon.tsx
 ┃ ┃ ┣ 📜ArrowIcons.tsx
 ┃ ┃ ┣ 📜CheckIcon.tsx
 ┃ ┃ ┣ 📜CircleIcon.tsx
 ┃ ┃ ┣ 📜CloseIcon.tsx
 ┃ ┃ ┣ 📜DiaryIcon.tsx
 ┃ ┃ ┣ 📜EmotionIcon.tsx
 ┃ ┃ ┣ 📜GraphIcon.tsx
 ┃ ┃ ┣ 📜HandshakeIcon.tsx
 ┃ ┃ ┣ 📜KakaoIcon.tsx
 ┃ ┃ ┣ 📜LogoIcon.tsx
 ┃ ┃ ┣ 📜NavIcon.tsx
 ┃ ┃ ┗ 📜UserIcon.tsx
 ┃ ┣ 📂modal
 ┃ ┃ ┣ 📜AlarmModal.tsx
 ┃ ┃ ┗ 📜FindPasswordModal.tsx
 ┃ ┣ 📂nav
 ┃ ┃ ┣ 📜AfterNavbar.tsx
 ┃ ┃ ┗ 📜BeforeNavbar.tsx
 ┃ ┣ 📂page
 ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┣ 📜About.tsx
 ┃ ┃ ┃ ┗ 📜styles.ts
 ┃ ┃ ┣ 📂diary
 ┃ ┃ ┃ ┣ 📜DiaryListDay.tsx
 ┃ ┃ ┃ ┣ 📜DiaryListItem.tsx
 ┃ ┃ ┃ ┣ 📜DiaryMain.tsx
 ┃ ┃ ┃ ┣ 📜DiarySidebar.tsx
 ┃ ┃ ┃ ┣ 📜DiaryTextarea.tsx
 ┃ ┃ ┃ ┣ 📜PartnerDiary.tsx
 ┃ ┃ ┃ ┗ 📜UserDiary.tsx
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┃ ┣ 📜ChangeNicknameModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ChangePasswordModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜DeleteUserModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜FriendConnectModal.tsx
 ┃ ┃ ┃ ┃ ┣ 📜FriendDisconnectModal.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SurveyModal.tsx
 ┃ ┃ ┃ ┣ 📜AfterConnect.tsx
 ┃ ┃ ┃ ┣ 📜BeforeConnect.tsx
 ┃ ┃ ┃ ┣ 📜EditConnection.tsx
 ┃ ┃ ┃ ┣ 📜MyInfo.tsx
 ┃ ┃ ┃ ┗ 📜MyPageTab.tsx
 ┃ ┃ ┣ 📂planner
 ┃ ┃ ┃ ┣ 📜Calendar.tsx
 ┃ ┃ ┃ ┣ 📜Suggesttodo.tsx
 ┃ ┃ ┃ ┣ 📜TodoCreate.tsx
 ┃ ┃ ┃ ┣ 📜TodoItem.tsx
 ┃ ┃ ┃ ┣ 📜TodoList.tsx
 ┃ ┃ ┃ ┗ 📜TodoTemplate.tsx
 ┃ ┃ ┗ 📂stamp
 ┃ ┃ ┃ ┣ 📜EmotionAnalysis.tsx
 ┃ ┃ ┃ ┣ 📜EmotionCalendar.tsx
 ┃ ┃ ┃ ┣ 📜EmotionGraph.tsx
 ┃ ┃ ┃ ┣ 📜StampDiary.tsx
 ┃ ┃ ┃ ┣ 📜StampDiaryContent.tsx
 ┃ ┃ ┃ ┣ 📜StampTodoBox.tsx
 ┃ ┃ ┃ ┣ 📜StampTodoList.tsx
 ┃ ┃ ┃ ┗ 📜StampTodoNone.tsx
 ┃ ┣ 📜Error.tsx
 ┃ ┣ 📜Layout.tsx
 ┃ ┣ 📜Loading.tsx
 ┃ ┗ 📜Seo.tsx
 ┣ 📂hocs
 ┃ ┗ 📜withGetServerSideProps.ts
 ┣ 📂hooks
 ┃ ┣ 📜useGetDiaries.ts
 ┃ ┣ 📜useGetDiary.ts
 ┃ ┣ 📜useGetFriend.ts
 ┃ ┗ 📜usePlanQuery.ts
 ┣ 📂pages
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜kakao.tsx
 ┃ ┣ 📜404.tsx
 ┃ ┣ 📜diary.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜join.tsx
 ┃ ┣ 📜login.tsx
 ┃ ┣ 📜mypage.tsx
 ┃ ┣ 📜planner.tsx
 ┃ ┣ 📜stamp.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜_document.tsx
 ┃ ┗ 📜_error.tsx
 ┣ 📂public
 ┃ ┣ 📂icon
 ┃ ┃ ┣ 📜hamburger.svg
 ┃ ┃ ┣ 📜home.svg
 ┃ ┃ ┣ 📜kakao_icon.svg
 ┃ ┃ ┣ 📜me.svg
 ┃ ┃ ┣ 📜note.svg
 ┃ ┃ ┗ 📜notepad.svg
 ┃ ┣ 📜About.png
 ┃ ┣ 📜aboutpic1.png
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜temporaryimage.png
 ┃ ┗ 📜vercel.svg
 ┣ 📂recoil
 ┃ ┣ 📜diary.ts
 ┃ ┣ 📜friend.ts
 ┃ ┣ 📜modal.ts
 ┃ ┣ 📜mypage.ts
 ┃ ┣ 📜planner.ts
 ┃ ┣ 📜stamp.ts
 ┃ ┗ 📜user.ts
 ┣ 📂services
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜axiosInstance.ts
 ┃ ┃ ┣ 📜diary.ts
 ┃ ┃ ┣ 📜friend.ts
 ┃ ┃ ┣ 📜planner.ts
 ┃ ┃ ┣ 📜stamp.ts
 ┃ ┃ ┗ 📜user.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜aboutText.ts
 ┃ ┃ ┣ 📜cookies.ts
 ┃ ┃ ┣ 📜emojiList.tsx
 ┃ ┃ ┣ 📜formatDate.ts
 ┃ ┃ ┣ 📜getDayString.ts
 ┃ ┃ ┣ 📜getEmoji.tsx
 ┃ ┃ ┣ 📜kakaoInit.ts
 ┃ ┃ ┣ 📜sumMonthEmotion.ts
 ┃ ┃ ┗ 📜surveyCategory.ts
 ┣ 📂styles
 ┃ ┣ 📜common_style.ts
 ┃ ┣ 📜global-style.tsx
 ┃ ┣ 📜layout.ts
 ┃ ┣ 📜ModalVariants.ts
 ┃ ┣ 📜modal_layout.ts
 ┃ ┣ 📜style.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂type
 ┃ ┣ 📜diary.ts
 ┃ ┣ 📜friend.ts
 ┃ ┣ 📜icon.ts
 ┃ ┣ 📜planner.ts
 ┃ ┣ 📜stamp.ts
 ┃ ┗ 📜user.ts
 ┗ 📜README.md
``` 