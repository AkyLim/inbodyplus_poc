
import json
import sys

def rgba_to_hex(color):
    r = int(color.get('r', 0) * 255)
    g = int(color.get('g', 0) * 255)
    b = int(color.get('b', 0) * 255)
    return f"#{r:02X}{g:02X}{b:02X}"

def parse_node(node, depth=0, colors=None, fonts=None):
    if colors is None: colors = set()
    if fonts is None: fonts = set()
    
    # Extract Colors
    if 'fills' in node:
        for fill in node['fills']:
            if fill.get('type') == 'SOLID' and fill.get('visible', True):
                colors.add(rgba_to_hex(fill['color']))
    if 'strokes' in node:
        for stroke in node['strokes']:
            if stroke.get('type') == 'SOLID' and stroke.get('visible', True):
                colors.add(rgba_to_hex(stroke['color']))
                
    # Extract Fonts
    if node.get('type') == 'TEXT' and 'style' in node:
        s = node['style']
        font_info = f"{s.get('fontFamily')} {s.get('fontWeight')} {s.get('fontSize')}px"
        fonts.add(font_info)
        
    children_txt = ""
    if 'children' in node:
        for child in node['children']:
            c_txt, _, _ = parse_node(child, depth + 1, colors, fonts)
            children_txt += c_txt

    indent = "  " * depth
    node_type = node.get('type')
    name = node.get('name')
    
    # Dimensions
    bbox = node.get('absoluteBoundingBox', {})
    w = bbox.get('width', 0)
    h = bbox.get('height', 0)
    dim_str = f"[{int(w)}x{int(h)}]" if w and h else ""
    
    # Layout info
    layout_info = []
    if node.get('layoutMode'):
        layout_info.append(f"Layout: {node['layoutMode']}")
    if node.get('itemSpacing'):
        layout_info.append(f"Gap: {node['itemSpacing']}")
    if node.get('paddingLeft'):
        layout_info.append(f"Pad: {node.get('paddingTop')}/{node.get('paddingRight')}/{node.get('paddingBottom')}/{node.get('paddingLeft')}")
        
    info_str = f"{dim_str} ({', '.join(layout_info)})" if layout_info else dim_str
    
    tree_line = f"{indent}- **{name}** ({node_type}) {info_str}\n"
    
    return tree_line + children_txt, colors, fonts

def run():
    try:
        with open('figma_raw.json', 'r') as f:
            data = json.load(f)
            
        nodes = data.get('nodes', {})
        root_key = list(nodes.keys())[0]
        root_doc = nodes[root_key]['document']
        
        tree_md, colors, fonts = parse_node(root_doc)
        
        md_output = f"""# Figma Design Data
        
## Design Source
- **Root Node ID**: {root_key}
- **Root Name**: {root_doc.get('name')}

---

## 1. Design Tokens

### Colors
```json
{json.dumps(list(colors), indent=2)}
```

### Typography
```json
{json.dumps(list(fonts), indent=2)}
```

---

## 2. Component Structure

### Hierarchy
{tree_md}

---

## 3. Layout Data (Root Frame)
- **Size**: {root_doc.get('absoluteBoundingBox', {})}
- **BackgroundColor**: {root_doc.get('backgroundColor')}
- **LayoutMode**: {root_doc.get('layoutMode', 'NONE')}

"""
        with open('.agent/specs/02_figma_design_data.md', 'w') as f:
            f.write(md_output)
            
        print("Successfully generated design data.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    run()
