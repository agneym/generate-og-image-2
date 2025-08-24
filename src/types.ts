export interface IFileProps {
	filename: string;
	attributes: Partial<IRepoProps>;
}

export interface IProps {
	title: string;
	subtitle: string;
	filename: string;
	imageUrl: string;
	background: string;
	fontColor: string;
	fontSize: string;
}

// New React component configuration
export interface IReactComponentConfig {
	component?: string; // Path to React component (optional for backward compatibility)
	componentName?: string; // Named export (defaults to default export)
	customProps?: Record<string, any>; // Additional props to pass to component
}

export interface IFrontMatter {
	ogImage: IProps & IReactComponentConfig;
}

export interface IRepoProps extends IProps, IReactComponentConfig {
	assetPath: string;
	commitMsg: string;
	componentUrl?: string; // Legacy web component URL (deprecated)
	width: string | number;
	height: string | number;
	botComments: string;
	ignorePatterns: string[];
}

export interface IViewport {
	width: string | number;
	height: string | number;
}
