---
name: coffit
description: >
  Coffit의 기능 구현, 버그 수정, 기존 변경 리뷰, PR 준비를 프로젝트 workflow에 맞춰
  수행한다. Coffit 코드 변경, 지도 검색 수정, 카페 API 변경, diff 리뷰, PR 본문 작성,
  Issue 작업 이어서 요청에 사용한다. 단순 개념 질문이나 저장소 탐색만 필요한 요청에는
  사용하지 않는다.
---

# Coffit

이 Skill은 Claude Code에서 Coffit 공통 workflow를 호출하는 어댑터다.

실행 전에 [공통 workflow](../../../docs/ai/coffit-workflow.md)를 읽고, 그 문서의
Build·Review·Prepare 모드와 handoff 규칙을 따른다. 프로젝트 컨벤션은 공통 원본인
`docs/ai/rules/`에서 읽으며 이 파일에 중복해서 정의하지 않는다.
