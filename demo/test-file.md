---
title: Just hack'n
description: Nothing to see here
ogImage:
  title: Generating *open graph* images with Github Actions
  subtitle: Images for your blog with React Components
  imageUrl: "🥳"
  fileName: this-file
  background: "linear-gradient(to right, #667eea, #764ba2)"
  fontColor: "#ffffff"
  fontSize: "52px"
  # component: "./custom-components/MyOGComponent.tsx"  # Optional: custom React component
  # componentName: "MyOGComponent"  # Optional: named export
  # customProps:  # Optional: additional props for custom component
  #   authorName: "John Doe"
  #   tags: ["react", "takumi", "og-images"]
---

This is some text about some stuff that happened sometime ago. Long time ago.

## Migration to Takumi

This demo now uses Takumi for image generation instead of Puppeteer, providing:
- Better performance with native Rust rendering
- No Chrome dependency (smaller Docker images)
- React component-based image generation
- Type-safe component props
