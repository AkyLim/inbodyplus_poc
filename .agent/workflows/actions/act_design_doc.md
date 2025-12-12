---
description: "Create Product Design, Wireframes, and User Flows"
---

# Action: Detailed Product Design (UX/UI)
# Caller: Product Manager (PM)

## Goal
Visualize the solution *before* technical architecture. Translate text requirements into a **Visual & Interaction Specification**.

> [!NOTE]
> This action is used when **NO Figma URL is provided**.
> If the user provides a Figma URL, use `act_extract_figma_design` instead.

## Steps

### Step 1: User Flow (Mermaid)
Map the user's journey, focusing on decision points and error states.

### Step 2: Wireframing (Text-Based)
Describe the UI layout, component hierarchy, and responsiveness.

### Step 3: Data Extraction
List strictly *what data* must be visible on the screen (Input for Architect).

## Output Format (`active_specs/02_visual_design.md`)

```markdown
# Visual Design: [Feature Name]

## 0. Design Source (If Figma)
- **Figma URL**: [Frame URL]
- **Extracted Data**:
  - Primary Color: #3B82F6
  - Font Family: Inter
  - Spacing Unit: 8px

## 1. User Flow (Interaction)
\`\`\`mermaid
graph TD;
  Start[User Clicks Login] --> Check{Is Valid?};
  Check -- Yes --> Redirect[Dashboard];
  Check -- No --> Error[Show Toast 'Invalid PW'];
\`\`\`

## 2. UI Wireframe (Component Tree)
*Structure for Frontend Dev:*
- **Page Layout** (`/dashboard` - Grid System)
  - `Header` (Organism)
    - `Logo`
    - `UserDropdown` (Molecule)
  - `MainContent` (Area)
    - `WelcomeBanner`
    - `StatsCard` (Repeated)

## 3. UI Specifications (States)
- **Loading**: Show `SkeletonLoader` for 200ms.
- **Error**: Toast message must auto-dismiss after 3s.
- **Empty State**: If no data, show illustration "No items found".

## 4. Data Requirements (For Architect)
*To render this UI, the API must provide:*
- **User Object**: `name`, `email`, `avatar_url`
- **Stats**: `total_visits` (number), `last_login` (date)
```

## Input
- **Requirements**: `active_specs/01_current_requirements.md`

## Completion Trigger
- You are DONE when `active_specs/02_visual_design.md` is saved.