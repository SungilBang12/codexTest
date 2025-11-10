# Spring Boot + React WebSocket Notification Example

이 저장소는 Spring Boot 백엔드와 React 프론트엔드를 이용해 WebSocket 기반 알림 기능을 구현하는 예시 프로젝트입니다. 간단한 REST API로 알림을 발행하면, WebSocket에 연결된 클라이언트가 실시간으로 메시지를 수신합니다.

## 구성

- `backend/`: Spring Boot 3.x 기반 REST + WebSocket 서버
  - `/api/notifications` 엔드포인트로 알림을 발행
  - `/ws/notifications` WebSocket 엔드포인트로 클라이언트에 브로드캐스팅
- `frontend/`: Vite + React 앱
  - WebSocket으로 서버와 연결하여 알림을 실시간으로 수신
  - 알림 발행을 위한 간단한 폼 제공

## 실행 방법

### 1. 백엔드 서버 실행

```bash
cd backend
mvn spring-boot:run
```

> Java 17 이상과 Maven 3.9 이상이 필요합니다.

### 2. 프론트엔드 개발 서버 실행

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하면 됩니다.

## 동작 방식

1. React 앱이 `ws://localhost:8080/ws/notifications` WebSocket에 연결합니다.
2. 연결이 수립되면 서버는 세션을 관리하고, REST API를 통해 들어온 알림을 연결된 모든 클라이언트에 브로드캐스팅합니다.
3. 클라이언트는 수신된 JSON payload(`title`, `body`)를 UI 목록 상단에 추가해 실시간 피드를 구성합니다.

## 추가 아이디어

- 사용자별 구독 주제(topic)를 분리하여 특정 그룹에게만 알림 전송
- 데이터베이스와 연동하여 알림 이력 저장
- 인증/인가를 적용하여 알림 발행 권한 제어

프로젝트 구조를 기반으로 필요에 맞게 확장해 보세요.
