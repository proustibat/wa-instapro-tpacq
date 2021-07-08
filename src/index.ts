/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

// You can write your WorkAdventure script here, if any.
// The "WA" global object is available from anywhere.
console.log('Script started successfully');
// WA.openCoWebSite('https://workadventu.re');
// WA.sendChatMessage('Hello you!', 'Tpacq bot');

/**
 * Opening a popup
 */
const { openPopup, onEnterZone, onLeaveZone } = WA;
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
const zone = 'music';
const popupRectangle = 'musicPopup';

const {
  targetObject,
  message,
  buttons,
}: {
  targetObject: string;
  message: string;
  buttons: ButtonDescriptor[];
} = {
  targetObject: popupRectangle,
  message: 'You are listening to "Regia" a music from Amenofis',
  buttons: [
    {
      label: 'Close',
      className: 'primary',
      callback: popup => popup.close(),
    },
  ],
};

const onEnterMusic = () => openPopup(targetObject, message, buttons);
const closePopup = (onEnterZone(zone, onEnterMusic) as unknown as Popup).close;
onLeaveZone(zone, closePopup);
