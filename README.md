# twixxer - 트위터 클론 코딩



![twixxer_logo](https://user-images.githubusercontent.com/96227239/166665215-9f5d715c-9816-458c-9326-7d16019c3840.png)



- 💻 https://namgideokk.github.io/twixxer/

  📱 모바일 환경은 iPhone XR 기준으로 최적화 되었습니다.

- 🛠 Skill to use <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=black"/>



## 화면 구성 및 기능 소개

- 로그인 페이지

![01](https://user-images.githubusercontent.com/96227239/166665595-4f668f1f-ea5d-4380-b8ce-de76fb815f04.gif)

홈페이지 접속 시 로그인 되어있지 않으면 로그인 페이지로 이동합니다.



- 회원가입

![03](https://user-images.githubusercontent.com/96227239/166666012-a73b759a-3c72-4fbd-a06e-a055b33bf14a.gif)

임의로 이메일을 작성하여 간편하게 가입이 가능합니다.

인풋과 회원가입 버튼 사이에는 이메일과 패스워드에 관련된 에러 메세지가 출력됩니다.

로그인 컴포넌트와 레이아웃을 맞춰 통일감을 주었습니다.



- 로그인 > 홈 이동

![04](https://user-images.githubusercontent.com/96227239/166666847-9dcb3a44-4055-4f41-aa8a-8c7aeebde235.gif)

가입한 간편 이메일이나 구글, 깃허브 소셜 계정을 이용하여 로그인할 수 있습니다.



- 홈 이동

![02](https://user-images.githubusercontent.com/96227239/166666413-c9363a82-58dc-4dde-aa00-1846a797d72b.gif)

로그인이 되어있는 경우 홈 페이지로 이동합니다.



- 로딩 컴포넌트

![00](https://user-images.githubusercontent.com/96227239/166666543-f2117c91-13a6-4e8d-8953-5c894e0dfac5.gif)

글자 하나하나에 차례대로 위아래로 움직이는 애니메이션을 주어 생동감을 주었습니다.



- 홈, 프로필 반응형 레이아웃

![05](https://user-images.githubusercontent.com/96227239/166667071-f11895de-e56d-47ae-86e1-3c469e3cb8ee.gif)

![13](https://user-images.githubusercontent.com/96227239/166670224-b044f196-bdba-4b63-ad85-b46a5c0b2117.gif)

브라우저 사이즈에 맞게 변경되는 반응형 레이아웃을 적용했습니다.

게시물이 하나도 없는 경우, 지구를 중심으로 도는 종이비행기와 문구가 담긴 컴포넌트를 출력합니다.



- 네비게이션

![11](https://user-images.githubusercontent.com/96227239/166667412-a0634ec8-ba1f-4bb9-81f1-87903f52adf9.gif)

메인 색상인 보라색을 적용했고 hover 효과를 입혔습니다.

언어 변경 버튼은 추후 페이지 전체의 언어를 변경하도록 추가할 예정입니다.



- 게시물 작성

![06](https://user-images.githubusercontent.com/96227239/166667723-da52e429-245c-4182-87dc-c0a4163224bd.gif)

인풋이 비어있는 상태에서 제출할 경우 placeholder와 글씨 색상, 인풋 그림자가 빨갛게 변경되며, 몇 초 후 원래대로 돌아옵니다.

게시물 작성 시 좌측 하단에 알림 창이 애니메이션과 함께 몇 초간 나타납니다.



- 게시물 수정

![07](https://user-images.githubusercontent.com/96227239/166668067-10292f67-7c18-4439-a4bb-d93d5a6ed273.gif)

수정 버튼 클릭 시 기존의 내용을 담은 textarea 모달창이 나타납니다.

수정이 완료되면 좌측 하단에 알림 창이 나타납니다.



- 게시물 삭제

![10](https://user-images.githubusercontent.com/96227239/166668295-130645af-9ade-47fa-8406-12b7a7434030.gif)

게시물이 삭제되면 해당 게시물이 오른쪽으로 사라지는 애니메이션과 함께 좌측 하단에 알림 창이 나타납니다.



- 알림 창

![alert](https://user-images.githubusercontent.com/96227239/166668505-07d6687b-ad11-473b-9b40-27a98cf8d164.jpg)

단조롭지 않게 각각 다른 색상을 주었고, 작성 알림 창은 메인 컬러인 보라색, 수정과 삭제 알림 창은 각 기능 버튼과 동일한 색상을 주어 통일감을 주었습니다.



- 게시물 권한

![16](https://user-images.githubusercontent.com/96227239/166671713-b42f535c-1a51-4e74-abbe-d05cc6709b5c.gif)

나의 게시물에만 수정, 삭제 아이콘이 출력됩니다.



- 추천 게시물

![08](https://user-images.githubusercontent.com/96227239/166668882-e993d817-1425-4daf-b579-59a06a33f1f0.gif)

게시물의 리트윅(re-twixx)을 내림차순으로 정렬하여 최대 3개의 게시물을 추천해 줍니다.

리트윅 숫자가 늘어나게 되면 실시간으로 반영되어 추천 순위도 함께 변경됩니다.

추후 좋아요 개수를 이용한 추천을 추가할 예정입니다.



- 게시물 좋아요

![09](https://user-images.githubusercontent.com/96227239/166669360-71532a09-8c64-4795-b2b5-4188f97452f7.gif)

![09-01](https://user-images.githubusercontent.com/96227239/166669635-9950bb05-f124-48d4-b151-e351587db95a.gif)

좋아요 버튼 클릭 시 하트 버튼에 애니메이션을 적용했습니다.

게시물 당 한 번의 좋아요만 할 수 있으며, 재 클릭 시 좋아요 개수가 다시 감소합니다.

추후 좋아요 클릭 여부를 통한 아이콘 활성화, 비활성화 상태를 추가할 예정입니다.



- 아바타 변경

![14](https://user-images.githubusercontent.com/96227239/166670440-1a4cf9f9-8a3e-489b-b657-41a505678087.gif)

아바타 이미지를 변경할 수 있습니다.

인풋에 이미지 파일이 감지되면 업로드와 취소 버튼이 나타납니다.



- 이름 변경

![15](https://user-images.githubusercontent.com/96227239/166670712-d4a3edfd-6b2c-4616-9a3b-380144d8a414.gif)

인풋의 텍스트 변경이 감지되면 우측에 수정 버튼이 나타납니다.

버튼은 이름이 두 글자 이상일 때만 나타나고 두 글자 미만일 땐 사라집니다.



- 게시물 일괄 삭제

![12](https://user-images.githubusercontent.com/96227239/166669953-035ee909-36c9-49d2-bbd8-dc765611be9b.gif)

프로필 페이지에서 여러개의 게시물을 한 번에 삭제할 수 있습니다.

삭제가 완료되고 게시물이 0개가 되면 나의 게시물 개수를 알려주는 문구가 변경되고, 일괄 삭제 버튼이 비활성화 됩니다.



- 회원 탈퇴

![17](https://user-images.githubusercontent.com/96227239/166671102-425d04f5-fbfd-4d54-b570-e671a3293584.gif)

탈퇴가 완료되면 로그인 페이지로 이동합니다.

추후 탈퇴 요청 시 비밀번호를 재입력하도록 추가할 예정입니다.

　
 
 - 모바일 환경

![twixxer mobile](https://user-images.githubusercontent.com/96227239/166860188-b778a8e1-9ea7-445d-b11e-c706bbd70b2d.jpg)

　

## ✒ 1인 프로젝트를 마치며

이번 작은 프로젝트를 통해 Firebase를 처음 사용해 보았는데, 진입장벽이 높거나 크게 어렵지 않으면서도 충분한 웹서비스를 구축할 수 있어서 굉장히 재미있고 좋은 배움을 얻었습니다. 다음에는 좀 더 큰 규모의 프로젝트를 Firebase로 구축해 보고 싶다고 느낄 정도로 편리하고 흥미로운 플랫폼이었습니다.

이번 프로젝트에서 가장 중점적으로 공들인 점은 애니메이션이었습니다. 이전에는 아주 간단한 애니메이션만 적용해 보다가 모달창이 사라질 때 애니메이션을 적용하는 법이나 여러 상황에 따라 다르게 출력되는 애니메이션 등 해보지 않아 어려웠던 작업들을 라이브러리 없이 직접 코딩해보면서 애니메이션에 대한 이해도, 리액트의 편리성을 한 번 더 느끼고 배웠으며, 프론트엔드 개발자의 큰 덕목이 될 수 있는 지식을 조금이지만 제 것으로 만들 수 있어서 굉장히 좋았고 재미있게 작업할 수 있었습니다.

아직도 여러 많은 기능들이나 로직은 쉽게 구현하지 못하지만 차근차근 배워가며 완성도 있는 웹페이지로 만들어 갈 예정입니다.
앞으로도 많은 유용하고 재미있는 프로젝트를 만들고 싶습니다! 읽어주셔서 감사합니다 👋