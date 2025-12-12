# Figma MCP 서버 사용 가이드

## Quick Start

> [!IMPORTANT]
> **Figma 디자인을 사용하기 전에 서버가 실행 중인지 확인하세요!**

### 1. 환경 변수 설정 (보안 권장)
Figma Personal Access Token은 민감한 정보이므로 소스 코드에 포함하지 말고 환경 변수로 관리해야 합니다.

1. 프로젝트 루트의 `.env` 파일에 토큰을 추가하세요:
   ```bash
   FIGMA_ACCESS_TOKEN=your_figma_token_here
   ```
   *(참고: `.env` 파일은 `.gitignore`에 포함되어 있어야 합니다.)*

2. 터미널에서 환경 변수를 로드합니다:
   ```bash
   source .env
   ```

### 2. 서버 시작
환경 변수를 사용하여 서버를 시작합니다:

```bash
figma-developer-mcp --figma-api-key $FIGMA_ACCESS_TOKEN --port 3845
```

서버가 시작되면 다음과 같은 메시지가 표시됩니다:
```
[INFO] HTTP server listening on port 3845
[INFO] SSE endpoint available at http://localhost:3845/sse
```

---

## 서버 정보

### 서버 설정
- **패키지**: `figma-developer-mcp`
- **포트**: 3845
- **인증 방식**: Personal Access Token (환경 변수 `FIGMA_ACCESS_TOKEN` 사용 권장)

### 엔드포인트
- **SSE**: `http://localhost:3845/sse`

---

## 문제 해결

### 연결 오류 (ECONNREFUSED)
서버가 실행 중인지 확인하세요:
```bash
lsof -i :3845
```

### 인증 오류
- `.env` 파일에 `FIGMA_ACCESS_TOKEN`이 올바르게 설정되었는지 확인하세요.
- `echo $FIGMA_ACCESS_TOKEN` 명령어로 환경 변수가 로드되었는지 확인하세요.

---

## 보안 주의사항

> [!CAUTION]
> **API 키는 민감한 정보입니다. 절대 공개 저장소에 커밋하지 마세요.**

### 권장 사항:
- 환경 변수 사용: `.env` 파일에 저장하고 `.gitignore`에 추가
- 키 관리 시스템 사용 (AWS Secrets Manager, 1Password 등)
- 정기적으로 토큰 갱신
