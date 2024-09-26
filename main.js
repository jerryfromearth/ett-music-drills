// read and parse BallLauncherSettings.template.json

function appendNewItem(title, bpm, dataName) {
  if (bpm > maxBPM) bpm /= 2;
  const secondsPerLaunch = 60 / bpm - 0.2;

  const fh = JSON.parse(JSON.stringify(fhTemplate)); // deep clone
  fh.speedAndRate.raw.secondsPerLaunch = secondsPerLaunch.toString();
  fh.DataName = `${dataName} FH`;
  settings.shots.data[`${title}FH`] = fh;

  const bh = JSON.parse(JSON.stringify(bhTemplate)); // deep clone
  bh.speedAndRate.raw.secondsPerLaunch = secondsPerLaunch.toString();
  bh.DataName = `${dataName} BH`;
  settings.shots.data[`${title}BH`] = bh;
}

const fs = require("fs");

const template = fs.readFileSync(
  "./BallLauncherSettings.template.json",
  "utf8"
);
const settings = JSON.parse(template);
console.log(settings);

const minBPM = 40;
const maxBPM = 100;

const fhTemplate = settings.shots.data["FHTemplate"];
const bhTemplate = settings.shots.data["BHTemplate"];

const exampleSongs = [
  { name: "Holding out for a hero", bpm: 149 },
  { name: "Viva La vida", bpm: 138 },
  { name: "Stayin' alive", bpm: 104 },
  { name: "Eye of the tiger", bpm: 109 },
  { name: "Dancing on My Own", bpm: 117 },
  { name: "Closer", bpm: 137 },
];

for (let i = 0; i < exampleSongs.length; i++) {
  let song = exampleSongs[i];
  appendNewItem(`Example${i}`, song.bpm, `${song.name}(${song.bpm})`);
}

for (let bpm = minBPM; bpm <= maxBPM; bpm += 0.5) {
  appendNewItem(`BPM${bpm}`, bpm, `${bpm} | ${bpm * 2} BPM`);
}

delete settings.shots.data["FHTemplate"];
delete settings.shots.data["BHTemplate"];

// write settings to BallLauncherSettings.json

fs.writeFileSync(
  "./BallLauncherSettings.json",
  JSON.stringify(settings, null, 2)
);
