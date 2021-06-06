mp.events.add("render", () => {
  mp.game.ui.hideHudComponentThisFrame(9);
  mp.game.ui.hideHudComponentThisFrame(5);
  mp.game.ui.hideHudComponentThisFrame(8);
  mp.game.ui.hideHudComponentThisFrame(10);
  mp.game.ui.hideHudComponentThisFrame(6);
  mp.game.ui.hideHudComponentThisFrame(7);
  if (mp.players.local.vehicle != null) {
    let vehicleSpeed = parseInt(mp.players.local.vehicle.getSpeed() * 3.6);
    let vehicleRpm = parseInt((mp.players.local.vehicle.rpm * 10000) / 1.5);
    browser.call("react:updateVehicleSpeed", vehicleSpeed);
    browser.call("react:updateVehicleRpm", vehicleRpm);
  }
});

mp.events.add("playerEnterVehicle", () => {
  browser.call("react:updateSpeedoState", true);
});

mp.events.add("playerLeaveVehicle", () => {
  browser.call("react:updateSpeedoState", false);
});
