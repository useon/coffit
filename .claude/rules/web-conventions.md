---
description: Coffit 웹 앱의 기능 구조, 의존성 경계, 외부 연동 및 검증 컨벤션
paths:
  - "apps/web/src/**/*.ts"
  - "apps/web/src/**/*.tsx"
---

# Web Conventions

Coffit 웹 앱은 기능별 책임과 외부 연동 경계를 분리해 변경 영향을 제한한다.

## 기능 구조

- 도메인 타입과 순수 변환 로직은 해당 feature의 `domain/`에 둔다.
- API 호출과 서버 응답 변환은 해당 feature의 `api/`에 둔다.
- React 상태와 데이터 연결은 해당 feature의 hook에 둔다.
- 화면 표시와 사용자 상호작용은 해당 feature의 `components/`에 둔다.
- 외부 SDK의 타입과 호출은 해당 feature의 `adapters/`에 격리한다.
- 여러 feature에서 재사용하는 UI·API·브라우저 기능만 `shared/`에 둔다.

## 구현 규칙

- 컴포넌트에서 외부 SDK 전역 객체를 직접 호출하거나 import하지 않는다.
- API 응답 타입과 화면 도메인 타입을 혼용하지 않는다. 필요한 변환은 API 경계에서 수행한다.
- 기존 feature의 유사한 구현과 유틸을 먼저 확인하고, 실제 필요 없이 새 추상화를 추가하지 않는다.
- URL 검색 파라미터와 같은 화면 상태는 해당 도메인 유틸의 규칙을 재사용한다.
- 포맷팅·표시 변환은 기존 도메인 유틸을 재사용하고 컴포넌트에 중복 구현하지 않는다.
- 기존 import alias와 상대 경로 규칙을 유지한다.

## 변경 시 확인할 것

- 데이터 상태(`idle`, `loading`, `success`, `empty`, `error`)가 기존 화면 흐름과 호환되는지 확인한다.
- API 계약을 변경하면 `apps/api`의 관련 DTO와 서비스 영향도를 확인한다.
- 외부 SDK 연동을 변경하면 adapter의 공개 포트와 사용 컴포넌트를 함께 확인한다.

## 검증

- 웹 코드 변경 후 `pnpm lint`를 실행한다.
- 웹 빌드 영향이 있는 변경 후 `pnpm build:web`을 실행한다.
