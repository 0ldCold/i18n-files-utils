import { flattenObj, unflattenObj } from "./objectTransforms";

describe("translationFileUtils", () => {
  test("flattenObj", () => {
    expect(
      flattenObj({
        a1: "str",
        b1: 1,
        c1: {
          a2: "str",
          b2: 2,
          c2: {
            a1: "str",
            b3: 3
          }
        }
      })
    ).toStrictEqual({
      a1: "str",
      b1: 1,
      "c1.a2": "str",
      "c1.b2": 2,
      "c1.c2.a1": "str",
      "c1.c2.b3": 3
    });
  });
  test("unflattenObj", () => {
    expect(
      unflattenObj({
        a1: "str",
        b1: 1,
        "c1.a2": "str",
        "c1.b2": 2,
        "c1.c2.a1": "str",
        "c1.c2.b3": 3
      })
    ).toStrictEqual({
      a1: "str",
      b1: 1,
      c1: {
        a2: "str",
        b2: 2,
        c2: {
          a1: "str",
          b3: 3
        }
      }
    });
  });
});
