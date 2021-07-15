var currentCheckpoints = [];
var _track = [];
var currentPoint = 0;
var currentCheckPoint = undefined;
var currentBlip = undefined;
mp.events.add("clientside:PlaceCheckpoint", (posx, posy, posz) => {
  mp.checkpoints.new(1, new mp.Vector3(posx, posy, posz), 10, {
    direction: new mp.Vector3(0, 0, 75),
    color: [255, 255, 255, 255],
    visible: true,
    dimension: 0,
  });

  currentCheckpoints.push({ x: posx, y: posy, z: posz });
});

mp.events.add("clientside:SaveRace", (racename, category, creator) => {
  mp.events.callRemote(
    "serverside:OnSaveRace",
    racename,
    category,
    creator,
    JSON.stringify(currentCheckpoints)
  );
});


mp.events.add("clientside:LoadRace", (track) => {
  _track = track;
  mp.gui.chat.push(_track + " loaded track cik");
  setTimeout(() => {
    createNewCheckpoint();
  }, 200);
    

});

const createNewCheckpoint = () => {
  if (currentCheckPoint != undefined){
    currentCheckPoint.destroy();
    currentBlip.destroy();
    currentBlip = undefined;
    currentCheckPoint = undefined;
  }


  if (currentPoint == _track.length){
    mp.gui.chat.push("ai ajuns la final");
    currentPoint = 0;
    _track.length = 0;
    return;
  }

  if (currentPoint + 1 == _track.length){
    currentCheckPoint = mp.checkpoints.new(10, new mp.Vector3(_track[currentPoint].x, _track[currentPoint].y, _track[currentPoint].z + 2), 10, {
      color: [84, 150, 255, 100],
      visible: true,
      dimension: 0,
    });
    
    currentBlip = mp.blips.new(38, new mp.Vector3(_track[currentPoint].x, _track[currentPoint].y, _track[currentPoint].z),
      {
        color: 3,
        shortRange: true,
      });
    return;
  }


   currentCheckPoint = mp.checkpoints.new(18, new mp.Vector3(_track[currentPoint].x, _track[currentPoint].y, _track[currentPoint].z + 2), 10, {
      direction: new mp.Vector3(_track[currentPoint + 1].x, _track[currentPoint + 1].y, _track[currentPoint + 1].z),
      color: [84, 150, 255, 100],
      visible: true,
      dimension: 0,
    });

    mp.gui.chat.push("a ajuns la cp");

    currentBlip = mp.blips.new(1, new mp.Vector3(_track[currentPoint].x, _track[currentPoint].y, _track[currentPoint].z),
    {
        color: 3,
        shortRange: true,
});
}

mp.events.add("playerEnterCheckpoint", (checkpoint) => {

  if (checkpoint == currentCheckPoint) {
   mp.gui.chat.push("ai intrat in punctul " + currentPoint);
   mp.game.audio.playSoundFrontend(-1, "CHECKPOINT_NORMAL", "HUD_MINI_GAME_SOUNDSET", true);
    createNewCheckpoint();
    currentPoint++
  }

});