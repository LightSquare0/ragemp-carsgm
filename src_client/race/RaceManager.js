import { browser } from "../client";

mp.events.add({
  "clientside:OpenGamemodeSelectorUI": () => {
    browser.call("react:OpenGamemodeSelectorUI");
    mp.discord.update("race.invictum.mp | DEV BUILD", `Selecting gamemode | as ${mp.players.local.name}`);
  },
  "clientside:GamemodeFreemodeSelected": () => {
    mp.events.callRemote("serverside:SpawnPlayer");
    mp.discord.update("race.invictum.mp | DEV BUILD", `Roaming around | as ${mp.players.local.name}`);
  },
  "clientside:GamemodeRacingSelected": () => {
    browser.call("react:OpenRaceListUI");
    mp.discord.update("race.invictum.mp | DEV BUILD", `Browsing races | as ${mp.players.local.name}`);
  },
});
