import { parser } from ".";

test("renders an empty doc", () => {
  console.log(`134_server/editor/index.test.ts_rendersAnEmptyDocs`);
  const ast = parser.parse("");

  expect(ast.toJSON()).toEqual({
    content: [{ type: "paragraph" }],
    type: "doc",
  });
});
