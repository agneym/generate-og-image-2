import React from "react";
import { getTakumiRenderer } from "./takumi/renderer";
import { loadComponent, createComponentProps } from "./takumi/component-loader";
import type { IViewport, IRepoProps } from "./types";

async function generateImage(viewport: IViewport, repoProps: Partial<IRepoProps>) {
	try {
		// Load the React component (falls back to BasicOG if not specified)
		const Component = await loadComponent(repoProps.component, repoProps.componentName);
		
		// Create props for the component
		const componentProps = createComponentProps(repoProps);
		
		// Create React element
		const element = React.createElement(Component, componentProps);
		
		// Get Takumi renderer and generate image
		const renderer = getTakumiRenderer();
		const image = await renderer.generateFromComponent(element, viewport);
		
		return image;
	} catch (error) {
		console.error("Error generating image:", error);
		throw new Error(`Image generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
	}
}

export default generateImage;
