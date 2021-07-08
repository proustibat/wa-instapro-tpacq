/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

// You can write your WorkAdventure script here, if any.
// The "WA" global object is available from anywhere.
console.log('Script started successfully');
// WA.openCoWebSite('https://workadventu.re');
// WA.sendChatMessage('Hello you!', 'Tpacq bot');

WA.onEnterZone('zone', () => {
  WA.sendChatMessage('Hello!', 'Mr Robot');
});

WA.onLeaveZone('zone', () => {
  WA.sendChatMessage('Goodbye!', 'Mr Robot');
});
