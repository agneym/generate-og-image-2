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

export interface IReactComponentConfig {
	component?: string;
	componentName?: string;
	customProps?: Record<string, any>;
}

export interface IFrontMatter {
	ogImage: IProps & IReactComponentConfig;
}

export interface IRepoProps extends IProps, IReactComponentConfig {
	assetPath: string;
	commitMsg: string;
	componentUrl?: string;
	width: string | number;
	height: string | number;
	botComments: string;
	ignorePatterns: string[];
}

export interface IViewport {
	width: string | number;
	height: string | number;
}
