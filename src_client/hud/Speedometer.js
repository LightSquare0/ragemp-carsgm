import { browser } from "../client";

mp.events.add("render", () => {
  mp.game.ui.hideHudComponentThisFrame(9);
  mp.game.ui.hideHudComponentThisFrame(5);
  mp.game.ui.hideHudComponentThisFrame(8);
  mp.game.ui.hideHudComponentThisFrame(10);
  mp.game.ui.hideHudComponentThisFrame(6);
  mp.game.ui.hideHudComponentThisFrame(7);
  mp.game.ui.hideHudComponentThisFrame(3);
  mp.game.ui.hideHudComponentThisFrame(4);
 
});

mp.events.add("playerEnterVehicle", () => {
  browser.call("react:updateSpeedoState", true);
});

mp.events.add("playerLeaveVehicle", () => {
  browser.call("react:updateSpeedoState", false);
});

var oldSpeed = 0;

setInterval(() => {
  if (mp.players.local.vehicle != null) {
    let vehicleSpeed = parseInt(mp.players.local.vehicle.getSpeed() * 3.6);
    let vehicleRpm = parseInt(mp.players.local.vehicle.rpm * 10000);
    let vehicleGear = parseInt(mp.players.local.vehicle.gear);
    browser.call("react:updateVehicleData", vehicleSpeed, vehicleRpm, vehicleGear);
  }
}, 10);