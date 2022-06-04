# 슬기로운 가족생활

가족구성원들에게 매일 정해진 시간에 질문이 제공되는 어플입니다. 서로 질문에 답변하며 가까워지는 것을 목표하여 만들었습니다. 
[앱 레포지터리](https://github.com/username1103/smart_familylive_client)


<div>
<img width="205" alt="image" src="https://user-images.githubusercontent.com/67570061/171988514-d6c7ea0c-f3b9-41cb-90ea-1e1bd2051279.png">
<img width="205" alt="image" src="https://user-images.githubusercontent.com/67570061/171988616-29b0d3b1-0009-4e44-899e-cc2a6aab7dff.png"> 
<img width="205" alt="image" src="https://user-images.githubusercontent.com/67570061/171988539-d0c20f39-9975-4a50-8d00-a0d5ad5b6ae5.png">
<img width="205" alt="image" src="https://user-images.githubusercontent.com/67570061/171988658-277d56fc-5f81-4474-ad25-832cbc3b8c07.png">
</div>

<div>
 <img width="820" alt="image" src="https://user-images.githubusercontent.com/67570061/171988806-d65ccd77-8d4d-4646-a69c-9d2a18b591f5.png">
</div>
 
---

### 요구사항
1. 매일 정해진 시간(기본 21:00)에 질문이 온다. 커스텀질문이 우선시 되며 없는 경우, 정해진 기본 질문이 온다.
2. 답변을 작성해야만 다른 사람의 답변을 볼 수 있다.
3. 콕 찌르기를 통해 닥달할수 있다.
4. 프로필 사진 및 상태메시지 설정 가능
5. 답변시 제공되는 포인트를 통해 아이템을 구매할 수 있다.
  - 커스텀 질문 작성: 다음 질문 시간에 먼저 작성된 순서대로 질문이 하루씩 오게 된다.
  - 질문시간 변경: 매일 받는 질문의 시간을 변경한다.
6. 연결 코드를 통해 가족을 매칭 시킨다.
8. 카카오 로그인을 통해 무분별 가입을 막는다.

---

### 정해진 시간에 어떻게 질문을 보낼까?

일반적으로 서버는 클라이언트의 요청에 따라 행위를 하고 응답을 하게되는데, 정해진시간에 질문을 보내는 작업이 필요했다.

#### node_schedule 사용
구현하기 위한 방법
- ubuntu 크론잡
- node_schedule
- 쿠버네티스
- AWS lambda + event bridge

등이 있지만, 우선적으로 서버 인스턴스가 하나이기 때문에 빠른 개발을 위해 npm패키지인 node_schedule을 사용하기로 했다.

---

### 푸시 알림

Expo를 사용하고 있기 때문에 비교적 편하게 발송이 가능했다. 사용자별 expo device token을 저장해두고 원할 때 해당 토큰으로 푸시알림 요청을 하면 expo에서 안드로이드, ios에 맞도록 푸시알림을 톨해 발송해준다.

<img width="500" src="https://user-images.githubusercontent.com/67570061/171989551-3b141521-fbd9-4a92-92e3-843eeec74fc0.png">


---

### 시스템 구성
- 앱: React-Natvie, Expo
- 서버: ExpressJS
- 데이터베이스: MongoDB
- DevOps: Docker, AWS EC2, AWS S3  

<img width="500" alt="image" src="https://user-images.githubusercontent.com/67570061/171987557-23a5d37d-bddc-4a25-8f58-cfbd6bf29a86.png">

---

### 데이터베이스 (MongoDB atlas 사용)
<img width="500" alt="image" src="https://user-images.githubusercontent.com/67570061/171987718-94950933-648d-4fd3-b482-303282a8ac64.png">

---

### 아쉬운점

스타트업 일하면서 혼자 앱부터 서버까지 모두 제작하다 보니 코드도 엉망이고 테스트 코드도 없는 동작만을 위한 코드를 작성했다. 시간될 때, 한번 코드 정리를 해도 좋을 것 같다.

