import { type OutputFormat, Renderer } from "@takumi-rs/core";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import type React from "react";
import type { IViewport } from "../types";

export class TakumiImageGenerator {
	private renderer: Renderer;

	constructor() {
		this.renderer = new Renderer({
			fonts: [],
			persistentImages: [],
		});
	}

	async generateFromComponent(
		component: React.ReactElement,
		viewport: IViewport,
	): Promise<string> {
		try {
			const node = await fromJsx(component);

			const imageBuffer = await this.renderer.renderAsync(node, {
				width: Number(viewport.width),
				height: Number(viewport.height),
				format: "WebP" as OutputFormat,
			});

			return Buffer.from(imageBuffer).toString("base64");
		} catch (error) {
			console.error("Error generating image:", error);
			throw new Error(
				`Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}
}

let rendererInstance: TakumiImageGenerator | null = null;

export function getTakumiRenderer(): TakumiImageGenerator {
	if (!rendererInstance) {
		rendererInstance = new TakumiImageGenerator();
	}
	return rendererInstance;
}
