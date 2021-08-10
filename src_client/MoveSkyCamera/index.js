/*
    Developed by Jengas
*/

const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};
let gui;

mp.events.add('moveSkyCamera', moveFromToAir);

function moveFromToAir(player, moveTo, switchType, showGui) {   
    /*
        switchType: 0 - 3

        0: 1 step towards ped
        1: 3 steps out from ped (Recommended)
        2: 1 step out from ped
        3: 1 step towards ped
    */
   switch (moveTo) {
       case 'up':
            if (showGui == false) {
                mp.gui.chat.show(showGui);
                gui = 'false';
            };
            mp.game.invoke(Natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(switchType));
           break;
       case 'down':
            if (gui == 'false') {
                checkCamInAir();
            };
            mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle);
           break;
   
       default:
           break;
   }
}

// Checks whether the camera is in the air. If so, then reset the timer
function checkCamInAir() {
    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAir();
        }, 400);
    } else {
        mp.gui.chat.show(true);
        gui = 'true';
    }
}