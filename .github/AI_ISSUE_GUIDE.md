# AI Issue Guide

AI가 GitHub Issue 생성을 요청받았을 때만 이 문서를 확인한다.

## 생성 절차

1. `.github/ISSUE_TEMPLATE`의 해당 템플릿을 먼저 확인한다.
2. Issue를 바로 생성하지 않고 제목, 본문, 라벨, 마일스톤, assignee 초안을 먼저 사용자에게 보여준다.
3. 사용자가 승인한 뒤에만 `gh issue create`를 실행한다.
4. Issue 생성 후 `release`를 기준으로 작업 브랜치를 생성한다.

## 제목 규칙

Issue 제목은 다음 형식을 사용한다.

```text
[PREFIX] 작업 결과가 드러나는 제목
```

`PREFIX`는 대문자로 작성하고, 대응하는 GitHub 라벨을 함께 지정한다.

## Prefix와 라벨

- `[FEAT]`: `FEAT`
- `[FIX]`: `FIX`
- `[DOCS]`: `DOCS`
- `[CHORE]`: `CHORE`
- `[REFACTOR]`: `REFACTOR`
- `[TEST]`: `TEST`

## 브랜치 생성

Issue 생성 후 작업 브랜치는 GitHub CLI의 Issue 개발 브랜치 기능으로 생성한다.
브랜치 생성 시 로컬 `release` 상태를 기준으로 판단하지 않고, `gh issue develop --base release`를 사용해 원격 `release`를 기준으로 생성한다.

```bash
gh issue develop <issue-number> --base release --name <type>/#<issue-number>-<work-name> --checkout
```

예시:

```bash
gh issue develop 7 --base release --name feat/#7-current-location-map-center --checkout
```

## 작성 기준

- Issue 제목과 작업 목록의 각 항목은 간결한 명사형으로 작성하고, 본문은 협업 문서이므로 존댓말로 작성한다.
- Issue 본문은 템플릿의 섹션 구조를 따른다.
- Issue는 하나의 PR로 해결 가능한 크기로 작성한다.
- Issue에는 실제 구현에 필요한 목표, 작업 범위, 완료 기준만 간결하게 남긴다.
- 목표에는 이 Issue에서 달성할 결과를 적는다.
- 작업 목록에는 구현 작업만 포함한다.
- 완료 조건이 필요한 경우 사용자가 확인할 수 있는 상태나 동작 기준으로 적는다.
- 참고 섹션에는 실제 구현에 필요한 내용만 남긴다.
- 마일스톤이 명확한 경우 기존 마일스톤에 연결한다.
- assignee는 기본적으로 현재 `gh` 로그인 사용자로 지정한다.
