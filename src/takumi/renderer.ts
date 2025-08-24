import { Renderer } from "@takumi-rs/core";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import React from "react";
import type { IViewport } from "../types";

export class TakumiImageGenerator {
  private renderer: Renderer;

  constructor() {
    this.renderer = new Renderer({
      fonts: [], // TODO: Add system fonts if needed
      persistentImages: [],
    });
  }

  async generateFromComponent(
    component: React.ReactElement,
    viewport: IViewport
  ): Promise<string> {
    try {
      // Convert React component to Takumi node
      const node = await fromJsx(component);
      
      // Render the node to image buffer
      const imageBuffer = await this.renderer.renderAsync(node, {
        width: Number(viewport.width),
        height: Number(viewport.height),
        format: "WebP" as any, // Takumi output format
      });

      // Convert buffer to base64 string for compatibility with existing code
      return Buffer.from(imageBuffer).toString("base64");
    } catch (error) {
      console.error("Error generating image with Takumi:", error);
      throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async dispose(): Promise<void> {
    // Cleanup if needed (Takumi renderer should handle cleanup automatically)
  }
}

// Singleton instance for reuse
let rendererInstance: TakumiImageGenerator | null = null;

export function getTakumiRenderer(): TakumiImageGenerator {
  if (!rendererInstance) {
    rendererInstance = new TakumiImageGenerator();
  }
  return rendererInstance;
}

export async function disposeTakumiRenderer(): Promise<void> {
  if (rendererInstance) {
    await rendererInstance.dispose();
    rendererInstance = null;
  }
}