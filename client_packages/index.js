/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src_client/MoveSkyCamera/index.js":
/*!*******************************************!*\
  !*** ./src_client/MoveSkyCamera/index.js ***!
  \*******************************************/
/***/ (() => {

eval("/*\r\n    Developed by Jengas\r\n*/\r\n\r\nconst Natives = {\r\n    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',\r\n    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',\r\n    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'\r\n};\r\nlet gui;\r\n\r\nmp.events.add('moveSkyCamera', moveFromToAir);\r\n\r\nfunction moveFromToAir(player, moveTo, switchType, showGui) {   \r\n    /*\r\n        switchType: 0 - 3\r\n\r\n        0: 1 step towards ped\r\n        1: 3 steps out from ped (Recommended)\r\n        2: 1 step out from ped\r\n        3: 1 step towards ped\r\n    */\r\n   switch (moveTo) {\r\n       case 'up':\r\n            if (showGui == false) {\r\n                mp.gui.chat.show(showGui);\r\n                gui = 'false';\r\n            };\r\n            mp.game.invoke(Natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));\r\n           break;\r\n       case 'down':\r\n            if (gui == 'false') {\r\n                checkCamInAir();\r\n            };\r\n            mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle);\r\n           break;\r\n   \r\n       default:\r\n           break;\r\n   }\r\n}\r\n\r\n// Checks whether the camera is in the air. If so, then reset the timer\r\nfunction checkCamInAir() {\r\n    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {\r\n        setTimeout(() => {\r\n            checkCamInAir();\r\n        }, 400);\r\n    } else {\r\n        mp.gui.chat.show(true);\r\n        gui = 'true';\r\n    }\r\n}\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/MoveSkyCamera/index.js?");

/***/ }),

/***/ "./src_client/auth/Auth.js":
/*!*********************************!*\
  !*** ./src_client/auth/Auth.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ \"./src_client/client.js\");\n/* harmony import */ var _players_Players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../players/Players */ \"./src_client/players/Players.js\");\n\r\n\r\n\r\nmp.events.add({\r\n  playerReady: (player) => {\r\n    (0,_players_Players__WEBPACK_IMPORTED_MODULE_1__.PrepareBackground)();\r\n  },\r\n\r\n  browserDomReady: (browser) => {\r\n    if (\r\n      browser.url === \"package://webview/index.html\" ||\r\n      \"http://localhost:8080\" ||\r\n      \"http://naivoe.go.ro:8080\"\r\n    ) {\r\n      mp.events.call(\"clientside:DisplayLogin\")\r\n      mp.discord.update('race.invictum.mp | DEV BUILD', 'Logging in');\r\n      mp.gui.chat.show(false);\r\n      if (mp.storage.data.authData) {\r\n        var authUsername = mp.storage.data.authData.username;\r\n        var authPassword = mp.storage.data.authData.password;\r\n        browser.call(\"react:triggerRememberMe\", authUsername, authPassword);\r\n      }\r\n    }\r\n  },\r\n  \r\n  sendLoginToServer: (username, password, rememberMe) => {\r\n    if (rememberMe) {\r\n      mp.storage.data.authData = { username: username, password: password };\r\n    }\r\n    mp.events.callRemote(\"serverside:OnPlayerLogin\", username, password);\r\n  },\r\n\r\n  sendRegisterToServer: (username, password, email) => {\r\n    mp.events.callRemote(\r\n      \"serverside:OnPlayerRegister\",\r\n      username,\r\n      password,\r\n      email\r\n    );\r\n  },\r\n\r\n  \"clientside:LoginResult\": (result, playerName) => {\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:LoginResult\", result, playerName);\r\n    if (result == 1){\r\n      mp.discord.update('race.invictum.mp | DEV BUILD', `as ${playerName}`)\r\n    }\r\n  },\r\n\r\n  \"clientside:RegisterResult\": (result) => {\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:RegisterResult\", result);\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/auth/Auth.js?");

/***/ }),

/***/ "./src_client/client.js":
/*!******************************!*\
  !*** ./src_client/client.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"chatbox\": () => (/* binding */ chatbox),\n/* harmony export */   \"browser\": () => (/* binding */ browser)\n/* harmony export */ });\n__webpack_require__(/*! ./auth/Auth.js */ \"./src_client/auth/Auth.js\");\r\n__webpack_require__(/*! ./hud/Speedometer.js */ \"./src_client/hud/Speedometer.js\");\r\n__webpack_require__(/*! ./flymode/fly.js */ \"./src_client/flymode/fly.js\");\r\n__webpack_require__(/*! ./race/Race.js */ \"./src_client/race/Race.js\");\r\n__webpack_require__(/*! ./players/Players.js */ \"./src_client/players/Players.js\");\r\n__webpack_require__(/*! ./race/RaceManager.js */ \"./src_client/race/RaceManager.js\");\r\n__webpack_require__(/*! ./notifications/Notifications.js */ \"./src_client/notifications/Notifications.js\");\r\n__webpack_require__(/*! ./MoveSkyCamera/index */ \"./src_client/MoveSkyCamera/index.js\");\r\n__webpack_require__(/*! ./race/RaceCreator */ \"./src_client/race/RaceCreator.js\");\r\n__webpack_require__(/*! ./server/ServerData */ \"./src_client/server/ServerData.js\")\r\n\r\nmp.gui.chat.show(false);\r\n\r\nconst chatbox = mp.browsers.new(\"package://chat/chat.html\");\r\nchatbox.markAsChat();\r\n\r\nconst browser = mp.browsers.new(\"http://naivoe.go.ro:8080\");\r\nmp.game.gxt.set(\"PM_PAUSE_HDR\", \"Invictum Racing\");\r\n// ` - trigger cursor\r\nmp.keys.bind(0xc0, true, () => {\r\n  let state = !mp.gui.cursor.visible;\r\n  mp.gui.cursor.show(state, state);\r\n});\r\n\r\nmp.events.add(\"clientside:PlayEffect\", (effect, duration, loopable) => {\r\n  mp.game.graphics.startScreenEffect(effect, duration, loopable);\r\n});\r\n\r\nmp.events.add(\"clientside:StopEffect\", (effect) => {\r\n  mp.game.graphics.stopScreenEffect(effect);\r\n});\r\n\r\nmp.events.add(\"playerDeath\", (player, reason, killer) => {\r\n  mp.game.cam.doScreenFadeOut(300);\r\n  setTimeout(() => {\r\n    mp.game.cam.doScreenFadeIn(300);\r\n  }, 3000);\r\n});\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/client.js?");

/***/ }),

/***/ "./src_client/flymode/fly.js":
/*!***********************************!*\
  !*** ./src_client/flymode/fly.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const controlsIds = {\n    F5: 327,\n    W: 32, // 232\n    S: 33, // 31, 219, 233, 268, 269\n    A: 34, // 234\n    D: 35, // 30, 218, 235, 266, 267\n    Space: 321,\n    LCtrl: 326,\n};\n\n__webpack_require__.g.fly = {\n    flying: false, f: 2.0, w: 2.0, h: 2.0, point_distance: 1000,\n};\n__webpack_require__.g.gameplayCam = mp.cameras.new('gameplay');\n\n// mp.game.graphics.notify('~r~Fly script loaded!');\n// mp.game.graphics.notify('~r~F5~w~ - enable/disable\\n~r~F5+Space~w~ - disable without warping to ground\\n~r~W/A/S/D/Space/LCtrl~w~ - move');\n// mp.game.graphics.notify('~r~/savecam~w~ - save Camera position.');\n\nlet direction = null;\nlet coords = null;\n\nfunction pointingAt(distance) {\n    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));\n\n    const result = mp.raycasting.testPointToPoint(coords, farAway, [1, 16]);\n    if (result === undefined) {\n        return 'undefined';\n    }\n    return result;\n}\n\nmp.events.add('render', () => {\n    const controls = mp.game.controls;\n    const fly = __webpack_require__.g.fly;\n    direction = __webpack_require__.g.gameplayCam.getDirection();\n    coords = __webpack_require__.g.gameplayCam.getCoord();\n\n    // mp.game.graphics.drawText(`Coords: ${JSON.stringify(coords)}`, [0.5, 0.005], {\n    //     font: 0,\n    //     color: [255, 255, 255, 185],\n    //     scale: [0.3, 0.3],\n    //     outline: true,\n    // });\n    // mp.game.graphics.drawText(`pointAtCoord: ${JSON.stringify(pointingAt(fly.point_distance).position)}`, [0.5, 0.025], {\n    //     font: 0,\n    //     color: [255, 255, 255, 185],\n    //     scale: [0.3, 0.3],\n    //     outline: true,\n    // });\n\n    if (controls.isControlJustPressed(0, controlsIds.F5)) {\n        fly.flying = !fly.flying;\n\n        const player = mp.players.local;\n\n        player.setInvincible(fly.flying);\n        player.freezePosition(fly.flying);\n        player.setAlpha(fly.flying ? 0 : 255);\n\n        if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {\n            const position = mp.players.local.position;\n            position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);\n            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);\n        }\n\n        mp.game.graphics.notify(fly.flying ? 'Fly: ~g~Enabled' : 'Fly: ~r~Disabled');\n    } else if (fly.flying) {\n        let updated = false;\n        const position = mp.players.local.position;\n\n        if (controls.isControlPressed(0, controlsIds.W)) {\n            if (fly.f < 8.0) { fly.f *= 1.025; }\n\n            position.x += direction.x * fly.f;\n            position.y += direction.y * fly.f;\n            position.z += direction.z * fly.f;\n            updated = true;\n        } else if (controls.isControlPressed(0, controlsIds.S)) {\n            if (fly.f < 8.0) { fly.f *= 1.025; }\n\n            position.x -= direction.x * fly.f;\n            position.y -= direction.y * fly.f;\n            position.z -= direction.z * fly.f;\n            updated = true;\n        } else {\n            fly.f = 2.0;\n        }\n\n        if (controls.isControlPressed(0, controlsIds.A)) {\n            if (fly.l < 8.0) { fly.l *= 1.025; }\n\n            position.x += (-direction.y) * fly.l;\n            position.y += direction.x * fly.l;\n            updated = true;\n        } else if (controls.isControlPressed(0, controlsIds.D)) {\n            if (fly.l < 8.0) { fly.l *= 1.05; }\n\n            position.x -= (-direction.y) * fly.l;\n            position.y -= direction.x * fly.l;\n            updated = true;\n        } else {\n            fly.l = 2.0;\n        }\n\n        if (controls.isControlPressed(0, controlsIds.Space)) {\n            if (fly.h < 8.0) { fly.h *= 1.025; }\n\n            position.z += fly.h;\n            updated = true;\n        } else if (controls.isControlPressed(0, controlsIds.LCtrl)) {\n            if (fly.h < 8.0) { fly.h *= 1.05; }\n\n            position.z -= fly.h;\n            updated = true;\n        } else {\n            fly.h = 2.0;\n        }\n\n        if (updated) {\n            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);\n        }\n    }\n});\n\nmp.events.add('getCamCoords', (name) => {\n    mp.events.callRemote('saveCamCoords', JSON.stringify(coords), JSON.stringify(pointingAt(fly.point_distance)), name);\n});\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/flymode/fly.js?");

/***/ }),

/***/ "./src_client/hud/Speedometer.js":
/*!***************************************!*\
  !*** ./src_client/hud/Speedometer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ \"./src_client/client.js\");\n\r\n\r\nmp.events.add(\"render\", () => {\r\n  mp.game.ui.hideHudComponentThisFrame(9);\r\n  mp.game.ui.hideHudComponentThisFrame(5);\r\n  mp.game.ui.hideHudComponentThisFrame(8);\r\n  mp.game.ui.hideHudComponentThisFrame(10);\r\n  mp.game.ui.hideHudComponentThisFrame(6);\r\n  mp.game.ui.hideHudComponentThisFrame(7);\r\n  mp.game.ui.hideHudComponentThisFrame(3);\r\n  mp.game.ui.hideHudComponentThisFrame(4);\r\n \r\n});\r\n\r\nmp.events.add(\"playerEnterVehicle\", () => {\r\n  _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:updateSpeedoState\", true);\r\n});\r\n\r\nmp.events.add(\"playerLeaveVehicle\", () => {\r\n  _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:updateSpeedoState\", false);\r\n});\r\n\r\nvar oldSpeed = 0;\r\n\r\nsetInterval(() => {\r\n  if (mp.players.local.vehicle != null) {\r\n    let vehicleSpeed = parseInt(mp.players.local.vehicle.getSpeed() * 3.6);\r\n    let vehicleRpm = parseInt(mp.players.local.vehicle.rpm * 10000);\r\n    let vehicleGear = parseInt(mp.players.local.vehicle.gear);\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:updateVehicleData\", vehicleSpeed, vehicleRpm, vehicleGear);\r\n  }\r\n}, 10);\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/hud/Speedometer.js?");

/***/ }),

/***/ "./src_client/notifications/Notifications.js":
/*!***************************************************!*\
  !*** ./src_client/notifications/Notifications.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ \"./src_client/client.js\");\n\r\n\r\n\r\nmp.events.add(\"clientside:DisplayNotification\", (type, title, text) => {\r\n  _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:DisplayNotification\", type, title, text);\r\n});\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/notifications/Notifications.js?");

/***/ }),

/***/ "./src_client/players/Players.js":
/*!***************************************!*\
  !*** ./src_client/players/Players.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PrepareBackground\": () => (/* binding */ PrepareBackground),\n/* harmony export */   \"RemoveBackground\": () => (/* binding */ RemoveBackground)\n/* harmony export */ });\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ \"./src_client/client.js\");\n\r\n\r\nmp.events.add(\"clientside:SpawnPlayer\", () => {\r\n  RemoveBackground();\r\n  mp.events.call(\"clientside:DisplayRoot\");\r\n});\r\n\r\nconst PrepareBackground = () => {\r\n  mp.players.local.freezePosition(true);\r\n  mp.players.local.setAlpha(0);\r\n  mp.game.ui.displayRadar(false);\r\n  let sceneryCamera = mp.cameras.new(\r\n    \"default\",\r\n    new mp.Vector3(-45.322342, -824.4542, 1296.235),\r\n    new mp.Vector3(0, 0, 0),\r\n    40\r\n  );\r\n\r\n  mp.players.local.position = new mp.Vector3(-45.322342, -824.4542, 1296.235);\r\n  mp.game.gameplay.setWeatherTypeNowPersist(\"CLEAR\");\r\n  mp.game.invoke(\"0xF36199225D6D8C86\", 0.0);\r\n  sceneryCamera.setActive(true);\r\n  sceneryCamera.shake(\"HAND_SHAKE\", 0.7);\r\n  sceneryCamera.pointAtCoord(-45.322342, -824.4542, 987.33685);\r\n  mp.game.graphics.transitionToBlurred(2000);\r\n  mp.game.cam.renderScriptCams(true, false, 0, true, false);\r\n};\r\n\r\nconst RemoveBackground = () => {\r\n  mp.gui.chat.show(true);\r\n  mp.game.cam.renderScriptCams(false, true, 2000, true, false);\r\n  mp.players.local.setAlpha(255);\r\n  mp.players.local.freezePosition(false);\r\n  mp.game.graphics.transitionFromBlurred(500);\r\n  mp.game.ui.displayRadar(true);\r\n};\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/players/Players.js?");

/***/ }),

/***/ "./src_client/race/Race.js":
/*!*********************************!*\
  !*** ./src_client/race/Race.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ \"./src_client/client.js\");\n\r\n\r\n// raceStatus: \"notStarted\" | \"starting\" | \"started\" | \"ended\"\r\n\r\nvar race = {\r\n  startRaceTime: 0,\r\n  raceStatus: \"notStarted\",\r\n  player: {\r\n    currentLap: 1,\r\n  },\r\n  data: {\r\n    track: undefined,\r\n    mode: undefined,\r\n    laps: undefined,\r\n    timerStarted: false,\r\n    maxParticipants: 0,\r\n    duration: 0,\r\n    currentPoint: 0,\r\n    currentBlip: undefined,\r\n    currentCheckPoint: undefined,\r\n    isLastCheckpointInRace: false,\r\n    isLastCheckpointInArray: false,\r\n\r\n    reset: () => {\r\n      if (race.data.currentCheckPoint != undefined) {\r\n        race.data.currentCheckPoint.destroy();\r\n        race.data.currentBlip.destroy();\r\n        race.data.currentBlip = undefined;\r\n        race.data.currentCheckPoint = undefined;\r\n      }\r\n    },\r\n  },\r\n\r\n  run: () => {\r\n    if (race.raceStatus == \"starting\") {\r\n      if (race.getTimeStamp() > race.startRaceTime) {\r\n        if (mp.players.local.vehicle) {\r\n          mp.players.local.vehicle.setHandbrake(false);\r\n        }\r\n        if (race.data.mode) {\r\n          let now = new Date();\r\n          let endTime = now.setMinutes(now.getMinutes() + race.data.duration);\r\n          _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:GetCurrentRaceEndTime\", endTime);\r\n        }\r\n\r\n        mp.gui.chat.push(\"Race has started time \" + race.startRaceTime);\r\n        race.raceStatus = \"started\";\r\n      }\r\n    }\r\n  },\r\n\r\n  getTimeStamp: () => {\r\n    return mp.game.invoke(\"0x9CD27B0045628463\");\r\n  },\r\n\r\n  onRaceStart: (time) => {\r\n    race.startRaceTime = race.getTimeStamp() + time;\r\n    race.raceStatus = \"starting\";\r\n    race.data.reset();\r\n    race.data.currentPoint = 0;\r\n\r\n    mp.gui.chat.push(\"OnRaceStart triggered.\");\r\n\r\n    if (mp.players.local.vehicle) {\r\n      mp.players.local.vehicle.setHandbrake(true);\r\n    }\r\n\r\n    mp.events\r\n      .callRemoteProc(\"serverside:SetIsInStartedRace\", true)\r\n      .then((state) => {\r\n        if (!state) return;\r\n\r\n        mp.events.call(\"clientside:GetNumberOfParticipants\");\r\n\r\n        mp.events.call(\"clientside:SetCurrentLap\", race.player.currentLap);\r\n        _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:SetIsInStartedRace\", true);\r\n      });\r\n\r\n    race.createNewCheckpoint();\r\n  },\r\n\r\n  createNewCheckpoint: () => {\r\n    race.data.reset();\r\n\r\n    mp.gui.chat.push(`${race.player.currentLap}/${race.data.laps}` + \"\\n\");\r\n\r\n    race.data.currentCheckPoint = mp.checkpoints.new(\r\n      race.player.currentLap == race.data.laps + 1 ? 10 : 18,\r\n      new mp.Vector3(\r\n        race.data.track[race.data.currentPoint].x,\r\n        race.data.track[race.data.currentPoint].y,\r\n        race.data.track[race.data.currentPoint].z + 5\r\n      ),\r\n      10,\r\n      {\r\n        direction:\r\n          race.data.currentPoint == race.data.track.length - 1\r\n            ? new mp.Vector3(0, 0, 0)\r\n            : new mp.Vector3(\r\n                race.data.track[race.data.currentPoint + 1].x,\r\n                race.data.track[race.data.currentPoint + 1].y,\r\n                race.data.track[race.data.currentPoint + 1].z + 5\r\n              ),\r\n        color: [84, 150, 255, 100],\r\n        visible: true,\r\n        dimension: mp.players.local.dimension,\r\n      }\r\n    );\r\n\r\n    race.data.currentBlip = mp.blips.new(\r\n      race.player.currentLap == race.data.laps + 1 ? 38 : 1,\r\n      new mp.Vector3(\r\n        race.data.track[race.data.currentPoint].x,\r\n        race.data.track[race.data.currentPoint].y,\r\n        race.data.track[race.data.currentPoint].z\r\n      ),\r\n      {\r\n        color: 3,\r\n        shortRange: true,\r\n        dimension: mp.players.local.dimension,\r\n      }\r\n    );\r\n  },\r\n\r\n  getNumberOfParticipants: () => {\r\n    mp.events\r\n      .callRemoteProc(\"serverside:SendNumberOfParticipants\")\r\n      .then((numberOfParticipants) => {\r\n        if (!numberOfParticipants) return;\r\n        _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:GetNumberOfParticipants\", numberOfParticipants);\r\n      });\r\n  },\r\n\r\n  setTimerState: (state) => {\r\n    race.data.timerStarted = state;\r\n  },\r\n\r\n  onJoinRace: (raceId) => {\r\n    mp.events\r\n      .callRemoteProc(\"serverside:onJoinRace\", raceId)\r\n      .then((raceData) => {\r\n        if (raceData == null) return;\r\n        race.data.track = raceData.Checkpoints;\r\n        race.data.mode = raceData.Mode;\r\n        race.data.laps = raceData.Laps;\r\n        race.data.duration = raceData.Duration;\r\n        race.data.maxParticipants = raceData.MaxParticipants;\r\n\r\n        mp.console.logInfo(JSON.stringify(raceData));\r\n        _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\r\n          \"react:GetCurrentRaceInformation\",\r\n          race.data.track.length,\r\n          race.data.mode,\r\n          race.data.laps,\r\n          race.data.maxParticipants\r\n        );\r\n        mp.events.call(\"clientside:SpawnPlayer\");\r\n      });\r\n  },\r\n\r\n  playerEnterCheckpoint: (checkpoint) => {\r\n    if (checkpoint != race.data.currentCheckPoint) return;\r\n\r\n    race.data.currentPoint++;\r\n\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:GetCurrentPoint\", race.data.currentPoint);\r\n    mp.gui.chat.push(\"Entered point \" + race.data.currentPoint);\r\n\r\n    race.data.isLastCheckpointInArray =\r\n      race.data.currentPoint == race.data.track.length;\r\n    race.data.isLastCheckpointInRace =\r\n      race.player.currentLap == race.data.laps + 1;\r\n\r\n    mp.gui.chat.push(\r\n      \"isLastCheckpointinRace\" + race.data.isLastCheckpointInRace + \"\\n\"\r\n    );\r\n    mp.gui.chat.push(\r\n      \"isLastCheckpointinArr\" + race.data.isLastCheckpointInArray + \"\\n\"\r\n    );\r\n\r\n    mp.events.callRemote(\r\n      \"serverside:OnPlayerEnterCheckpoint\",\r\n      race.data.currentPoint,\r\n      mp.players.local.position\r\n    );\r\n\r\n    mp.game.audio.playSoundFrontend(\r\n      -1,\r\n      race.data.isLastCheckpointInRace ? \"FIRST_PLACE\" : \"CHECKPOINT_NORMAL\",\r\n      \"HUD_MINI_GAME_SOUNDSET\",\r\n      true\r\n    );\r\n\r\n    if (race.data.isLastCheckpointInArray) {\r\n      //If race mode is time and player is first place increase the laps.\r\n      if (race.data.mode && mp.players.local.getVariable(\"racePosition\") == 1 && race.data.timerStarted) {\r\n        race.data.laps++;\r\n      }\r\n\r\n      race.data.currentPoint = 0;\r\n      race.player.currentLap++;\r\n      mp.events.call(\"clientside:SetCurrentLap\", race.player.currentLap);\r\n    }\r\n\r\n    if (race.data.isLastCheckpointInRace) {\r\n      mp.events.callRemote(\"serverside:OnPlayerEnterFinishCheckpoint\");\r\n\r\n      mp.events\r\n        .callRemoteProc(\"serverside:SetIsInStartedRace\", false)\r\n        .then((state) => {\r\n          if (!state) return;\r\n\r\n          _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:SetIsInStartedRace\", false);\r\n        });\r\n\r\n      race.data.currentPoint = 0;\r\n      race.player.currentLap = 1;\r\n      race.data.isLastCheckpointInRace = false;\r\n      race.data.isLastCheckpointInArray = false;\r\n      race.data.track = undefined;\r\n      race.data.reset();\r\n      return;\r\n    }\r\n\r\n    race.createNewCheckpoint();\r\n  },\r\n\r\n  setRacePosition: (entity, value, oldValue) => {\r\n    if (mp.players.local.getVariable(\"raceId\") == -1) return;\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:GetRacePosition\", value);\r\n    mp.gui.chat.push(`raceposition ${value}`);\r\n  },\r\n\r\n  setCurrentLap: (lap) => {\r\n    if (mp.players.local.getVariable(\"raceId\") == -1) return;\r\n    mp.events.callRemote(\"serverside:SetCurrentLap\", lap);\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:SetCurrentLap\", lap);\r\n  },\r\n\r\n  init: () => {\r\n    mp.events.add({\r\n      \"clientside:onRaceStart\": race.onRaceStart,\r\n      \"clientside:onJoinRace\": race.onJoinRace,\r\n      \"clientside:GetNumberOfParticipants\": race.getNumberOfParticipants,\r\n      \"clientside:SetCurrentLap\": race.setCurrentLap,\r\n      \"clientside:SetTimerState\": race.setTimerState,\r\n      playerEnterCheckpoint: race.playerEnterCheckpoint,\r\n      render: race.run,\r\n    });\r\n    mp.events.addDataHandler({\r\n      racePosition: race.setRacePosition,\r\n    });\r\n  },\r\n};\r\n\r\nrace.init();\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/race/Race.js?");

/***/ }),

/***/ "./src_client/race/RaceCreator.js":
/*!****************************************!*\
  !*** ./src_client/race/RaceCreator.js ***!
  \****************************************/
/***/ (() => {

eval("var race = {\r\n  data: {\r\n    savedCheckpoints: [],\r\n  },\r\n};\r\n\r\nmp.events.add(\"clientside:PlaceCheckpoint\", (posx, posy, posz) => {\r\n  mp.checkpoints.new(1, new mp.Vector3(posx, posy, posz), 10, {\r\n    direction: new mp.Vector3(0, 0, 75),\r\n    color: [255, 255, 255, 255],\r\n    visible: true,\r\n    dimension: 0,\r\n  });\r\n\r\n  race.data.savedCheckpoints.push({ x: posx, y: posy, z: posz });\r\n});\r\n\r\nmp.events.add(\"clientside:SaveRace\", (racename, category, creator) => {\r\n  mp.events.callRemote(\r\n    \"serverside:OnSaveRace\",\r\n    racename,\r\n    category,\r\n    creator,\r\n    JSON.stringify(race.data.savedCheckpoints)\r\n  );\r\n\r\n  race.data.savedCheckpoints = [];\r\n});\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/race/RaceCreator.js?");

/***/ }),

/***/ "./src_client/race/RaceManager.js":
/*!****************************************!*\
  !*** ./src_client/race/RaceManager.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ \"./src_client/client.js\");\n/* harmony import */ var _players_Players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../players/Players */ \"./src_client/players/Players.js\");\n\r\n\r\n\r\nvar isBackgroundLoaded = false;\r\n\r\n/* Routes */\r\nmp.events.add({\r\n  \"clientside:DisplayRoot\": () => {\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:DisplayRoot\");\r\n    isBackgroundLoaded = false;\r\n  },\r\n  \"clientside:DisplayLogin\": () => {\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:DisplayLogin\");\r\n    isBackgroundLoaded = true;\r\n  },\r\n  \"clientside:OpenGamemodeSelectorUI\": () => {\r\n    mp.events.callRemoteProc(\"serverside:SetIsInRaceList\", false).then((state) => {\r\n      if (state == true) return;\r\n\r\n      if (!isBackgroundLoaded) {\r\n        (0,_players_Players__WEBPACK_IMPORTED_MODULE_1__.PrepareBackground)();\r\n        isBackgroundLoaded = true;\r\n      }\r\n\r\n      _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:OpenGamemodeSelectorUI\");\r\n      mp.discord.update(\r\n        \"race.invictum.mp | DEV BUILD\",\r\n        `Selecting gamemode | as ${mp.players.local.name}`\r\n      );\r\n    });\r\n  },\r\n\r\n  \"clientside:GamemodeFreemodeSelected\": () => {\r\n    mp.events.callRemoteProc(\"serverside:SetIsInRaceList\", false).then((state) => {\r\n      if (state == true) return;\r\n\r\n      isBackgroundLoaded = false;\r\n      mp.events.callRemote(\"serverside:SpawnPlayer\");\r\n      mp.discord.update(\r\n        \"race.invictum.mp | DEV BUILD\",\r\n        `Roaming around | as ${mp.players.local.name}`\r\n      );\r\n    });\r\n  },\r\n\r\n  \"clientside:GamemodeRacingSelected\": () => {\r\n    mp.events.callRemoteProc(\"serverside:SetIsInRaceList\", true).then((state) => {\r\n      if (state == false) return;\r\n\r\n      if (!isBackgroundLoaded) {\r\n        (0,_players_Players__WEBPACK_IMPORTED_MODULE_1__.PrepareBackground)();\r\n        isBackgroundLoaded = true;\r\n      }\r\n\r\n      _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:OpenRaceListUI\");\r\n      mp.discord.update(\r\n        \"race.invictum.mp | DEV BUILD\",\r\n        `Browsing races | as ${mp.players.local.name}`\r\n      );\r\n    });\r\n  },\r\n});\r\n\r\n/* Race hosting & related */\r\nmp.events.add({\r\n  \"clientside:HostRace\": (\r\n    trackname,\r\n    mode,\r\n    laps,\r\n    max_duration,\r\n    max_participants,\r\n    type,\r\n    selected_vehicles\r\n  ) => {\r\n    mp.events.callRemote(\r\n      \"serverside:HostRace\",\r\n      trackname,\r\n      mode,\r\n      laps,\r\n      max_duration,\r\n      max_participants,\r\n      type,\r\n      selected_vehicles\r\n    );\r\n    mp.console.logInfo(selected_vehicles);\r\n  },\r\n\r\n  \"clientside:CancelHost\": () => {},\r\n\r\n  \"clientside:GetTrackImages\": () => {\r\n    mp.events\r\n      .callRemoteProc(\"serverside:SendTrackImages\")\r\n      .then((data) => _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:GetTrackImages\", data));\r\n  },\r\n\r\n  \"clientside:UpdateRaceList\": (race) => {\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:UpdateRaceList\", race);\r\n  },\r\n\r\n  \"clientside:GetInitialRaces\": () => {\r\n    mp.events.callRemoteProc(\"serverside:SendInitialRaces\").then((races) => {\r\n      _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:GetInitialRaces\", races);\r\n      let samp = JSON.stringify(races);\r\n      mp.console.logInfo(samp);\r\n    });\r\n  },\r\n\r\n  \"clientside:SendRaceToList\": (race) => {\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\"react:SendRaceToList\", race);\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/race/RaceManager.js?");

/***/ }),

/***/ "./src_client/server/ServerData.js":
/*!*****************************************!*\
  !*** ./src_client/server/ServerData.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../client */ \"./src_client/client.js\");\n\r\n\r\nmp.events.add(\"clientside:SendServerData\", () => {\r\n  mp.events.callRemoteProc(\"serverside:SendServerData\").then((data) => {\r\n    _client__WEBPACK_IMPORTED_MODULE_0__.browser.call(\r\n      \"react:GetServerData\",\r\n      mp.players.local.name,\r\n      mp.players.local.id,\r\n      data\r\n    );\r\n  });\r\n});\r\n\n\n//# sourceURL=webpack://ragemp-carsgm/./src_client/server/ServerData.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src_client/client.js");
/******/ 	
/******/ })()
;