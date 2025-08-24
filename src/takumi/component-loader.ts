import React from "react";
import path from "path";
import { BasicOG } from "../components/BasicOG";
import type { IRepoProps } from "../types";

export interface ComponentModule {
  default?: React.ComponentType<any>;
  [key: string]: any;
}

export async function loadComponent(
  componentPath?: string,
  componentName?: string
): Promise<React.ComponentType<any>> {
  // If no component path is specified, use the built-in BasicOG component
  if (!componentPath) {
    return BasicOG;
  }

  try {
    // Resolve absolute path for the component
    const absolutePath = path.resolve(process.cwd(), componentPath);
    
    // Dynamically import the component
    const module = (await import(absolutePath)) as ComponentModule;

    // Return named export if specified, otherwise default export
    if (componentName && module[componentName]) {
      return module[componentName];
    }

    if (module.default) {
      return module.default;
    }

    throw new Error(
      `Component not found: ${componentName || "default"} in ${componentPath}`
    );
  } catch (error) {
    console.error(`Failed to load component from ${componentPath}:`, error);
    console.log("Falling back to built-in BasicOG component");
    return BasicOG;
  }
}

export function createComponentProps(repoProps: Partial<IRepoProps>): any {
  // Map repo props to component props
  const baseProps = {
    title: repoProps.title || "",
    subtitle: repoProps.subtitle,
    imageUrl: repoProps.imageUrl,
    background: repoProps.background,
    fontColor: repoProps.fontColor,
    fontSize: repoProps.fontSize,
    width: Number(repoProps.width) || 1200,
    height: Number(repoProps.height) || 630,
  };

  // Merge with custom props if provided
  if (repoProps.customProps) {
    return { ...baseProps, ...repoProps.customProps };
  }

  return baseProps;
}

export function isReactComponentConfig(config: Partial<IRepoProps>): boolean {
  return "component" in config && !("componentUrl" in config);
}

export function isLegacyWebComponentConfig(config: Partial<IRepoProps>): boolean {
  return "componentUrl" in config && !("component" in config);
}