import { browser } from "../client";
import { PrepareBackground } from "../players/Players";

var isBackgroundLoaded = false;

/* Routes */
mp.events.add({
  "clientside:DisplayRoot": () => {
    browser.call("react:DisplayRoot");
    isBackgroundLoaded = false;
  },
  "clientside:DisplayLogin": () => {
    browser.call("react:DisplayLogin");
    isBackgroundLoaded = true;
  },
  "clientside:OpenGamemodeSelectorUI": () => {
    mp.events.callRemoteProc("serverside:SetIsInRaceList", false).then((state) => {
      if (state == true) return;

      if (!isBackgroundLoaded) {
        PrepareBackground();
        isBackgroundLoaded = true;
      }

      browser.call("react:OpenGamemodeSelectorUI");
      mp.discord.update(
        "race.invictum.mp | DEV BUILD",
        `Selecting gamemode | as ${mp.players.local.name}`
      );
    });
  },

  "clientside:GamemodeFreemodeSelected": () => {
    mp.events.callRemoteProc("serverside:SetIsInRaceList", false).then((state) => {
      if (state == true) return;

      isBackgroundLoaded = false;
      mp.events.callRemote("serverside:SpawnPlayer");
      mp.discord.update(
        "race.invictum.mp | DEV BUILD",
        `Roaming around | as ${mp.players.local.name}`
      );
    });
  },

  "clientside:GamemodeRacingSelected": () => {
    mp.events.callRemoteProc("serverside:SetIsInRaceList", true).then((state) => {
      if (state == false) return;

      if (!isBackgroundLoaded) {
        PrepareBackground();
        isBackgroundLoaded = true;
      }

      browser.call("react:OpenRaceListUI");
      mp.discord.update(
        "race.invictum.mp | DEV BUILD",
        `Browsing races | as ${mp.players.local.name}`
      );
    });
  },
});

/* Race hosting & related */
mp.events.add({
  "clientside:HostRace": (
    trackname,
    mode,
    laps,
    max_duration,
    max_participants,
    type,
    selected_vehicles
  ) => {
    mp.events.callRemote(
      "serverside:HostRace",
      trackname,
      mode,
      laps,
      max_duration,
      max_participants,
      type,
      selected_vehicles
    );
    mp.console.logInfo(selected_vehicles);
  },

  "clientside:CancelHost": () => {},

  "clientside:GetTrackImages": () => {
    mp.events
      .callRemoteProc("serverside:SendTrackImages")
      .then((data) => browser.call("react:GetTrackImages", data));
  },

  "clientside:UpdateRaceList": (race) => {
    browser.call("react:UpdateRaceList", race);
  },

  "clientside:GetInitialRaces": () => {
    mp.events.callRemoteProc("serverside:SendInitialRaces").then((races) => {
      browser.call("react:GetInitialRaces", races);
      let samp = JSON.stringify(races);
      mp.console.logInfo(samp);
    });
  },

  "clientside:SendRaceToList": (race) => {
    browser.call("react:SendRaceToList", race);
  },
});
