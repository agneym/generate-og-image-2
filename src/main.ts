#!/usr/bin/env node
import { warning } from "@actions/core";
import commentMarkdown from "./comment-markdown";
import commitFile from "./commit-file";
import { GITHUB_EVENT_NAME, GITHUB_TOKEN } from "./constants";
import createComment from "./create-comment";
import findFile from "./find-file";
import generateHtml from "./generate-html";
import generateImage from "./generate-image";
import getRepoProps from "./repo-props";
import { isLegacyWebComponentConfig } from "./takumi/component-loader";

if (!GITHUB_TOKEN) {
	console.log("You must enable the GITHUB_TOKEN secret");
	process.exit(1);
}

async function run() {
	// Bail out if the event that executed the action wasn’t a pull_request
	if (GITHUB_EVENT_NAME !== "pull_request") {
		console.log("This action only runs for pushes to PRs");
		process.exit(78);
	}

	const repoProps = await getRepoProps();
	const fileProperties = await findFile(repoProps.ignorePatterns);

	if (!fileProperties.length) {
		warning("No compatible files found");
	}

	fileProperties.forEach(async (property) => {
		const mergedProps = {
			...repoProps,
			...property.attributes,
		};

		// Check if this is a legacy web component configuration
		if (isLegacyWebComponentConfig(mergedProps)) {
			console.warn(`Legacy web component detected for ${property.filename}. Consider migrating to React components.`);
			
			// Use legacy HTML generation for backward compatibility
			const html = generateHtml(mergedProps);
			
			// This would require keeping the old Puppeteer logic, but for now we'll error
			throw new Error("Legacy web components are no longer supported. Please migrate to React components.");
		}

		// Use new React component-based image generation
		const image = await generateImage(
			{
				width: repoProps.width,
				height: repoProps.height,
			},
			mergedProps
		);

		commitFile(image, repoProps, property.filename);

		if (repoProps.botComments !== "no") {
			const markdown = commentMarkdown(
				`${repoProps.assetPath}${property.filename}`,
			);
			await createComment(markdown);
		}
	});
}

run();
