# Open Graph Image Generator

![](https://github.com/BoyWithSilverWings/generate-og-image/workflows/Run%20tests/badge.svg)

A GitHub Action that generates Open Graph images from your markdown files using React components and Takumi. Fast, lightweight, and no Chrome dependency required.

✨ **New in v4.0**: Migrated from Puppeteer to Takumi for better performance, smaller Docker images, and React component support!

I built this because I was tired of either having no OG images or manually creating them for every post. This just automates it based on your existing markdown.

## Setup

Add to your workflow:

```yml
name: "Generate OG Images"
on: pull_request

jobs:
  generate_og_job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: BoyWithSilverWings/generate-og-image@4.0.0  # ✨ New: Faster with Takumi!
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GITHUB_CONTEXT: ${{ toJson(github) }}
        with:
          path: src/images/post-images/
          ignorePatterns: "/README.md,/CHANGELOG.md"  # Optional: customize ignored files
```

Then add to your markdown frontmatter:

```md
---
ogImage:
  title: "Things you don't know"
  subtitle: "There must be something"
  imageUrl: "https://example.com/image-url.jpg"
  background: "yellow"
  fontColor: "rgb(0, 0, 0)"
  fontSize: "100%"
  # ✨ New: React component support (optional)
  # component: "./components/MyOGComponent.tsx"
  # componentName: "MyOGComponent"  # for named exports
---
```

## Configuration

### Frontmatter Props

| Props         | Description                         | Required |      Default      |
| ------------- | ----------------------------------- | :------: | :---------------: |
| title         | Title text                          |          |                   |
| subtitle      | Subtitle text                       |          |                   |
| imageUrl      | Image or emoji URL                  |          |                   |
| background    | Background color/gradient/image     |          |                   |
| fontColor     | Text color                          |          |                   |
| fontSize      | Font size                           |          |       100%        |
| fileName      | Output filename                     |          | kebab-cased title |
| component     | ✨ Path to React component TSX file |          |    Built-in BasicOG    |
| componentName | ✨ Named export (optional)          |          |   default export  |

Works with PRs and `.md`/`.mdx` files.

### Repository Props

Configure in your workflow file:

| Props            | Description                      | Required |         Default         |
| ---------------- | -------------------------------- | :------: | :---------------------: |
| path             | Where to save images             |    ✅    |                         |
| commitMsg        | Commit message                   |          |                         |
| background       | Default background               |          |                         |
| fontColor        | Default text color               |          |                         |
| fontSize         | Default font size                |          |                         |
| component        | ✨ Path to React component        |          |    Built-in BasicOG     |
| componentName    | ✨ Named export for component    |          |   default export        |
| componentUrl     | ⚠️ Legacy web component (deprecated) |          |                         |
| botComments      | Disable comments (`"no"`)        |          |                         |
| ignorePatterns   | Files to ignore (globs)          |          |      `/README.md`       |

Frontmatter overrides repository settings.

## Examples

**Gradient background:**

```yaml
background: "linear-gradient(to right, #ec008c, #fc6767)"
```

**Image background:**

```yaml
background: "url(https://example.com/image.png)"
```

**Emoji instead of image:**

```yaml
imageUrl: "🚀"
```

**Disable bot comments:**

```yaml
botComments: "no"
```

## File Filtering

By default, the action ignores `/README.md` to prevent generating OG images for repository documentation. You can customize which files to ignore using glob patterns.

### Basic Usage

```yaml
- uses: BoyWithSilverWings/generate-og-image@3.0.0
  with:
    ignorePatterns: "/README.md,/CHANGELOG.md"
```

### Pattern Examples

| Pattern | Description | Example Matches |
|---------|-------------|-----------------|
| `/README.md` | Exact file at root | `/README.md` |
| `**/README.md` | README.md in any directory | `/docs/README.md`, `/src/README.md` |
| `**/*.config.md` | All .config.md files | `/webpack.config.md`, `/jest.config.md` |
| `docs/**` | All files in docs directory | `/docs/api.md`, `/docs/guides/setup.md` |
| `{README,CHANGELOG}.md` | Multiple specific files | `/README.md`, `/CHANGELOG.md` |

### Common Use Cases

**Ignore documentation files:**
```yaml
ignorePatterns: "/README.md,/CHANGELOG.md,/LICENSE.md"
```

**Ignore entire directories:**
```yaml
ignorePatterns: "docs/**,examples/**"
```

**Ignore AI assistant files:**
```yaml
ignorePatterns: "/CLAUDE.md,/GPT.md,**/*.prompt.md"
```

**Process all files (disable filtering):**
```yaml
ignorePatterns: ""
```

## ✨ Performance Improvements (v4.0)

The migration to Takumi brings significant performance improvements:

- **Faster execution**: Native Rust rendering without Chrome overhead
- **Smaller footprint**: ~200MB reduction by removing Chrome dependency  
- **Better reliability**: No browser crashes or timeouts
- **Type safety**: Full TypeScript support with React components
- **Node.js action**: Faster startup compared to Docker-based actions

### Before vs After

| Metric | v3.x (Puppeteer) | v4.x (Takumi) | Improvement |
|--------|------------------|---------------|-------------|
| Action startup | ~30s (Docker) | ~5s (Node.js) | 6x faster |
| Image generation | ~3s/image | ~1s/image | 3x faster |
| Memory usage | ~500MB | ~100MB | 5x reduction |
| Dependencies | Chrome + Node.js | Native Rust | Simplified |

## Customization

### React Components (✨ New in v4.0)

The action now uses React components powered by Takumi for image generation. The built-in `BasicOG` component handles most use cases, but you can create custom components:

```tsx
// components/MyOGComponent.tsx
import React from "react";

interface MyOGProps {
  title: string;
  subtitle?: string;
  background?: string;
  // ... other props
}

export default function MyOGComponent({ title, subtitle, background }: MyOGProps) {
  return (
    <div style={{ 
      width: 1200, 
      height: 630, 
      backgroundColor: background,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '48px' }}>{title}</h1>
      {subtitle && <h2 style={{ fontSize: '24px' }}>{subtitle}</h2>}
    </div>
  );
}
```

Then reference it in your frontmatter:

```yaml
ogImage:
  title: "My Custom Post"
  component: "./components/MyOGComponent.tsx"
```

### Legacy Web Components (⚠️ Deprecated)

Web components are still supported but deprecated. The default web component is [here](https://github.com/BoyWithSilverWings/og-image-element). Replace it with your own:

```yaml
componentUrl: "https://your-custom-component.js"
```

**Migration recommended:** Switch to React components for better performance and type safety.

## Contributing

See [docs](./docs/contributors.md)

## Credits

- [Takumi](https://takumi.kane.tw/) - Rust-based image generation
- [Vercel OG Image](https://github.com/zeit/og-image) - Original inspiration
- [Vercel NCC](https://github.com/vercel/ncc) - Build tooling
- [GitHub Image Actions](https://github.com/calibreapp/image-actions) - GitHub Actions patterns
