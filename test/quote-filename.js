import test from "ava";
import quote from "../src/lib/quote-filename.js";

test("leaves a boring filename untouched", (t) => {
  t.is(quote("yas.txt"), "yas.txt");
});

test("escapes a filename with an apostrophe", (t) => {
  t.is(quote("fart's.butt"), "fart\\'s.butt");
});

test("quotes a filename with a space", (t) => {
  t.is(quote("memes on the web.txt"), "'memes on the web.txt'");
});

test("handles a filename with a space and a single quote", (t) => {
  t.is(quote("meme's on the web.txt"), "'meme'\\''s on the web.txt'");
});
