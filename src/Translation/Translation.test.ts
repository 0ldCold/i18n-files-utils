import { mergeTranslation } from "./utils";

describe("Translation", () => {
  test("utils", () => {
    expect(
      mergeTranslation(
        {
          a: "a",
          b: "b"
        },
        {
          c: "c",
          d: "d"
        }
      )
    ).toStrictEqual({
      a: "a",
      b: "b",
      c: "c",
      d: "d"
    });

    expect(
      mergeTranslation(
        {
          a: "a",
          b: "b1"
        },
        {
          b: "b2",
          c: "c"
        }
      )
    ).toStrictEqual({
      a: "a",
      b: "b2",
      c: "c"
    });
  });
});
