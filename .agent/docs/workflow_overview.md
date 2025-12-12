# 🔄 AI Agency Workflow Overview

> **Purpose**: This document is the **Single Source of Truth** for the entire development workflow.  
> All agents MUST reference this before starting any task.

---

## 📊 Workflow Diagram

```mermaid
flowchart TD
    subgraph Phase0["Phase 0: Initialization"]
        A[👤 User Request] --> B[🧑‍💼 PM: act_init_feature]
        B --> C[Create Worktree]
        C --> D[mkdir .agent/specs/]
    end

    subgraph Phase1["Phase 1: Planning"]
        D --> E[🧑‍💼 PM: act_research_code]
        E --> F["📄 00_research_summary.md"]
        F --> G[🧑‍💼 PM: act_define_task]
        G --> H["📄 01_requirements.md"]
        H --> I{Figma URL?}
        I -->|Yes| J[🧑‍💼 PM: act_extract_figma_design]
        I -->|No| K[🧑‍💼 PM: act_design_doc]
        J --> L["📄 02_figma_design_data.md"]
        K --> M["📄 02_visual_design.md"]
    end

    subgraph Phase2["Phase 2: Architecture"]
        L --> N[🏗️ Architect: act_design_arch]
        M --> N
        N --> O["📄 03_architecture.md"]
        O --> P[Define Zod Schemas]
        P --> Q[packages/shared-schema]
    end

    subgraph Phase3["Phase 3: Implementation"]
        Q --> R[👨‍💻 Developer: act_build_backend]
        R --> S[Hexagonal Architecture + TDD]
        S --> T[apps/backend/src]
        T --> U[👨‍💻 Developer: act_build_frontend]
        U --> V[Atomic Design + CDD]
        V --> W[apps/frontend/src]
        W --> X["📄 04_implementation_report.md"]
    end

    subgraph Phase4["Phase 4: Release"]
        X --> Y[🧑‍💼 PM: act_report]
        Y --> Z[Run Tests]
        Z --> AA{Tests Pass?}
        AA -->|No| R
        AA -->|Yes| AB[Archive Specs]
        AB --> AC[Create PR]
        AC --> AD[Cleanup Worktree]
    end

    style Phase0 fill:#e1f5fe
    style Phase1 fill:#fff3e0
    style Phase2 fill:#f3e5f5
    style Phase3 fill:#e8f5e9
    style Phase4 fill:#fce4ec
```

---

## 📁 Document Output Specification

All documents are created in **`.agent/specs/`** within the active worktree.

| File | Creator | Description |
|------|---------|-------------|
| `00_research_summary.md` | PM | Codebase research: reusable tables, APIs, components |
| `01_requirements.md` | PM | User stories, acceptance criteria, constraints |
| `02_figma_design_data.md` | PM | Figma MCP extracted design tokens & components |
| `02_visual_design.md` | PM | Manual wireframes (if no Figma) |
| `03_architecture.md` | Architect | Zod schemas, API spec, implementation plan |
| `04_implementation_report.md` | Developer | Test results, screenshots, commit history |

---

## 🎭 Role Responsibilities

### 🧑‍💼 Product Manager (PM)
- **Phase 0**: Initialize worktree (`act_init_feature`)
- **Phase 1**: Research + Requirements + Design extraction
- **Phase 4**: Final verification and PR creation

### 🏗️ Lead Architect
- **Phase 2**: Technical design and schema definition
- Creates the "Contract" between Backend and Frontend

### 👨‍💻 Full Stack Developer
- **Phase 3**: Backend (Hexagonal) + Frontend (Atomic Design)
- Writes tests FIRST (TDD/CDD)

### 👔 Team Lead (Orchestrator)
- Reviews ALL outputs before phase transitions
- Sends work back if quality < 100%
- Does NOT write code or research

---

## 🚦 Quality Gates

Each phase transition requires approval:

```
PM Output → [Lead Review] → Architect Input
Architect Output → [Lead Review] → Developer Input
Developer Output → [Lead Review] → PM Finalization
```

> ⚠️ **STOP THE LINE**: If a document is missing or incomplete, do NOT proceed.

---

## 📂 Directory Structure

```
📁 .worktrees/<feature-name>/
├── 📁 .agent/
│   └── 📁 specs/          ← ALL DOCUMENTS GO HERE
│       ├── 00_research_summary.md
│       ├── 01_requirements.md
│       ├── 02_figma_design_data.md
│       ├── 03_architecture.md
│       └── 04_implementation_report.md
├── 📁 my-100x-project/
│   ├── 📁 apps/
│   │   ├── backend/
│   │   └── frontend/
│   └── 📁 packages/
│       └── shared-schema/
└── .git (worktree link)
```

---

## ✅ Checklist for Agents

Before starting work, verify:

- [ ] Am I in the correct worktree? (`pwd`)
- [ ] Does `.agent/specs/` exist?
- [ ] Are all prerequisite documents present?
- [ ] Did I read the previous phase's output?

After completing work:

- [ ] Did I save my output to `.agent/specs/`?
- [ ] Did I commit my changes?
- [ ] Did I notify the next agent/Lead?
