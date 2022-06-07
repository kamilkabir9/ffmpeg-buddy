/* global outputEl, formEl, inputFilenameEl, outputFilenameEl, disableVideoEl, disableAudioEl, scaleWidthEl, scaleHeightEl, framerateEl, rotateEl, startAtEl, endAtEl, copyEl */

import quoteFilename from "./lib/quote-filename.js";
import getScaleFlag from "./lib/get-scale-flag.js";

function render() {
  const inputFilename = inputFilenameEl.value.trim() || "input.mp4";
  const outputFilename = outputFilenameEl.value.trim() || "output.gif";

  const hasVideo = !disableVideoEl.checked;
  const hasAudio = !disableAudioEl.checked;

  let videoFlags = [];
  if (hasVideo) {
    const scaleFlag = getScaleFlag(scaleWidthEl.value, scaleHeightEl.value);
    const framerate = parseInt(framerateEl.value.trim(), 10) || null;
    const rotation = rotateEl.value;
    if (scaleFlag) {
      videoFlags.push(scaleFlag);
    }
    if (framerate) {
      videoFlags.push(`-r ${framerate}`);
    }
    if (rotation !== "no rotation") {
      videoFlags.push(rotation);
    }
  } else {
    videoFlags.push("-vn");
  }

  const startAt = startAtEl.value.trim();
  const endAt = endAtEl.value.trim();

  outputEl.innerText = [
    "ffmpeg",
    "-i",
    quoteFilename(inputFilename),
    ...videoFlags,
    ...(hasAudio ? [] : ["-an"]),
    ...(startAt ? [`-ss '${startAt}'`] : []),
    ...(endAt ? [`-to '${endAt}'`] : []),
    quoteFilename(outputFilename),
  ].join(" ");

  copyEl.textContent = "Copy"; //reset copy button text on input change.

  for (const el of document.getElementsByClassName("needs-video")) {
    if (hasVideo) {
      el.removeAttribute("hidden");
    } else {
      el.setAttribute("hidden", "hidden");
    }
  }
}

formEl.addEventListener("input", () => render());
formEl.addEventListener("change", () => render());
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  render();
});

render();

// Copy ffmpeg build command to clipboard
copyEl.onclick = function () {
  navigator.clipboard.writeText(outputEl.textContent).then(
    function () {
      console.debug("copied to clipboard");
      copyEl.textContent = "Copied";
      setTimeout(() => {
        copyEl.textContent = "Copy";
      }, 1000);
    },
    function () {
      console.error("Error wrtting to clipboard");
    }
  );
};
