# API Conventions

Coffit API는 HTTP 계약, 애플리케이션 흐름, 외부 provider 연동, 도메인 규칙을 분리한다.

## 계층 책임

- Controller는 HTTP 입력을 받고 애플리케이션 Service를 호출한다.
- Service는 검색·필터링·정렬처럼 애플리케이션 흐름을 조합한다.
- 외부 provider 호출과 provider 응답 변환은 해당 `clients/`에 둔다.
- DTO는 HTTP 입력 검증과 응답 계약을 정의한다.
- 도메인 목록과 판별 규칙은 해당 `domain/`을 단일 기준으로 사용한다.

## 구현 규칙

- Controller에서 외부 provider API를 직접 호출하지 않는다.
- 외부 provider의 원본 응답 타입이나 필드명을 API 응답 계약으로 노출하지 않는다.
- DTO의 입력 검증과 Swagger 응답 문서는 실제 API 계약 변경과 함께 갱신한다.
- 도메인 판별 로직을 Controller, client, 프론트 컴포넌트에 중복 구현하지 않는다.
- provider 오류는 해당 API의 서비스 불가 응답 정책을 유지한다.
- 환경 변수나 외부 API key를 코드·문서·로그에 추가하지 않는다.

## 현재 카페 검색 API의 기준

- `apps/api/src/cafes/cafes.controller.ts`의 `CafesController`는 HTTP 입력을 받고 `CafesService`를 호출하는 역할만 담당한다.
- `apps/api/src/cafes/clients/kakao-local.client.ts`가 Kakao Local API 호출과 provider 응답 변환을 담당한다.
- `apps/api/src/cafes/domain/low-cost-coffee-brands.ts`가 저가 커피 브랜드 목록과 alias 판별의 단일 기준이다.
- 카페 검색 결과의 거리 정렬과 브랜드 필터링은 `CafesService`의 검색 흐름에서 수행한다.

## 변경 시 확인할 것

- DTO 변경이 `apps/web/src/features/map/api/cafeSearchApi.ts`와 웹 도메인 타입에 미치는 영향을 확인한다.
- 외부 API 요청 파라미터 변경 시 좌표 순서(`x`/`y`)와 거리 단위를 확인한다.
- API 응답 계약 변경 시 프론트 소비자를 함께 확인한다.

## 검증

- API 동작 변경 후 `pnpm test:api`를 실행한다.
- API 빌드 영향이 있는 변경 후 `pnpm build:api`를 실행한다.
