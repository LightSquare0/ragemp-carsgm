var race = {
  player: {
    currentLap: 1,
  },
  data: {
    track: undefined,
    mode: undefined,
    laps: undefined,
    currentPoint: 0,
    currentBlip: undefined,
    currentCheckPoint: undefined,
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
    if (race.raceStatus == 1) {
      if (race.getTimeStamp() > race.startRaceTime) {
        if (mp.players.local.vehicle) {
          mp.players.local.vehicle.setHandbrake(false);
        }
        mp.gui.chat.push("Race has started time " + race.startRaceTime);
        race.raceStatus = 2;
      }
    }
  },
  getTimeStamp: () => {
    return mp.game.invoke("0x9CD27B0045628463");
  },
  onRaceStart: (time) => {
    race.startRaceTime = race.getTimeStamp() + time;
    race.raceStatus = 1;
    race.data.reset();
    race.currentPoint = 0;

    mp.gui.chat.push("OnRaceStart triggered.");

    if (mp.players.local.vehicle) {
      mp.players.local.vehicle.setHandbrake(true);
    }

    race.createNewCheckpoint();
  },
  createNewCheckpoint: () => {
    race.data.reset();

    var isLastCheckpointInArray = race.data.currentPoint == race.data.track.length;

    var isLastCheckpointInRace = race.player.currentLap == race.data.laps + 1;

    mp.gui.chat.push("isLastCheckpointinArr" + isLastCheckpointInArray + "\n");
    mp.gui.chat.push(`${race.player.currentLap}/${race.data.laps}` + "\n");

    if (isLastCheckpointInArray) {
      race.data.currentPoint = 0;
      race.player.currentLap++;
    }
    mp.gui.chat.push
    mp.gui.chat.push("isLastCheckpointinRace" + isLastCheckpointInRace + "\n");
    race.data.currentCheckPoint = mp.checkpoints.new(
      race.player.currentLap == race.data.laps + 1 ? 10 : 18,
      new mp.Vector3(
        race.data.track[race.data.currentPoint].x,
        race.data.track[race.data.currentPoint].y,
        race.data.track[race.data.currentPoint].z + 2
      ),
      10,
      {
        direction:race.data.currentPoint == race.data.track.length - 1
            ? new mp.Vector3(0, 0, 0)
            : new mp.Vector3(
                race.data.track[race.data.currentPoint + 1].x,
                race.data.track[race.data.currentPoint + 1].y,
                race.data.track[race.data.currentPoint + 1].z
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
    if (isLastCheckpointInRace) {
      mp.gui.chat.push("ai ajuns la final.");
      mp.events.callRemote("serverside:OnPlayerEnterFinishCheckpoint");
      mp.game.audio.playSoundFrontend(-1, "FIRST_PLACE", "HUD_MINI_GAME_SOUNDSET", true);
      race.data.currentPoint = 0;
      race.player.currentLap = 1;
      race.data.track = undefined;
      race.data.reset();
      return;
    }
  },
  onJoinRace: (raceId) => {
    mp.events.callRemoteProc("serverside:onJoinRace", raceId).then((raceData) => {
      if (raceData == null) return;
      race.data.track = raceData.Checkpoints;
      race.data.mode = raceData.Mode;
      race.data.laps = raceData.Laps;

      mp.console.logInfo(JSON.stringify(raceData));
      mp.events.call("clientside:SpawnPlayer");
    });
  },
  startRaceTime: 0,
  raceStatus: 0,
  init: () => {
    mp.events.add({
      "clientside:onRaceStart": race.onRaceStart,
      "clientside:onJoinRace": race.onJoinRace,
      render: race.run,
    });
  },
};

race.init();

mp.events.add("playerEnterCheckpoint", (checkpoint) => {
  mp.gui.chat.push("entered checkpoint");
  if (checkpoint == race.data.currentCheckPoint) {
    mp.gui.chat.push("ai intrat in punctul " + race.currentPoint);

    mp.events.callRemote(
      "serverside:OnPlayerEnterCheckpoint",
      race.currentPoint,
      mp.players.local.position
    );

    mp.game.audio.playSoundFrontend(-1, "CHECKPOINT_NORMAL", "HUD_MINI_GAME_SOUNDSET", true);

    if (race.data.currentPoint == race.data.track.length) {
      race.data.currentPoint = 0;
      return;
    }

    race.data.currentPoint++;
    race.createNewCheckpoint();
  }
});
