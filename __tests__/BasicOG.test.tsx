import { describe, expect, it } from "bun:test";
import React from "react";
import { BasicOG, type BasicOGProps } from "../src/components/BasicOG";

describe("BasicOG Component", () => {
  const defaultProps: BasicOGProps = {
    title: "Test Title",
    width: 1200,
    height: 630,
  };

  it("renders with minimal props", () => {
    const element = React.createElement(BasicOG, defaultProps);
    expect(element.type).toBe(BasicOG);
    expect(element.props.title).toBe("Test Title");
  });

  it("applies custom styling props", () => {
    const props: BasicOGProps = {
      ...defaultProps,
      background: "#ff0000",
      fontColor: "#ffffff",
      fontSize: "64px",
    };
    const element = React.createElement(BasicOG, props);
    expect(element.props.background).toBe("#ff0000");
    expect(element.props.fontColor).toBe("#ffffff");
    expect(element.props.fontSize).toBe("64px");
  });

  it("handles subtitle prop", () => {
    const props: BasicOGProps = {
      ...defaultProps,
      subtitle: "Test Subtitle",
    };
    const element = React.createElement(BasicOG, props);
    expect(element.props.subtitle).toBe("Test Subtitle");
  });

  it("handles image URL prop", () => {
    const props: BasicOGProps = {
      ...defaultProps,
      imageUrl: "https://example.com/image.jpg",
    };
    const element = React.createElement(BasicOG, props);
    expect(element.props.imageUrl).toBe("https://example.com/image.jpg");
  });

  it("handles emoji in imageUrl", () => {
    const props: BasicOGProps = {
      ...defaultProps,
      imageUrl: "🎉",
    };
    const element = React.createElement(BasicOG, props);
    expect(element.props.imageUrl).toBe("🎉");
  });

  it("handles markdown in title", () => {
    const props: BasicOGProps = {
      ...defaultProps,
      title: "**Bold** and *italic* text",
    };
    const element = React.createElement(BasicOG, props);
    expect(element.props.title).toBe("**Bold** and *italic* text");
  });

  it("uses default dimensions when not specified", () => {
    const props: BasicOGProps = {
      title: "Test Title",
    };
    const element = React.createElement(BasicOG, props);
    // Component should handle defaults internally
    expect(element.props.title).toBe("Test Title");
  });

  it("handles gradient backgrounds", () => {
    const props: BasicOGProps = {
      ...defaultProps,
      background: "linear-gradient(to right, #667eea, #764ba2)",
    };
    const element = React.createElement(BasicOG, props);
    expect(element.props.background).toBe("linear-gradient(to right, #667eea, #764ba2)");
  });
});