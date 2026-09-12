<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Collaboration Rules

이 저장소에서 AI 도구와 함께 작업할 때 따르는 협업 규칙이다. AI 도구는 구현 보조자이며, 최종 판단과 책임은 작업자가 가진다.

## 기본 원칙

- PRD와 사용자 흐름은 Notion을 기준으로 확인한다.
- GitHub Issue는 실제 구현 가능한 작업 단위로 작성한다.
- GitHub PR에는 설계 판단, 변경 범위, 검증 기록을 남긴다.
- 작업 범위가 불명확하면 구현 전에 Issue 또는 PR에 가정과 질문을 먼저 남긴다.
- 기존 코드 스타일, 폴더 구조, 네이밍을 우선 따른다.
- 관련 없는 리팩터링이나 포맷 변경은 작업 범위에 포함하지 않는다.

## 작업 흐름

1. Notion의 PRD와 사용자 흐름을 확인한다.
2. GitHub Issue에서 작업 목표, 완료 조건, 검증 방법을 정리한다.
3. Issue 번호를 포함한 브랜치를 생성한다.
4. 작은 단위로 구현하고 필요한 테스트 또는 수동 검증을 수행한다.
5. PR 본문에 변경 이유, 설계 판단, 검증 결과를 기록한다.
6. 리뷰 피드백은 기존 의도를 훼손하지 않는 범위에서 반영한다.

## AI 구현 단위 규칙

- AI는 사용자가 명시적으로 요청하지 않는 한 직접 커밋하지 않는다.
- AI는 이슈를 한 번에 끝까지 구현하지 않고, 기반 변경, 상태 관리, UI 연결, 문서 수정처럼 목적이 다른 변경을 분리해 하나의 논리적 변경 단위로 순차 구현한다.
- 한 구현 단위를 마치면 변경 파일, 변경 이유, 검증 결과, 추천 커밋 메시지를 보고하고 다음 구현으로 넘어가지 않는다.
- 사용자가 해당 변경을 확인하고 직접 커밋한 뒤 다음 단계를 요청하면 다음 구현 단위를 진행한다.

## 컴포넌트 설계 하네스

- 공통 컴포넌트는 스타일을 감싸기 위한 껍데기가 아니라, 해당 UI가 가져야 하는 역할과 동작을 응집해서 제공해야 한다.
- 공통 컴포넌트는 특정 도메인 데이터와 비즈니스 흐름을 몰라야 한다.
- 화면 컴포넌트는 도메인 흐름을 조합하되, 공통 UI의 내부 동작 상태를 과하게 들고 있지 않는다. 특정 UI 동작에 필요한 상태는 가능한 한 해당 UI 컴포넌트 안에 둔다.
- props는 스타일 구현보다 기능의 의도를 드러내는 이름을 우선한다.
- 새 추상화를 만들기 전에 이번 이슈에서 실제로 필요한 동작인지 확인한다. 아직 필요하지 않은 확장은 별도 이슈로 분리한다.

## 브랜치 규칙

브랜치는 작업 성격에 맞는 type과 GitHub Issue 번호를 포함해 생성한다.
새 작업 브랜치는 `release` 브랜치를 기준으로 생성한다.

형식:

```text
<type>/#<issue-number>-<work-name>
```

예시:

```text
feat/#12-login-flow
fix/#18-auth-token-refresh
docs/#23-ai-collaboration-rules
chore/#31-github-templates
refactor/#42-coffee-card-structure
test/#56-order-validation
```

type은 작업 성격에 따라 선택한다.

- `feat`: 사용자에게 보이는 기능 추가 또는 변경
- `fix`: 버그 수정
- `docs`: 문서 작성 또는 수정
- `chore`: 설정, 템플릿, 빌드 보조 작업 등 제품 동작과 직접 관련 없는 변경
- `refactor`: 동작 변경 없는 코드 구조 개선
- `test`: 테스트 추가 또는 수정

## Issue 작성 규칙

- AI가 Issue 생성을 요청받으면 `.github/AI_ISSUE_GUIDE.md`의 상세 규칙을 따른다.

## PR 작성 규칙

- PR 제목은 Issue와 연결되도록 작성한다.
- PR 본문에는 변경 사항, 설계 판단, 검증 결과, 리뷰 요청 포인트를 포함한다.
- 검증하지 못한 항목은 숨기지 말고 명시한다.
- 화면 또는 사용자 흐름이 바뀌면 스크린샷, 영상, 또는 수동 검증 기록을 남긴다.

## AI 도구 사용 규칙

- AI에게 요청할 때는 관련 Issue, Notion 링크, 기대 동작, 제한 조건을 함께 제공한다.
- AI가 제안한 변경은 그대로 적용하지 말고 코드와 요구사항에 맞는지 확인한다.
- AI가 생성한 테스트, 문서, 주석도 실제 동작과 일치하는지 검토한다.
- 보안 정보, 개인 정보, 운영 키는 프롬프트나 코드에 포함하지 않는다.
- AI가 추정한 내용은 PR에 설계 판단 또는 가정으로 명시한다.

## Coffit 공통 AI workflow

- Codex와 Claude Code의 코드 변경 작업은 `docs/ai/coffit-workflow.md`를 공통 workflow 원본으로 사용한다.
- `.claude/skills/coffit/`는 Claude Code에서 이 workflow를 호출하기 위한 도구별 어댑터다. 프로젝트 규칙과 workflow 내용을 어댑터에 중복해서 정의하지 않는다.
