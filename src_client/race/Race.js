import { browser } from "../client";

// raceStatus: "notStarted" | "starting" | "started" | "ended"

var race = {
  startRaceTime: 0,
  raceStatus: "notStarted",
  player: {
    currentLap: 1,
  },
  timer: {
    endTime: 0,
    timerInterval: undefined,
    timerCallback: () => {
      var now = new Date().getTime();
      var distance = parseInt(race.timer.endTime) - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      browser.call("react:UpdateRaceTimer", hours, minutes, seconds);

      mp.gui.chat.push(
        `updated timer - hours: ${hours}, minutes: ${minutes}, seconds: ${seconds}`
      );

      mp.gui.chat.push(distance + "\n");

      if (distance <= 0) {
        clearInterval(race.timer.timerInterval);
        mp.gui.chat.push("cleared");
      }
    },
  },
  data: {
    track: undefined,
    mode: undefined,
    laps: undefined,
    timerStarted: false,
    maxParticipants: 0,
    duration: 0,
    currentPoint: 0,
    currentBlip: undefined,
    currentCheckPoint: undefined,
    isLastCheckpointInRace: false,
    isLastCheckpointInArray: false,

    reset: () => {
      if (race.data.currentCheckPoint != undefined) {
        race.data.currentCheckPoint.destroy();
        race.data.currentBlip.destroy();
        race.data.currentBlip = undefined;
        race.data.currentCheckPoint = undefined;
      }
    },
  },

  run: () => {
    if (race.raceStatus == "starting") {
      if (race.getTimeStamp() > race.startRaceTime) {
        if (mp.players.local.vehicle) {
          mp.players.local.vehicle.setHandbrake(false);
        }

        mp.gui.chat.push("Race has started time " + race.startRaceTime);
        race.raceStatus = "started";

        if (race.data.mode) {
          race.timer.endTime =
            new Date().getTime() + race.data.duration * 60000;
        }
      }
    }
  },

  getTimeStamp: () => {
    return mp.game.invoke("0x9CD27B0045628463");
  },

  onRaceStart: (time) => {
    race.startRaceTime = race.getTimeStamp() + time;
    race.raceStatus = "starting";
    race.data.reset();
    race.data.currentPoint = 0;

    mp.gui.chat.push("OnRaceStart triggered.");

    if (mp.players.local.vehicle) {
      mp.players.local.vehicle.setHandbrake(true);
    }

    mp.events
      .callRemoteProc("serverside:SetIsInStartedRace", true)
      .then((state) => {
        if (!state) return;

        mp.events.call("clientside:GetNumberOfParticipants");

        mp.events.call("clientside:SetCurrentLap", race.player.currentLap);
        browser.call("react:SetIsInStartedRace", true);
      });

    race.createNewCheckpoint();
  },

  createNewCheckpoint: () => {
    race.data.reset();

    mp.gui.chat.push(`${race.player.currentLap}/${race.data.laps}` + "\n");

    race.data.currentCheckPoint = mp.checkpoints.new(
      race.player.currentLap == race.data.laps + 1 ? 10 : 18,
      new mp.Vector3(
        race.data.track[race.data.currentPoint].x,
        race.data.track[race.data.currentPoint].y,
        race.data.track[race.data.currentPoint].z + 5
      ),
      10,
      {
        direction:
          race.data.currentPoint == race.data.track.length - 1
            ? new mp.Vector3(0, 0, 0)
            : new mp.Vector3(
                race.data.track[race.data.currentPoint + 1].x,
                race.data.track[race.data.currentPoint + 1].y,
                race.data.track[race.data.currentPoint + 1].z + 5
              ),
        color: [84, 150, 255, 100],
        visible: true,
        dimension: mp.players.local.dimension,
      }
    );

    race.data.currentBlip = mp.blips.new(
      race.player.currentLap == race.data.laps + 1 ? 38 : 1,
      new mp.Vector3(
        race.data.track[race.data.currentPoint].x,
        race.data.track[race.data.currentPoint].y,
        race.data.track[race.data.currentPoint].z
      ),
      {
        color: 3,
        shortRange: true,
        dimension: mp.players.local.dimension,
      }
    );
  },

  getNumberOfParticipants: () => {
    mp.events
      .callRemoteProc("serverside:SendNumberOfParticipants")
      .then((numberOfParticipants) => {
        if (!numberOfParticipants) return;
        browser.call("react:GetNumberOfParticipants", numberOfParticipants);
      });
  },

  setTimerState: (state) => {
    race.data.timerStarted = state;
    if (state)
      race.timer.timerInterval = setInterval(race.timer.timerCallback, 1000);
  },

  onJoinRace: (raceId) => {
    mp.events
      .callRemoteProc("serverside:onJoinRace", raceId)
      .then((raceData) => {
        if (raceData == null) return;
        race.data.track = raceData.Checkpoints;
        race.data.mode = raceData.Mode;
        race.data.laps = raceData.Laps;
        race.data.duration = raceData.Duration;
        race.data.maxParticipants = raceData.MaxParticipants;

        mp.console.logInfo(JSON.stringify(raceData));
        browser.call(
          "react:GetCurrentRaceInformation",
          race.data.track.length,
          race.data.mode,
          race.data.laps,
          race.data.maxParticipants
        );
        mp.events.call("clientside:SpawnPlayer");
      });
  },

  playerEnterCheckpoint: (checkpoint) => {
    if (checkpoint != race.data.currentCheckPoint) return;

    race.data.currentPoint++;

    browser.call("react:GetCurrentPoint", race.data.currentPoint);
    mp.gui.chat.push("Entered point " + race.data.currentPoint);

    race.data.isLastCheckpointInArray =
      race.data.currentPoint == race.data.track.length;
    race.data.isLastCheckpointInRace =
      race.player.currentLap == race.data.laps + 1;

    mp.gui.chat.push(
      "isLastCheckpointinRace" + race.data.isLastCheckpointInRace + "\n"
    );
    mp.gui.chat.push(
      "isLastCheckpointinArr" + race.data.isLastCheckpointInArray + "\n"
    );

    mp.events.callRemote(
      "serverside:OnPlayerEnterCheckpoint",
      race.data.currentPoint,
      mp.players.local.position
    );

    mp.game.audio.playSoundFrontend(
      -1,
      race.data.isLastCheckpointInRace ? "FIRST_PLACE" : "CHECKPOINT_NORMAL",
      "HUD_MINI_GAME_SOUNDSET",
      true
    );

    if (race.data.isLastCheckpointInArray) {
      //If race mode is time and player is first place increase the laps.
      if (
        race.data.mode &&
        mp.players.local.getVariable("racePosition") == 1 &&
        race.data.timerStarted
      ) {
        race.data.laps++;
      }

      race.data.currentPoint = 0;
      race.player.currentLap++;
      mp.events.call("clientside:SetCurrentLap", race.player.currentLap);
    }

    if (race.data.isLastCheckpointInRace) {
      mp.events.callRemote("serverside:OnPlayerEnterFinishCheckpoint");

      mp.events
        .callRemoteProc("serverside:SetIsInStartedRace", false)
        .then((state) => {
          if (!state) return;

          browser.call("react:SetIsInStartedRace", false);
        });

      race.data.currentPoint = 0;
      race.player.currentLap = 1;
      race.data.isLastCheckpointInRace = false;
      race.data.isLastCheckpointInArray = false;
      race.data.track = undefined;
      race.data.reset();
      return;
    }

    race.createNewCheckpoint();
  },

  setRacePosition: (entity, value, oldValue) => {
    if (mp.players.local.getVariable("raceId") == -1) return;
    browser.call("react:GetRacePosition", value);
    mp.gui.chat.push(`raceposition ${value}`);
  },

  setCurrentLap: (lap) => {
    if (mp.players.local.getVariable("raceId") == -1) return;
    mp.events.callRemote("serverside:SetCurrentLap", lap);
    browser.call("react:SetCurrentLap", lap);
  },

  init: () => {
    mp.events.add({
      "clientside:onRaceStart": race.onRaceStart,
      "clientside:onJoinRace": race.onJoinRace,
      "clientside:GetNumberOfParticipants": race.getNumberOfParticipants,
      "clientside:SetCurrentLap": race.setCurrentLap,
      "clientside:SetTimerState": race.setTimerState,
      playerEnterCheckpoint: race.playerEnterCheckpoint,
      render: race.run,
    });
    mp.events.addDataHandler({
      racePosition: race.setRacePosition,
    });
  },
};

race.init();

mp.events.add("entityStreamIn", (entity) => {
  if (entity.type === "vehicle" && entity.hasVariable("assignedPlayer")) {
    const player = entity.getVariable("assignedPlayer");
    mp.gui.chat.push(
      "entity stream in" + player + mp.players.local.remoteId
    );
    if (player == mp.players.local.remoteId)
      mp.players.local.setIntoVehicle(entity.handle, -1);
  }
});

mp.events.add("entityStreamIn", (entity) => {
  mp.gui.chat.push("merge entityu " + "\n");
})
