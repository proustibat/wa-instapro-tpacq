/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

// You can write your WorkAdventure script here, if any.
// The "WA" global object is available from anywhere.
console.log('Script started successfully');
// WA.openCoWebSite('https://workadventu.re');
// WA.sendChatMessage('Hello you!', 'Tpacq bot');

/**
 * TYPES
 */
type Popup = {
  close: () => void;
};
type ButtonClickedCallback = (popup: Popup) => void;
type ButtonDescriptor = {
  label: string;
  className?:
    | 'normal'
    | 'primary'
    | 'success'
    | 'warning'
    | 'error'
    | 'disabled';
  callback: ButtonClickedCallback;
};
declare type SoundConfig = {
  volume?: number;
  loop?: boolean;
  rate?: number;
  detune?: number;
  delay?: number;
  seek?: number;
  mute?: boolean;
};
declare class Sound {
  play(soundConfig: SoundConfig | undefined): void;
  stop(): void;
}

/**
 * WorkAdventureApi
 */
const { openPopup, onEnterZone, onLeaveZone, loadSound } = WA as any;

/**
 * SOUNDS MANAGEMENT
 */
const soundConfig: SoundConfig = {
  volume: 1,
  loop: false,
  rate: 1,
  detune: 1,
  delay: 0,
  seek: 0,
  mute: false,
};
const trackPath = 'assets/music';
const tracks = [
  {
    title: 'Worakls - Elea',
    fileName: 'worakls_elea.mp3',
  },
  {
    title: 'Parra for Cuva - Luhya (Original Mix)',
    fileName: 'parra-for-cuva_luhya_original-mix.mp3',
  },
  {
    title: 'Cymande - Brothers On The Slide',
    fileName: 'cymande_brothers-on-the-slide.mp3',
  },
  {
    title: 'Zeigest - Wrecked Metal',
    fileName: 'zeigest_wrecked-metal.mp3',
  },
  {
    title: 'Fadoul - Bsslama Habiti',
    fileName: 'fadoul_bsslama-habiti.mp3',
  },
  {
    title: 'The Knife - Pass This On (Deep Cuts 03)',
    fileName: 'the-knife_pass-this-on.mp3',
  },
  {
    title: 'Kompromat - Niemand',
    fileName: 'kompromat_niemand.mp3',
  },
  {
    title: 'Peter Schilling - Völlig losgelöst',
    fileName: 'peter-schilling_vollig-losgelost.mp3',
  },
  {
    title: 'Galt MacDermot - Let The Sunshine In',
    fileName: 'galt-mac-dermot_let-the-sunshine-in.mp3',
  },
  {
    title: 'Amenofis - Regia',
    fileName: 'amenofis_regia--original-mix.mp3',
  },
];

let currentSound: Sound | null;

const onSelectMusic: (fileName: string) => ButtonClickedCallback =
  fileName => async popup => {
    if (!currentSound) {
      currentSound = await loadSound(`${trackPath}/${fileName}`);
    }
    if (currentSound) {
      currentSound.play(soundConfig);
    }
    popup.close();
  };

/**
 * JUKEBOX POPUP
 */
let currentJukeboxPopup: Popup | null = null;
const zone = 'danceFloor';
const popupRectangle = 'jukebox';
const popupMessage = 'Which music do you wanna listen to?';
const buttons = tracks.map(track => ({
  label: track.title,
  className: 'normal',
  callback: onSelectMusic(track.fileName),
}));

onEnterZone(zone, () => {
  if (!currentJukeboxPopup) {
    currentJukeboxPopup = openPopup(popupRectangle, popupMessage, buttons);
  }
});
onLeaveZone(zone, () => {
  if (currentSound) {
    currentSound.stop();
    currentSound = null;
  }
  if (currentJukeboxPopup) {
    currentJukeboxPopup.close();
    currentJukeboxPopup = null;
  }
});
