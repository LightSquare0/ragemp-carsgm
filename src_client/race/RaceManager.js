import { browser } from "../client";

mp.events.add("clientside:OpenRaceManagerUI", () => {
  browser.call("react:OpenRaceManagerUI");
});

mp.events.add("clientside:GamemodeFreemodeSelected", () => {
  mp.events.callRemote("serverside:SpawnPlayer");
});

mp.events.add("clientside:GamemodeRacingSelected", () => {
  browser.call("react:OpenRaceListUI");
});
