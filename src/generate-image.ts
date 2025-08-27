import React from "react";
import { createComponentProps, loadComponent } from "./takumi/component-loader";
import { getTakumiRenderer } from "./takumi/renderer";
import type { IRepoProps, IViewport } from "./types";

async function generateImage(
	viewport: IViewport,
	repoProps: Partial<IRepoProps>,
) {
	try {
		const Component = await loadComponent(
			repoProps.component,
			repoProps.componentName,
		);

		const componentProps = createComponentProps(repoProps);

		const element = React.createElement(Component, componentProps);

		const renderer = getTakumiRenderer();
		const image = await renderer.generateFromComponent(element, viewport);

		return image;
	} catch (error) {
		console.error("Error generating image:", error);
		throw new Error(
			`Image generation failed: ${error instanceof Error ? error.message : "Unknown error"}`,
		);
	}
}

export default generateImage;
