# twixxer - 트위터 클론 코딩

　

![twixxer_logo](https://user-images.githubusercontent.com/96227239/166665215-9f5d715c-9816-458c-9326-7d16019c3840.png)

　

- 💻 https://namgideokk.github.io/twixxer/

- 📱 모바일 환경은 iPhone XR 기준으로 최적화 되었습니다.

- 🛠 Skill to use <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=black"/>

- ⚠ GIF 이미지 파일이 많습니다. 데이터 주의!

　
 
 ## 개요
 
 - 혼자서 할 토이 프로젝트를 구상하다 백엔드 없이도 웹서비스를 구현할 수 있는 Firebase를 접하고 흥미로워 사용하게 되었습니다.
 
 　

## 화면 구성 및 기능 소개

- 로그인 페이지

![01](https://user-images.githubusercontent.com/96227239/166665595-4f668f1f-ea5d-4380-b8ce-de76fb815f04.gif)

> 홈페이지 접속 시 로그인 되어있지 않으면 로그인 페이지로 이동합니다.

　

⚠ 로그인 UI 변경

![loginGoogle](https://user-images.githubusercontent.com/96227239/175805484-a5f1b9d1-3f90-436b-a06c-0fbf64d179b2.png)

> 가입한 간편 이메일이나 구글 계정을 이용하여 로그인할 수 있습니다.


　

- 회원가입

![03](https://user-images.githubusercontent.com/96227239/166666012-a73b759a-3c72-4fbd-a06e-a055b33bf14a.gif)

> 임의로 이메일을 작성하여 간편하게 가입이 가능합니다.
> 
> 인풋과 회원가입 버튼 사이에는 이메일과 패스워드 유효성 검사 에러 메세지가 출력됩니다.
> 
> 로그인 컴포넌트와 레이아웃을 맞춰 통일감을 주었습니다.

　

- 로그인 > 홈 이동

![04](https://user-images.githubusercontent.com/96227239/166666847-9dcb3a44-4055-4f41-aa8a-8c7aeebde235.gif)

　

- 홈 이동

![02](https://user-images.githubusercontent.com/96227239/166666413-c9363a82-58dc-4dde-aa00-1846a797d72b.gif)

> 로그인이 되어있는 경우 홈 페이지로 이동합니다.

　

- 로딩 컴포넌트

![00](https://user-images.githubusercontent.com/96227239/166666543-f2117c91-13a6-4e8d-8953-5c894e0dfac5.gif)

> 글자에 애니메이션과 delay를 주어 차례대로 위아래로 움직이는 애니메이션을 주어 생동감을 주었습니다.


　

- 홈, 프로필 반응형 레이아웃

![05](https://user-images.githubusercontent.com/96227239/166667071-f11895de-e56d-47ae-86e1-3c469e3cb8ee.gif)

![13](https://user-images.githubusercontent.com/96227239/166670224-b044f196-bdba-4b63-ad85-b46a5c0b2117.gif)

![response layout](https://user-images.githubusercontent.com/96227239/175805244-40069fa1-21a3-4c85-a6ab-9e2a03567222.png)


> 브라우저 사이즈에 맞게 변경되는 반응형 레이아웃을 적용했습니다.
>
> 게시물이 하나도 없는 경우, 지구를 중심으로 도는 종이비행기와 문구가 담긴 컴포넌트를 출력합니다.

　

- 네비게이션

![11](https://user-images.githubusercontent.com/96227239/166667412-a0634ec8-ba1f-4bb9-81f1-87903f52adf9.gif)
![11-02](https://user-images.githubusercontent.com/96227239/175805574-eab27285-fa75-4ec6-aef5-0c495aa12b8b.gif)
![mobilenavi](https://user-images.githubusercontent.com/96227239/175805578-e4074865-dd08-4956-8a66-ad361d2564bc.jpg)


> 메인 색상인 보라색을 적용했고 hover 효과를 입혔습니다.
>
> 언어 변경 버튼은 추후 페이지 전체의 언어를 변경하도록 추가할 예정입니다.

　

- 게시물 작성

![06](https://user-images.githubusercontent.com/96227239/166667723-da52e429-245c-4182-87dc-c0a4163224bd.gif)

> 인풋이 비어있는 상태에서 제출할 경우 placeholder와 글씨 색상, 인풋 그림자가 빨갛게 변경되며, 몇 초 후 원래대로 돌아옵니다.
>
> 게시물 작성 시 좌측 하단에 알림 창이 애니메이션과 함께 몇 초간 나타납니다.

　

- 게시물 수정

![07](https://user-images.githubusercontent.com/96227239/166668067-10292f67-7c18-4439-a4bb-d93d5a6ed273.gif)

![editment](https://user-images.githubusercontent.com/96227239/175806573-874f027e-db87-4cdb-b331-92b17f706edd.jpg)
![editFiled](https://user-images.githubusercontent.com/96227239/175806575-9bb202f3-75f8-4f50-bb65-f2c8cb1bdadf.jpg)

> 수정 버튼 클릭 시 기존의 내용을 담은 textarea 모달창이 나타납니다.
>
> 수정이 완료되면 좌측 하단에 알림 창이 나타나고, 작성 시간에 ‘수정됨’ 텍스트가 추가됩니다.
>
> 게시물 시간순 정렬을 위한 timestamp 필드와
> 
> 게시물 생성 시간 · 수정 시간 출력을 위한 createdAt 필드를 분리하여
> 
> 수정후에도 정렬 순서가 변하지 않게 제어했습니다.



　

- 게시물 삭제

![10](https://user-images.githubusercontent.com/96227239/166668295-130645af-9ade-47fa-8406-12b7a7434030.gif)

> 게시물이 삭제되면 해당 게시물이 오른쪽으로 사라지는 애니메이션과 함께 좌측 하단에 알림 창이 나타납니다.

　

⚠ 삭제 애니메이션 변경

![22](https://user-images.githubusercontent.com/96227239/175804417-dd59f7f6-0a6e-466b-9334-90bd93a30e93.gif)

　

- 알림 창

![pc-alert](https://user-images.githubusercontent.com/96227239/175805760-7cb26cdd-5ef9-44f8-ab22-938d8a29a475.jpg)

![mobile-alert](https://user-images.githubusercontent.com/96227239/175805791-5e6f3bd7-e87b-41e5-8935-1437a6ca83ca.jpg)

> 기능마다 각각 다른 배경색을 주었습니다.
> 
> 작성 알림 창은 메인 컬러인 보라색 적용
> 
> 수정, 삭제 알림 창은 각 기능 버튼과 동일한 색상을 주어 통일감을 주었습니다.

　

```JavaScript
// 알림창 컴포넌트 (모듈화)

const AlertContainer = ({
  animation,
  display = "none",
  alertContent,
  backgroundColor = "#a984ed",
}) => {
  return (
    <AlertContStyle>
      <div className="new-feed-alert__wrapper">
        <div
          style={{ backgroundColor: backgroundColor, display: display }}
          className={`alert__container ${animation}`}
        >
          <FontAwesomeIcon icon={faCircleExclamation} className="alert__icon" />
          <p>{alertContent}</p>
        </div>
      </div>
    </AlertContStyle>
  );
};
```

```JavaScript
  // 알림창 state
  const [alertAnimation, setAlertAnimation] = useState("");
  const [alertContent, setAlertContent] = useState("");
  const [display, setDisplay] = useState("none");
  const [backgroundColor, setBackgroundColor] = useState("");
  
    // 피드 생성시
  function newAlert() {
    setTimeout(() => {
      if (window.screen.width <= 414) {
        setAlertAnimation("mobile-close-alert");
      } else {
        setAlertAnimation("close-alert");
      }
    }, 4000);
    setTimeout(() => {
      setAlertContent("");
      setDisplay("none");
      setBackgroundColor("");
      setAlertAnimation("");
    }, 5000);
  }
```

> setTimeout 함수를 사용해 애니메이션 출력 순서 제어(언마운트 전 애니메이션 작동)와
> 
> If문, 뷰포트 사이즈 감지를 통한 pc · mobile 환경을 구분하여 애니메이션 속성이 담긴 className을 전달합니다

　

- 게시물 권한

![16](https://user-images.githubusercontent.com/96227239/166671713-b42f535c-1a51-4e74-abbe-d05cc6709b5c.gif)

> 나의 게시물에만 수정, 삭제 아이콘이 출력됩니다.

　

- 추천 게시물

![08](https://user-images.githubusercontent.com/96227239/166668882-e993d817-1425-4daf-b579-59a06a33f1f0.gif)

> 게시물의 리트윅(re-twixx)숫자를 내림차순으로 정렬하여 최대 3개의 게시물을 추천해 줍니다.
>
> 리트윅 숫자가 늘어나게 되면 실시간으로 반영되어 추천 순위도 함께 변경됩니다.

　

- 게시물 좋아요

![09](https://user-images.githubusercontent.com/96227239/166669360-71532a09-8c64-4795-b2b5-4188f97452f7.gif)

![09-01](https://user-images.githubusercontent.com/96227239/166669635-9950bb05-f124-48d4-b151-e351587db95a.gif)

> 좋아요 버튼 클릭 시 하트 버튼에 애니메이션을 적용했습니다.
>
> 게시물 당 한 번의 좋아요만 할 수 있으며, 재 클릭 시 좋아요 개수가 다시 감소합니다.

　

- 아바타 변경

![14](https://user-images.githubusercontent.com/96227239/166670440-1a4cf9f9-8a3e-489b-b657-41a505678087.gif)

> 아바타 이미지를 변경할 수 있습니다.
>
> 인풋에 이미지 파일이 감지되면 업로드와 취소 버튼이 나타납니다.

　

- 이름 변경

![15](https://user-images.githubusercontent.com/96227239/166670712-d4a3edfd-6b2c-4616-9a3b-380144d8a414.gif)

> 인풋의 텍스트 변경이 감지되면 우측에 수정 버튼이 나타납니다.
>
> 버튼은 이름이 두 글자 이상일 때만 나타나고 두 글자 미만일 땐 사라집니다.

　

- 게시물 일괄 삭제

![12](https://user-images.githubusercontent.com/96227239/166669953-035ee909-36c9-49d2-bbd8-dc765611be9b.gif)

> 프로필 페이지에서 여러개의 게시물을 한 번에 삭제할 수 있습니다.
>
> 삭제가 완료되고 게시물이 0개가 되면 나의 게시물 개수를 알려주는 문구가 변경되고, 일괄 삭제 버튼이 비활성화 됩니다.

　

- 회원 탈퇴

![17](https://user-images.githubusercontent.com/96227239/166671102-425d04f5-fbfd-4d54-b570-e671a3293584.gif)

> 탈퇴가 완료되면 로그인 페이지로 이동합니다.
> 
> 추후 탈퇴 요청 시 비밀번호를 재입력하도록 추가할 예정입니다.

　
 
## 📌 추후 수정사항

![new mobile](https://user-images.githubusercontent.com/96227239/167062682-80826cfc-0298-4aa3-b5a2-2f2c0e2340bb.jpg)

> 네비게이션과 여러 레이아웃, css를 수정했습니다.

　
 
 - 회원가입 후 이름 설정

![18](https://user-images.githubusercontent.com/96227239/167245903-659adf8d-7a38-445c-9a01-c96e016edd47.gif)

> 회원가입 후 로그인 시 이름이 없음을 감지하면 이름 설정 모달창을 띄웁니다.

　
 
 - 댓글 작성

![20](https://user-images.githubusercontent.com/96227239/168000258-ab29286b-4dba-4023-b4c6-df3e7243d24c.gif)

> 게시물 작성 인풋 에러때 발생하는 같은 css를 적용하였습니다.
>
> 댓글 작성 시 좌측 하단에 알림 창이 애니메이션과 함께 몇 초간 나타납니다.

　
 
 - 북마크

![21](https://user-images.githubusercontent.com/96227239/169683170-69918aa7-dd0b-4e77-afff-a87ff181bde3.gif)

> 원하는 게시물을 북마크 기능을 통해 저장할 수 있습니다.
>
> 본인의 게시물은 저장되지 않습니다.

　
 
 - 나의 게시물, 나의 댓글
 
　![myFeedsm](https://user-images.githubusercontent.com/96227239/175808958-23b4f6c8-cc92-4303-aad7-80a53b705af7.jpg)

> 프로필 페이지에서 나의 게시물과 댓글을 한번에 볼 수 있습니다.

　

- 준비중인 페이지

![31](https://user-images.githubusercontent.com/96227239/175809211-ddf1ca94-ae9e-4eea-bd2f-40dce92c860f.gif)

> 비어있는 페이지는 useNavigate를 이용해 3초 후 이전 페이지로 돌아갑니다.

　


　
 

## ✒ 1인 프로젝트를 마치며

토이 프로젝트를 통해 Firebase를 처음 사용해 보았는데, 진입장벽이 높거나 크게 어렵지 않으면서도 충분한 웹서비스를 구축할 수 있어서 굉장히 재미있고 좋은 배움을 얻었습니다. 다음에는 좀 더 큰 규모의 프로젝트를 Firebase로 구축해 보고 싶다고 느낄 정도로 편리하고 흥미로운 플랫폼이었습니다.

이번 프로젝트에서 가장 많이 배웠던 점으로는 데이터베이스 설계, 반응형, 애니메이션이었습니다. 아직 프로젝트에서 백엔드 업무를 해본 적이 없었기 때문에 데이터베이스는 아주 기본적인 지식만 있었습니다. 정말 기본적인 기능이기도 하지만 온전히 직접 해보는 건 처음이었던 '좋아요'와 '북마크' 기능을 구현하려고 정말 혼자서 몇 주를 씨름했던 기억이 납니다. 여러 자바스크립트 함수를 썼다가, 또 필드의 형식을 이리저리 바꾸어보는 등 엄청난 시행착오를 겪었습니다. 그러다 산책중 불현듯 떠오른 아이디어로 10여 분 만에 기능을 구현할 수 있게 되었고, 엄청난 성취감을 느낄 수 있었습니다. 아직은 코드가 많이 지저분하지만 모든 부분을 반응형으로 제작해보며 제가 좋아하는 반응형 제작 스킬을 레벨업 할 수 있었습니다. 그리고 이전에는 아주 간단한 애니메이션만 적용했었는데 컴포넌트가 언마운트 될 때의 애니메이션을 적용하는 법이나 여러 상황에 따라 다르게 출력되는 애니메이션 등 해보지 않아 감을 잡을수 없었던 작업들을 라이브러리 없이 직접 코딩해 보면서 애니메이션에 대한 이해도, 리액트의 편리성을 한 번 더 느끼고 배웠습니다. 이번 프로젝트를 통해서 주니어 개발자로서 한 단계 더 도약한 느낌이어서 1차적인 완성 후 정말 뿌듯했습니다. 마지막으로 모바일 환경에 맞게 최적화를 처음 해보았는데 수많은 시행착오와 계속되는 css 수정으로 생각보다 쉽지 않았지만 새로운 경험을 해본 것 같아 많은 도움이 될 거 같습니다.

아직도 여러 많은 기능들이나 로직은 쉽게 구현하지 못하지만 차근차근 배워가며 리팩토링과 함께 완성도 있는 웹페이지로 만들어 갈 예정입니다.
앞으로도 많은 유용하고 재미있는 프로젝트를 만들고 싶습니다! 읽어주셔서 감사합니다. 👋
