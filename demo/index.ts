import { Canvas } from "../src/canvas";
import { RepeatedText } from "../src/line";
import { Range } from "../src/utils";

const hash = window.location.hash.replace("#access_token=", "");
if (hash) {
  const token = hash.split("&")[0];
  sessionStorage.setItem("token", token);
  window.location.hash = "";
}

let token = sessionStorage.getItem("token");
if (token) {
  document.querySelector("header").remove();
}

window.addEventListener("load", () => {
  const canvas = new Canvas(document.getElementsByTagName("canvas")[0]);
  const lines: RepeatedText[] = [];

  for (let i of Range(Math.ceil(canvas.height / 100))) {
    const line = canvas
      .addRepeatedText(0, 120 * (i + 1))
      // .setText(new TextFragment("ONLINE ", "Kanit", 150, "#ffffff22"))
      .setText("ONLINE ")
      .setFont("Kanit")
      .setFontSize(150)
      .setFontColor("#ffffff22")
      .scroll(i % 2 ? -0.5 : 0.5);
    lines.push(line);
  }

  if (token) {
    let currentTrack = null;
    setInterval(() => {
      fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (currentTrack !== json.item.id) {
            currentTrack = json.item.id;
            const trackInfo = [
              json.item.artists.map((artist) => artist.name).join(" & "),
              json.item.name,
            ];
            lines.forEach((line, i) => {
              line.setText(trackInfo[i % 2].toUpperCase() + " ");
            });
          }
        });
    }, 2000);
  }
});
