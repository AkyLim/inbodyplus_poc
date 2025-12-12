# Architecture: User Info API & Swagger

## 1. Schema Design
- **Source Table**: `Profile_UserInfo`
- **Primary Key**: `UID` (BigInt)

### 1.1 Serialization Strategy
- **Prisma BigInt**: The `UID` field is `BigInt`.
- **JSON**: Not supported natively.
- **Solution**: Implement a global or field-level Interceptor to convert `BigInt` -> `String`.

## 2. API Design

### 2.1 Endpoint
```typescript
GET /users/:uid
```

### 2.2 DTOs
**UserResponseDto**:
```typescript
class UserResponseDto {
  uid: string; // Serialized from BigInt
  name: string;
  email: string;
  profileImgUrl: string;
  // ... other fields as needed
}
```

## 3. Component Architecture
- **Module**: `UsersModule`
- **Controller**: `UsersController`
  - `@ApiTags('Users')`
  - `@ApiResponse({ type: UserResponseDto })`
- **Service**: `UsersService`
  - `prisma.profile_UserInfo.findUnique()`

## 4. Swagger Config
- **File**: `main.ts`
- **Path**: `/api`
- **Library**: `@nestjs/swagger`
