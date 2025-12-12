# Requirements: User Info API & Swagger

## 1. Overview
Implement an API endpoint to retrieve user profile information based on `UID` and enable Swagger documentation for the backend.

## 2. Functional Requirements

### 2.1 User Info Endpoint
- **Method**: `GET`
- **Path**: `/users/:uid`
- **Parameter**: `uid` (String type in URL, maps to BigInt in DB)
- **Response**:
  - Success (200): User profile object (JSON)
  - Not Found (404): If `uid` does not exist
- **Data Handling**:
  - `UID` field (BigInt) must be serialized to String in the JSON response.

### 2.2 Swagger Documentation
- **Path**: `/api`
- **Features**:
  - Auto-generated documentation for all endpoints
  - `UserResponseDto` schema visibility

## 3. Non-Functional Requirements
- **Performance**: Direct DB query using primary key (`UID`).
- **Standard**: Follow NestJS best practices (Controller-Service-Repository/Prisma).

## 4. Constraints
- Must use `Profile_UserInfo` table.
- Must use existing Prisma setup.
