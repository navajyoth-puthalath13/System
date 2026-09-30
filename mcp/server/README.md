# MCP server (planned — not implemented)

This directory is reserved for a future Model Context Protocol server that exposes the
design system to AI tools. **It is intentionally empty of implementation.**

The server will consume the **structured registry** (`registry/*.json`) and component
`schema.json` files — never parse arbitrary MDX at runtime — so it can answer queries
deterministically. Planned tools:

```text
list_components()
get_component(name)
get_component_schema(name)
get_component_tokens(name)
get_component_accessibility(name)
get_token(name)
search_design_system(query)
```

Because the architecture already separates facts (JSON), implementation (TSX), knowledge
(MDX), structure (JSON Schema), and relationships (registry JSON), adding this server later
requires no restructuring — only a thin adapter over `registry/`.
