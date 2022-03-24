import test from "ava";
import scale from "../src/lib/get-scale-flag.js";

test("does nothing if inputs are -1 or 100%", (t) => {
  t.is(scale("100%", "100%"), null);
  t.is(scale("-1", "-1"), null);
  t.is(scale("-1", "100%"), null);
  t.is(scale("100%", "-1"), null);
});

test("can handle a % and -1", (t) => {
  t.is(scale("55.123%", "-1"), "-vf 'scale=iw*0.55123:-1'");
});

test("can handle a -1 and %", (t) => {
  t.is(scale("-1", "55.123%"), "-vf 'scale=-1:ih*0.55123'");
});

test("can handle two percentages", (t) => {
  t.is(scale("50%", "25%"), "-vf 'scale=iw*0.5:ih*0.25'");
});

test("can handle a number and -1", (t) => {
  t.is(scale("320", "-1"), "-vf 'scale=320:-1'");
});

test("can handle -1 and a number", (t) => {
  t.is(scale("-1", "320"), "-vf 'scale=-1:320'");
});

test("can handle two numbers", (t) => {
  t.is(scale("666", "420"), "-vf 'scale=666:420'");
});
