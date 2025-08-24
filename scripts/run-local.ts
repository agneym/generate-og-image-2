#!/usr/bin/env bun
/**
 * Local development script to run OG image generation without Docker
 * Usage: bun run scripts/run-local.ts
 */

import { resolve } from "path";

// Set up environment variables for local testing
process.env.GITHUB_TOKEN = process.env.GITHUB_TOKEN || "dummy-token-for-local";
process.env.GITHUB_EVENT_NAME = "pull_request";
process.env.GITHUB_WORKSPACE = resolve(process.cwd());

// Mock GitHub context for local development
process.env.GITHUB_REPOSITORY = "test/repo";
process.env.GITHUB_REF = "refs/pull/1/merge";
process.env.GITHUB_SHA = "abc123";

// Set default inputs (can be overridden via environment variables)
process.env.INPUT_PATH = process.env.INPUT_PATH || "demo/";
process.env.INPUT_COMMITMSG = process.env.INPUT_COMMITMSG || "Generated OG image locally";
process.env.INPUT_BACKGROUND = process.env.INPUT_BACKGROUND || "#667eea";
process.env.INPUT_FONTCOLOR = process.env.INPUT_FONTCOLOR || "#ffffff";
process.env.INPUT_FONTSIZE = process.env.INPUT_FONTSIZE || "48px";
process.env.INPUT_WIDTH = process.env.INPUT_WIDTH || "1200";
process.env.INPUT_HEIGHT = process.env.INPUT_HEIGHT || "630";
process.env.INPUT_BOTCOMMENTS = process.env.INPUT_BOTCOMMENTS || "no";
process.env.INPUT_IGNOREPATTERNS = process.env.INPUT_IGNOREPATTERNS || "/README.md";

console.log("🚀 Running OG Image Generator locally with Bun...");
console.log("📁 Working directory:", process.cwd());
console.log("🎨 Using Takumi for image generation");

// Import and run the main action
try {
  await import("../src/main.ts");
  console.log("✅ OG Image generation completed successfully!");
} catch (error) {
  console.error("❌ Error running OG Image generator:", error);
  process.exit(1);
}