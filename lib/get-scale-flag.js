function percent(n) {
  return parseFloat(n) / 100;
}

// TODO: scaleFlags -> getScaleFlag
export default function getScaleFlag(w, h) {
  w = w.trim() || "-1";
  h = h.trim() || "-1";

  if ((w === "100%" || w === "-1") && (h === "100%" || h === "-1")) {
    return null;
  }

  if (w.endsWith("%")) {
    w = "iw*" + percent(w);
  }
  if (h.endsWith("%")) {
    h = "ih*" + percent(h);
  }

  return `-vf 'scale=${w}:${h}'`;
}
