# ORM Implementation Requirements (MSSQL)

> **Feature**: `orm-mssql2`  
> **Author**: Product Manager  
> **Date**: 2025-12-12  
> **Status**: Ready for Architecture Design

---

## 1. Overview

기존 운영 중인 MSSQL 데이터베이스에 연결하는 **이식성 높은 ORM 레이어**를 구현합니다.  
Prisma를 기반으로 하며, 헥사고날 아키텍처 원칙을 따릅니다.

---

## 2. Business Requirements

### 2.1 Core Objectives

| ID | Requirement | Priority |
|----|-------------|----------|
| BR-01 | TEST DB의 기존 테이블 전체를 Prisma 스키마로 가져온다 | **HIGH** |
| BR-02 | 단일 설정 파일에서 환경(TEST/LIVE/LOCAL) 전환이 가능해야 한다 | **HIGH** |
| BR-03 | 다른 DB로 전환 가능하도록 이식성을 최대화한다 | **HIGH** |
| BR-04 | 헥사고날 아키텍처를 준수한다 | **HIGH** |

---

## 3. Technical Requirements

### 3.1 Database Connection

#### Target Databases

| Environment | Server | Database |
|-------------|--------|----------|
| **LIVE** | `fitpluskr-live-dbserver.database.windows.net:1433` | `fitplusKR_live_database` |
| **TEST** | `fitpluskr-test-dbserver.database.windows.net:1433` | `fitplusKR_test_database` |
| **LOCAL** | Local MSSQL instance (TBD) | TBD |

#### Connection Credentials

| Key | Value |
|-----|-------|
| User ID | `inbodyfit` |
| Password | `fitplus0418!` |
| Connect Timeout | `60` seconds |

> [!WARNING]
> 위 credentials는 `.env` 파일에 저장하고, 절대 git에 커밋하지 않습니다.

### 3.2 ORM Stack

- **ORM**: Prisma (기존 유지)
- **DB Provider**: `sqlserver` (MSSQL)
- **Schema Source**: TEST DB introspection (`prisma db pull`)

### 3.3 Configuration System

```
┌─────────────────────────────────────────────────────────────┐
│  config/database.config.ts                                  │
├─────────────────────────────────────────────────────────────┤
│  export const DB_ENV = "TEST" | "LIVE" | "LOCAL"            │
│                                                             │
│  → 이 변수 하나만 변경하면 전체 연결이 전환됨               │
└─────────────────────────────────────────────────────────────┘
```

#### 환경변수 (.env)

```dotenv
# Database Environment (TEST | LIVE | LOCAL)
DB_ENV=TEST

# MSSQL Connection Strings
MSSQL_TEST_URL="sqlserver://fitpluskr-test-dbserver.database.windows.net:1433;database=fitplusKR_test_database;user=inbodyfit;password=fitplus0418!;encrypt=true;trustServerCertificate=false;connectionTimeout=60"
MSSQL_LIVE_URL="sqlserver://fitpluskr-live-dbserver.database.windows.net:1433;database=fitplusKR_live_database;user=inbodyfit;password=fitplus0418!;encrypt=true;trustServerCertificate=false;connectionTimeout=60"
MSSQL_LOCAL_URL="sqlserver://localhost:1433;database=local_db;user=sa;password=localpassword;encrypt=false"

# Prisma uses this
DATABASE_URL="${MSSQL_TEST_URL}"
```

### 3.4 Architecture (Hexagonal)

```
┌──────────────────────────────────────────────────────────────┐
│                      Application Layer                        │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │
│  │   Service   │    │   Service   │    │   Service   │       │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘       │
│         │                  │                  │               │
│         └──────────────────┼──────────────────┘               │
│                            │                                  │
│                    ┌───────▼───────┐                         │
│                    │  Port (Interface)  │  ◄── IRepository   │
│                    └───────┬───────┘                         │
└────────────────────────────┼─────────────────────────────────┘
                             │
┌────────────────────────────┼─────────────────────────────────┐
│                    Infrastructure Layer                       │
│                    ┌───────▼───────┐                         │
│                    │    Adapter    │  ◄── PrismaRepository   │
│                    └───────┬───────┘                         │
│                            │                                  │
│                    ┌───────▼───────┐                         │
│                    │    Prisma     │                         │
│                    └───────┬───────┘                         │
│                            │                                  │
│                    ┌───────▼───────┐                         │
│                    │    MSSQL      │                         │
│                    └───────────────┘                         │
└──────────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **이식성 상세 설계는 Lead Architect에게 위임합니다.**  
> Repository 인터페이스 수준의 추상화인지, 완전한 DB 벤더 독립인지 Architect가 결정합니다.

---

## 4. Implementation Scope

### 4.1 In Scope

- [x] TEST DB 전체 테이블 introspection
- [x] Prisma schema 파일 생성 (MSSQL provider)
- [x] 환경별 연결 설정 시스템
- [x] `.env` 파일 구성
- [x] 헥사고날 Repository 패턴 적용
- [x] 이식성 높은 아키텍처 설계

### 4.2 Out of Scope

- ❌ Frontend 개발
- ❌ 마이그레이션 히스토리 관리 (추후 고려)
- ❌ Azure Key Vault 연동 (현재는 `.env` 사용)

---

## 5. Testing Strategy

### 5.1 Integration Test

| 항목 | 설정 |
|------|------|
| **연결 대상** | `fitpluskr-test-dbserver` (TEST DB) |
| **실제 DB 연결** | ✅ Yes |
| **테스트 후 정리** | ❌ 별도 처리 없음 (데이터 누적) |

### 5.2 Test Configuration

테스트 코드에서 `DB_ENV=TEST`로 설정하여 실제 TEST DB에 연결합니다.

---

## 6. Existing Schema (To Be Replaced)

현재 `apps/backend/prisma/schema.prisma`는 **SQLite** 기반입니다:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

> **이 스키마는 무시하고, TEST DB에서 introspection한 결과로 완전히 대체합니다.**

---

## 7. Success Criteria

1. ✅ `prisma db pull`로 TEST DB 전체 테이블이 스키마에 반영됨
2. ✅ `config/database.config.ts`에서 `DB_ENV` 변경만으로 환경 전환 가능
3. ✅ 헥사고날 아키텍처의 Port-Adapter 패턴이 적용됨
4. ✅ 테스트 코드에서 실제 TEST DB 연결 및 쿼리 성공
5. ✅ 다른 DB로 전환 가능한 이식성 있는 구조

---

## 8. Handoff to Architect

> [!IMPORTANT]
> ### 🔗 Next Step: `/02_lead_architect`
> 
> Architect가 결정해야 할 사항:
> 1. **이식성 수준**: Prisma 추상화 vs 완전한 벤더 독립
> 2. **디렉토리 구조**: 헥사고날 레이어 배치
> 3. **Repository 인터페이스 설계**
> 4. **환경 설정 로더 구현 방식**

---

*Document generated by Product Manager Agent*
