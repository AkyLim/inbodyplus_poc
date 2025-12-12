# Feature Archive: ORM-MSSQL2

> **Archived Date**: 2025-12-12
> **Feature**: `feat/orm-mssql2`
> **Status**: Completed

## Summary
Successfully implemented MSSQL ORM using Prisma v5.14.0.
The implementation follows Hexagonal Architecture principles, separating Domain, Ports, and Adapters.
Existing SQLite schema was replaced by introspecting the `TEST` MSSQL database (`fitpluskr-test-dbserver`), resulting in 199 models.

## Archived Documents
This folder contains the engineering artifacts created during development:
- `01_requirements.md`: Initial requirements and scope.
- `00_task_list.md`: Tracked progress of tasks.
- `03_architecture.md`: Technical design and hex-arch blueprint.
- `04_implementation_report.md`: Final report on implementation details and verification.

## Key Changes
- **Backend Only**: No frontend changes involved.
- **Config**: Added dynamic `DatabaseConfigLoader` for TEST/LIVE/LOCAL switching.
- **Prisma**: Downgraded to v5.x for stability, connected to Azure SQL.
- **Refactoring**: `UsersService` now uses `UserRepository` interface instead of in-memory array.
