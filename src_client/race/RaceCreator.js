var race = {
  data: {
    savedCheckpoints: [],
  },
};

mp.events.add("clientside:PlaceCheckpoint", (posx, posy, posz) => {
  mp.checkpoints.new(1, new mp.Vector3(posx, posy, posz), 10, {
    direction: new mp.Vector3(0, 0, 75),
    color: [255, 255, 255, 255],
    visible: true,
    dimension: 0,
  });

  race.data.savedCheckpoints.push({ x: posx, y: posy, z: posz });
});

mp.events.add("clientside:SaveRace", (racename, category, creator) => {
  mp.events.callRemote(
    "serverside:OnSaveRace",
    racename,
    category,
    creator,
    JSON.stringify(race.data.savedCheckpoints)
  );

  race.data.savedCheckpoints = [];
});
