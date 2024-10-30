import mut from "./module";

test("Testing sum -- success", () => {
  expect(mut.sum(12, 18)).toBe(30);
  expect(mut.sum(0, 18)).toBe(18);
  expect(mut.sum(12, 0)).toBe(12);
  expect(mut.sum(0, 0)).toBe(0);
  expect(mut.sum(-12, 18)).toBe(6);
  expect(mut.sum(-12, -18)).toBe(-30);
  expect(mut.sum(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  expect(mut.sum(Infinity, 1)).toBe(Infinity);
  expect(mut.sum(-Infinity, 1)).toBe(-Infinity);
  expect(mut.sum(NaN, 18)).toBeNaN();
});

test("Testing div -- success", () => {
  expect(mut.div(12, 4)).toBe(3);
  expect(mut.div(0, 4)).toBe(0);
  expect(mut.div(12, -4)).toBe(-3);
  expect(mut.div(-12, -4)).toBe(3);
  expect(mut.div(0, -4)).toBe(-0);
  expect(mut.div(Infinity, 2)).toBe(Infinity);
  expect(mut.div(-Infinity, -2)).toBe(Infinity);
  expect(mut.div(0, Infinity)).toBe(0);
  expect(() => div(12, 0)).toThrow('');
});

test("Testing containsNumbers -- success", () => {
  expect(mut.containsNumbers("HelloWorld123")).toBe(true);
  expect(mut.containsNumbers("Hello World!")).toBe(false);
  expect(mut.containsNumbers("")).toBe(false);
  expect(mut.containsNumbers("123")).toBe(true);
  expect(
    mut.containsNumbers(
      `\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0A\x0B\x0C\x0D\x0E\x0F\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1A\x1B\x1C\x1D\x1E\x1F !"#$%&'()*+,-./:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~\x7F`
    )
  ).toBe(false);
});
