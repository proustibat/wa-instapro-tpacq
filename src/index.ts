/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />

// You can write your WorkAdventure script here, if any.
// The "WA" global object is available from anywhere.
console.log('Script started successfully');
// WA.openCoWebSite('https://workadventu.re');
WA.sendChatMessage('Hello you!', 'Tpacq bot');


/**
 * Opening a popup
 */
type Popup = {
    id: number;
    close(): void;
}
const zoneName = 'music'
let helloWorldPopup: Popup;
const onEnterMusic = () =>
    WA.openPopup("popupRectangle", 'You are listening to "Regia" a music from Amenofis', [{
        label: "Close",
        className: "primary",
        callback: (popup) => popup.close()
    }]);
helloWorldPopup = WA.onEnterZone(zoneName, onEnterMusic) as unknown as Popup;
const closePopup = helloWorldPopup.close;

// Close the popup when we leave the zone.
WA.onLeaveZone(zoneName, closePopup);
