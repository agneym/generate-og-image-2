import { describe, expect, it } from "bun:test";
import { 
  loadComponent, 
  createComponentProps, 
  isReactComponentConfig,
  isLegacyWebComponentConfig 
} from "../src/takumi/component-loader";
import { BasicOG } from "../src/components/BasicOG";
import type { IRepoProps } from "../src/types";

describe("Component Loader", () => {
  describe("loadComponent", () => {
    it("returns BasicOG when no component path is specified", async () => {
      const Component = await loadComponent();
      expect(Component).toBe(BasicOG);
    });

    it("falls back to BasicOG when component path is invalid", async () => {
      const Component = await loadComponent("./nonexistent-component.tsx");
      expect(Component).toBe(BasicOG);
    });
  });

  describe("createComponentProps", () => {
    it("maps repo props to component props", () => {
      const repoProps: Partial<IRepoProps> = {
        title: "Test Title",
        subtitle: "Test Subtitle",
        background: "#ffffff",
        fontColor: "#000000",
        fontSize: "48px",
        width: 1200,
        height: 630,
        imageUrl: "https://example.com/image.jpg",
      };

      const componentProps = createComponentProps(repoProps);
      
      expect(componentProps.title).toBe("Test Title");
      expect(componentProps.subtitle).toBe("Test Subtitle");
      expect(componentProps.background).toBe("#ffffff");
      expect(componentProps.fontColor).toBe("#000000");
      expect(componentProps.fontSize).toBe("48px");
      expect(componentProps.width).toBe(1200);
      expect(componentProps.height).toBe(630);
      expect(componentProps.imageUrl).toBe("https://example.com/image.jpg");
    });

    it("handles missing title", () => {
      const repoProps: Partial<IRepoProps> = {};
      const componentProps = createComponentProps(repoProps);
      expect(componentProps.title).toBe("");
    });

    it("merges custom props", () => {
      const repoProps: Partial<IRepoProps> = {
        title: "Test Title",
        customProps: {
          authorName: "John Doe",
          tags: ["react", "takumi"],
        },
      };

      const componentProps = createComponentProps(repoProps);
      
      expect(componentProps.title).toBe("Test Title");
      expect(componentProps.authorName).toBe("John Doe");
      expect(componentProps.tags).toEqual(["react", "takumi"]);
    });

    it("handles numeric width and height", () => {
      const repoProps: Partial<IRepoProps> = {
        title: "Test",
        width: "1200",
        height: "630",
      };

      const componentProps = createComponentProps(repoProps);
      
      expect(componentProps.width).toBe(1200);
      expect(componentProps.height).toBe(630);
    });

    it("uses default dimensions when not provided", () => {
      const repoProps: Partial<IRepoProps> = {
        title: "Test",
      };

      const componentProps = createComponentProps(repoProps);
      
      expect(componentProps.width).toBe(1200);
      expect(componentProps.height).toBe(630);
    });
  });

  describe("Configuration detection", () => {
    it("detects React component configuration", () => {
      const config: Partial<IRepoProps> = {
        component: "./components/MyComponent.tsx",
        title: "Test",
      };

      expect(isReactComponentConfig(config)).toBe(true);
      expect(isLegacyWebComponentConfig(config)).toBe(false);
    });

    it("detects legacy web component configuration", () => {
      const config: Partial<IRepoProps> = {
        componentUrl: "https://example.com/component.js",
        title: "Test",
      };

      expect(isReactComponentConfig(config)).toBe(false);
      expect(isLegacyWebComponentConfig(config)).toBe(true);
    });

    it("handles configuration with neither component nor componentUrl", () => {
      const config: Partial<IRepoProps> = {
        title: "Test",
      };

      expect(isReactComponentConfig(config)).toBe(false);
      expect(isLegacyWebComponentConfig(config)).toBe(false);
    });
  });
});