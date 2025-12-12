---
description: "Extract Design Data from Figma using MCP"
---

# Action: Extract Figma Design Data (MCP)
# Role: Product Manager

## Goal
Use Figma MCP to extract structured design data (components, styles, layout, tokens) from a Figma URL and create a comprehensive design specification document.

## Prerequisites

> [!IMPORTANT]
> **Figma MCP Server Must Be Running**
> 
> This action requires the Figma MCP server to be active. Follow these steps:

### Step 1: Check Server Status

```bash
lsof -i :3845
```

**Expected Results**:
- ✅ **Server Running**: You'll see process information → Proceed to Step 2
- ❌ **Server Not Running**: No output → Go to Step 1b

### Step 1b: Start Server (If Not Running)

// turbo
```bash
figma-developer-mcp --figma-api-key $FIGMA_ACCESS_TOKEN --port 3845
```

**Success Indicators**:
```
[INFO] HTTP server listening on port 3845
[INFO] SSE endpoint available at http://localhost:3845/sse
[INFO] Message endpoint available at http://localhost:3845/messages
```

> [!TIP]
> **Server Guide**: For detailed server management, see [`.agent/docs/figma_mcp_server_guide.md`](file:///Users/limsoocheol/Desktop/InBodyPlus_Poc/.agent/docs/figma_mcp_server_guide.md)


---

## Input

**From User**:
- Figma URL (Frame URL or File URL)
  - **Frame URL**: `https://www.figma.com/file/{FILE_ID}/...?node-id={NODE_ID}`
  - **File URL**: `https://www.figma.com/file/{FILE_ID}/...`

**Extract from URL**:
- `FILE_ID`: The file identifier
- `NODE_ID`: (Optional) Specific frame/component to focus on

---

## Steps

### Step 1: Parse Figma URL

Extract the File ID and Node ID from the provided URL:

```
URL Format: https://www.figma.com/file/ABC123/Project-Name?node-id=123:456

FILE_ID = ABC123
NODE_ID = 123:456 (optional)
```

### Step 2: Extract File Structure (MCP)

**Tool**: `read_resource` (Figma MCP)

**URI**: `figma://file/{FILE_ID}`

**What to Extract**:
1. **File Metadata**
   - File name
   - Last modified date
   - Pages list

2. **Node Tree** (if NODE_ID provided, focus on that subtree)
   - Page → Frame → Component hierarchy
   - Each node's properties:
     - `id`, `name`, `type`
     - `x`, `y`, `width`, `height`
     - `backgroundColor`, `fills`, `strokes`
     - `layoutMode` (HORIZONTAL, VERTICAL, NONE)
     - `padding`, `gap`, `constraints`

**Example MCP Call**:
```javascript
// This is conceptual - actual implementation uses MCP tools
const fileData = await mcpClient.readResource(`figma://file/${FILE_ID}`);
```

### Step 3: Extract Design Tokens (MCP)

**Tool**: `get_variable_defs` or analyze file styles

**What to Extract**:

#### 3.1: Colors
```json
{
  "primary": "#3B82F6",
  "secondary": "#10B981",
  "background": "#F9FAFB",
  "text": {
    "primary": "#111827",
    "secondary": "#6B7280",
    "disabled": "#9CA3AF"
  },
  "border": "#E5E7EB",
  "error": "#EF4444",
  "success": "#10B981"
}
```

#### 3.2: Typography
```json
{
  "fontFamily": "Inter",
  "sizes": {
    "xs": "12px",
    "sm": "14px",
    "base": "16px",
    "lg": "18px",
    "xl": "20px",
    "2xl": "24px",
    "3xl": "30px"
  },
  "weights": {
    "normal": 400,
    "medium": 500,
    "semibold": 600,
    "bold": 700
  },
  "lineHeights": {
    "tight": 1.25,
    "normal": 1.5,
    "relaxed": 1.75
  }
}
```

#### 3.3: Spacing
```json
{
  "base": "8px",
  "xs": "4px",
  "sm": "8px",
  "md": "16px",
  "lg": "24px",
  "xl": "32px",
  "2xl": "48px"
}
```

#### 3.4: Other Tokens
- Border radius: `{ "sm": "4px", "md": "8px", "lg": "12px", "full": "9999px" }`
- Shadows: `{ "sm": "...", "md": "...", "lg": "..." }`

### Step 4: Analyze Component Structure

**From Node Tree**, identify:

#### 4.1: Component Hierarchy
```
Page: Dashboard
├── Header (FRAME, type: COMPONENT)
│   ├── Logo (INSTANCE)
│   ├── Navigation (FRAME)
│   │   └── NavItem × 5 (INSTANCE)
│   └── UserMenu (COMPONENT)
│       ├── Avatar (INSTANCE)
│       └── Dropdown (COMPONENT_SET - variants)
├── MainContent (FRAME)
│   ├── WelcomeBanner (COMPONENT)
│   ├── StatsGrid (FRAME, layoutMode: HORIZONTAL, gap: 16)
│   │   └── StatCard × 4 (INSTANCE)
│   └── RecentActivity (COMPONENT)
└── Footer (COMPONENT)
```

#### 4.2: Component Details

For each major component, document:

**Example: Button Component**
```markdown
### Button Component
- **Type**: COMPONENT_SET (has variants)
- **Variants**:
  - `variant`: primary, secondary, outline, ghost
  - `size`: sm, md, lg
  - `state`: default, hover, active, disabled
- **Base Properties**:
  - Border radius: 8px
  - Font weight: 600
  - Transition: 150ms ease
- **Variant Styles**:
  - Primary: bg=#3B82F6, text=#FFFFFF
  - Secondary: bg=#E5E7EB, text=#111827
  - Outline: border=2px #3B82F6, text=#3B82F6
```

### Step 5: Extract Layout Information

For the target frame (or entire page), document:

```json
{
  "frame": {
    "name": "Dashboard - Desktop",
    "width": 1920,
    "height": 1080,
    "layoutMode": "VERTICAL",
    "padding": { "top": 0, "right": 0, "bottom": 0, "left": 0 },
    "gap": 0
  },
  "children": [
    {
      "name": "Header",
      "width": 1920,
      "height": 64,
      "layoutMode": "HORIZONTAL",
      "padding": { "horizontal": 24, "vertical": 16 },
      "gap": 16,
      "constraints": { "horizontal": "STRETCH", "vertical": "MIN" }
    }
  ]
}
```

### Step 6: Generate Reference Code (MCP)

**Tool**: `get_code` (if available in Figma MCP)

**Target**: Specific components or frames

**What to Generate**:
- React + Tailwind code for reference
- HTML + CSS for layout understanding

> [!WARNING]
> **Generated Code is Reference Only**
> 
> The code generated by Figma MCP is NOT production-ready. It should be used as:
> - **Structure reference**: Understanding component hierarchy
> - **Style reference**: Seeing how Figma properties map to CSS
> - **Layout reference**: Understanding flexbox/grid patterns
> 
> The Developer will rewrite this code following Clean Code principles.

**Example Generated Code**:
```tsx
// ⚠️ REFERENCE ONLY - Generated by Figma MCP
export const Button = ({ variant = 'primary', size = 'md', children }) => {
  const baseClasses = 'rounded-lg font-semibold transition-colors';
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </button>
  );
};
```

### Step 7: Identify Data Requirements

Based on the UI components, determine what data the backend must provide.

**Example**:

```markdown
## Data Requirements (For Architect)

### User Object
To render Header → UserMenu:
\`\`\`typescript
{
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  role: 'admin' | 'user';
}
\`\`\`

### Stats Object
To render StatsGrid → StatCard:
\`\`\`typescript
{
  total_visits: number;
  active_users: number;
  revenue: number;
  growth_rate: number; // percentage
}
\`\`\`

### Activity Object
To render RecentActivity:
\`\`\`typescript
{
  id: string;
  user_name: string;
  action: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, any>;
}
\`\`\`
```

### Step 8: Document Interaction States

For interactive components, document all states:

```markdown
## Interaction States

### Button
- **Default**: Base styles
- **Hover**: Background darkens by 10%, cursor pointer
- **Active**: Scale 0.98, background darkens by 15%
- **Disabled**: Opacity 0.5, cursor not-allowed
- **Focus**: Ring 2px primary color, offset 2px

### Card
- **Default**: shadow-sm
- **Hover**: shadow-md, translate-y -2px
- **Active**: shadow-lg

### Input Field
- **Default**: Border gray-300
- **Focus**: Border primary, ring 2px primary/20
- **Error**: Border red-500, ring 2px red/20
- **Success**: Border green-500, ring 2px green/20
- **Disabled**: Background gray-100, cursor not-allowed
```

---

## Output Format

**File**: `.agent/active_specs/02_figma_design_data.md`

```markdown
# Figma Design Data: [Feature Name]

## Design Source
- **Figma URL**: [원본 URL]
- **File ID**: [FILE_ID]
- **Node ID**: [NODE_ID] (if specific frame)
- **Last Modified**: [date]

---

## 1. Design Tokens

### Colors
\`\`\`json
{ ... }
\`\`\`

### Typography
\`\`\`json
{ ... }
\`\`\`

### Spacing
\`\`\`json
{ ... }
\`\`\`

### Border Radius
\`\`\`json
{ ... }
\`\`\`

### Shadows
\`\`\`json
{ ... }
\`\`\`

---

## 2. Component Structure

### Component Hierarchy
\`\`\`
[Tree structure]
\`\`\`

### Component Details

#### [Component Name]
- **Type**: COMPONENT | COMPONENT_SET | INSTANCE
- **Variants**: [if applicable]
- **Properties**: [list]
- **Styles**: [specific styles]

[Repeat for each major component]

---

## 3. Layout Data

### Frame: [Frame Name] ([Width]×[Height])
\`\`\`json
{
  "frame": { ... },
  "children": [ ... ]
}
\`\`\`

---

## 4. Generated Code Reference (Figma MCP)

> [!WARNING]
> **Reference Only - Not Production Code**

### [Component Name]
\`\`\`tsx
// Generated code here
\`\`\`

[Repeat for key components]

---

## 5. Data Requirements (For Architect)

### [Data Object Name]
\`\`\`typescript
{
  // TypeScript interface
}
\`\`\`

[Repeat for each data type]

---

## 6. Interaction States & Behaviors

### [Component Name]
- **State**: Description
- **State**: Description

[Repeat for interactive components]

---

## 7. Responsive Breakpoints (If Applicable)

If Figma has multiple frames for different screen sizes:

- **Desktop**: 1920×1080
- **Tablet**: 768×1024
- **Mobile**: 375×667

Document layout changes at each breakpoint.

---

## 8. Accessibility Notes

- **Color Contrast**: All text meets WCAG AA standards
- **Focus States**: All interactive elements have visible focus indicators
- **Keyboard Navigation**: Tab order follows visual hierarchy
- **ARIA Labels**: [List components that need ARIA labels]
```

---

## Completion Criteria

✅ You are DONE when:
1. `02_figma_design_data.md` is created and saved
2. All design tokens are extracted and documented
3. Component hierarchy is clearly mapped
4. Data requirements are identified for the Architect
5. Reference code is generated (if available)
6. Interaction states are documented

---

## Next Action

After completing this action:
1. **Notify the Architect**: "Design data extraction complete. Please review `02_figma_design_data.md` and proceed with `act_design_arch`."
2. **Update task.md**: Mark design extraction as complete

---

## Troubleshooting

### Figma MCP Server Not Responding

```bash
# Check if server is running
lsof -i :3845

# If not, start it
figma-developer-mcp --figma-api-key $FIGMA_ACCESS_TOKEN --port 3845
```

### Invalid File ID

- Ensure the Figma URL is correct
- Check that you have access to the file
- Verify the Personal Access Token has correct permissions

### Missing Design Tokens

If Figma file doesn't use Variables:
- Manually extract colors/fonts from component styles
- Look at the most frequently used values
- Document them in the same JSON format
