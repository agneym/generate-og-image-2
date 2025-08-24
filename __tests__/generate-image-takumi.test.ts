import { describe, expect, it, mock } from "bun:test";
import generateImage from "../src/generate-image";
import type { IViewport, IRepoProps } from "../src/types";

// Mock the Takumi renderer since we can't actually test image generation without proper setup
const mockTakumiRenderer = {
  generateFromComponent: mock(async () => "base64ImageString"),
};

// Mock the getTakumiRenderer function
mock.module("../src/takumi/renderer", () => ({
  getTakumiRenderer: () => mockTakumiRenderer,
}));

describe("Generate Image with Takumi", () => {
  const viewport: IViewport = {
    width: 1200,
    height: 630,
  };

  beforeEach(() => {
    mockTakumiRenderer.generateFromComponent.mockClear();
  });

  it("generates image with basic props", async () => {
    const repoProps: Partial<IRepoProps> = {
      title: "Test Title",
      subtitle: "Test Subtitle",
      background: "#ffffff",
      fontColor: "#000000",
    };

    const result = await generateImage(viewport, repoProps);
    
    expect(mockTakumiRenderer.generateFromComponent).toHaveBeenCalledTimes(1);
    expect(result).toBe("base64ImageString");
  });

  it("handles React component configuration", async () => {
    const repoProps: Partial<IRepoProps> = {
      title: "Test Title",
      component: "./components/CustomComponent.tsx",
      componentName: "CustomComponent",
      customProps: {
        author: "John Doe",
      },
    };

    const result = await generateImage(viewport, repoProps);
    
    expect(mockTakumiRenderer.generateFromComponent).toHaveBeenCalledTimes(1);
    expect(result).toBe("base64ImageString");
  });

  it("handles emoji in imageUrl", async () => {
    const repoProps: Partial<IRepoProps> = {
      title: "Test Title",
      imageUrl: "🎉",
    };

    const result = await generateImage(viewport, repoProps);
    
    expect(mockTakumiRenderer.generateFromComponent).toHaveBeenCalledTimes(1);
    expect(result).toBe("base64ImageString");
  });

  it("handles markdown in title", async () => {
    const repoProps: Partial<IRepoProps> = {
      title: "**Bold** and *italic* text",
    };

    const result = await generateImage(viewport, repoProps);
    
    expect(mockTakumiRenderer.generateFromComponent).toHaveBeenCalledTimes(1);
    expect(result).toBe("base64ImageString");
  });

  it("handles gradient backgrounds", async () => {
    const repoProps: Partial<IRepoProps> = {
      title: "Test Title",
      background: "linear-gradient(to right, #667eea, #764ba2)",
    };

    const result = await generateImage(viewport, repoProps);
    
    expect(mockTakumiRenderer.generateFromComponent).toHaveBeenCalledTimes(1);
    expect(result).toBe("base64ImageString");
  });

  it("throws error when Takumi renderer fails", async () => {
    mockTakumiRenderer.generateFromComponent.mockRejectedValueOnce(new Error("Takumi error"));

    const repoProps: Partial<IRepoProps> = {
      title: "Test Title",
    };

    await expect(generateImage(viewport, repoProps)).rejects.toThrow("Image generation failed: Takumi error");
  });
});