## Back Document

## Technologies Used
[Nest](https://github.com/nestjs/nest) : 실무에서 많이 사용되는 Javascript 프레임워크   
MySQL : 다양한 MVP 데이터를 나누어 처리하기 위하여 선택

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

### API
[API DOCS](http://kdt-ai5-team05.elicecoding.com:5000/api-docs#/)   
* User : 회원가입, 회원 조회, 회원 정보 수정, 회원 탈퇴   
* Auth : 로그인, 소셜 로그인   
* Friend : 친구 신청, 친구 신청 확인, 친구 신청 수락, 친구 끊기   
* Diary : 다이어리 작성, 다이어리 조회   
* Planner : 일정 작성, 일정 완료 처리, 날짜별 일정 조회   
* Stamp : 일기를 기반으로 감정 분석, 날짜별 감정 조회   

### ERD
[링크](https://dbdiagram.io/d/639abe5999cb1f3b55a1877c)
![우쥬-최종](/uploads/96353421e7f0372a574b122365878635/우쥬-최종.png)

### Folder Structure
```bash
📦src
 ┣ 📂activity
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜activity.entity.ts
 ┃ ┣ 📜activity.module.ts
 ┃ ┗ 📜activity.service.ts
 ┣ 📂auth
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜login.dto.ts
 ┃ ┃ ┗ 📜social-login.dto.ts
 ┃ ┣ 📂guard
 ┃ ┃ ┣ 📜jwt-auth.guard.ts
 ┃ ┃ ┗ 📜local-auth.guard.ts
 ┃ ┣ 📜auth.controller.ts
 ┃ ┣ 📜auth.module.ts
 ┃ ┣ 📜auth.service.ts
 ┃ ┣ 📜jwt.strategy.ts
 ┃ ┗ 📜local.strategy.ts
 ┣ 📂diary
 ┃ ┣ 📂dao
 ┃ ┃ ┗ 📜diary.dao.ts
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-diary.dto.ts
 ┃ ┃ ┣ 📜diary-date.dto.ts
 ┃ ┃ ┗ 📜read-diary.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜diary.entity.ts
 ┃ ┣ 📜diary.controller.ts
 ┃ ┣ 📜diary.module.ts
 ┃ ┗ 📜diary.service.ts
 ┣ 📂email
 ┃ ┗ 📜email.service.ts
 ┣ 📂filters
 ┃ ┗ 📜http-exception.filter.ts
 ┣ 📂friend
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜send-friend-request.dto.ts
 ┃ ┃ ┣ 📜update-friend-request.dto.ts
 ┃ ┃ ┗ 📜update-title-request.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┣ 📜friend.entity.ts
 ┃ ┃ ┗ 📜friendRequest.entity.ts
 ┃ ┣ 📜friend.controller.spec.ts
 ┃ ┣ 📜friend.controller.ts
 ┃ ┣ 📜friend.module.ts
 ┃ ┣ 📜friend.service.spec.ts
 ┃ ┗ 📜friend.service.ts
 ┣ 📂planner
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-planner.dto.ts
 ┃ ┃ ┣ 📜planner-date.dto.ts
 ┃ ┃ ┣ 📜planner-param.dto.ts
 ┃ ┃ ┗ 📜update-planner.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜planner.entity.ts
 ┃ ┣ 📜planner.controller.ts
 ┃ ┣ 📜planner.module.ts
 ┃ ┗ 📜planner.service.ts
 ┣ 📂user
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-user.dto.ts
 ┃ ┃ ┣ 📜new-password.dto.ts
 ┃ ┃ ┣ 📜update-nickname.dto.ts
 ┃ ┃ ┣ 📜update-password.dto.ts
 ┃ ┃ ┗ 📜update-survey.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜user.entity.ts
 ┃ ┣ 📜user.controller.spec.ts
 ┃ ┣ 📜user.controller.ts
 ┃ ┣ 📜user.module.ts
 ┃ ┣ 📜user.service.spec.ts
 ┃ ┗ 📜user.service.ts
 ┣ 📂util
 ┃ ┣ 📜groupBy.ts
 ┃ ┗ 📜swagger.ts
 ┣ 📜app.module.ts
 ┗ 📜main.ts
``` 


