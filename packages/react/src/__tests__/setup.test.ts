import "../__tests__/setup";

describe("Test Setup", () => {
  test("mocks are properly configured", () => {
    expect(global.localStorage).toBeDefined();
    expect(global.ResizeObserver).toBeDefined();
    expect(global.URL.createObjectURL).toBeDefined();
    expect(window.matchMedia).toBeDefined();
  });

  test("mermaid mock is working", () => {
    const mermaid = require("mermaid");
    expect(mermaid.default.initialize).toBeDefined();
    expect(mermaid.default.render).toBeDefined();
    expect(mermaid.default.mermaidAPI).toBeDefined();
  });
});
