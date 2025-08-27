import { marked } from "marked";
import type React from "react";
import twemoji from "twemoji";

export interface BasicOGProps {
	title: string;
	subtitle?: string;
	imageUrl?: string;
	background?: string;
	fontColor?: string;
	fontSize?: string;
	width?: number;
	height?: number;
}

function processImageUrl(imageUrl?: string): React.JSX.Element | null {
	if (!imageUrl) {
		return null;
	}

	if (twemoji.test(imageUrl)) {
		const emojiHtml = twemoji.parse(imageUrl, {
			attributes: () => ({
				style: "width: 100px; height: 100px; object-fit: contain;",
			}),
		});

		const srcMatch = emojiHtml.match(/src="([^"]+)"/);
		if (srcMatch) {
			return (
				<img
					src={srcMatch[1]}
					style={{
						width: "100px",
						height: "100px",
						objectFit: "contain",
						marginBottom: "40px",
					}}
					alt="Emoji"
				/>
			);
		}
	}

	return (
		<img
			src={imageUrl}
			style={{
				maxWidth: "200px",
				maxHeight: "200px",
				marginBottom: "40px",
				objectFit: "contain",
			}}
			alt=""
		/>
	);
}

function processTitle(title?: string): string {
	if (!title) {
		return "";
	}

	// Process markdown in title and strip HTML tags for plain text
	const htmlTitle = marked(title);
	return htmlTitle.replace(/<[^>]*>/g, "").trim();
}

export function BasicOG({
	title,
	subtitle,
	imageUrl,
	background = "#ffffff",
	fontColor = "#000000",
	fontSize = "48px",
	width = 1200,
	height = 630,
}: BasicOGProps) {
	const processedTitle = processTitle(title);
	const imageElement = processImageUrl(imageUrl);

	return (
		<div
			style={{
				width: `${width}px`,
				height: `${height}px`,
				backgroundColor: background,
				color: fontColor,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: "60px",
				textAlign: "center",
				fontFamily: "'Nunito', serif",
				boxSizing: "border-box",
			}}
		>
			{imageElement}

			<h1
				style={{
					fontSize: fontSize,
					fontWeight: "600",
					marginBottom: subtitle ? "20px" : "0",
					marginTop: imageElement ? "0" : "0",
					lineHeight: "1.2",
					maxWidth: "100%",
					wordBreak: "break-word",
				}}
			>
				{processedTitle}
			</h1>

			{subtitle && (
				<h2
					style={{
						fontSize: "24px",
						opacity: 0.8,
						fontWeight: "normal",
						lineHeight: "1.3",
						marginTop: "0",
						marginBottom: "0",
						maxWidth: "100%",
						wordBreak: "break-word",
						fontFamily: "'Open Sans', sans-serif",
					}}
				>
					{subtitle}
				</h2>
			)}
		</div>
	);
}

export default BasicOG;
