using System;
using GTANetworkAPI;

namespace racing_src
{
    public class Main : Script
    {
        [ServerEvent(Event.ResourceStart)]
        public void OnResourceStart()
        {
            ConsoleInfo.WriteSuccess("Server started.");
            NAPI.Server.SetAutoSpawnOnConnect(false);
            NAPI.Server.SetAutoRespawnAfterDeath(false);
        }

        [ServerEvent(Event.PlayerDeath)]
        public void PlayerDeath(Player player, Player killer, uint reason)
        {
            NAPI.Task.Run(() =>
            {
                NAPI.Player.SpawnPlayer(player, new Vector3(227.21216, 1172.314, 225.45993));
            }, delayTime: 2500);
            
        }

        [Command("pf")]
        public void PF(Player player, string effect, int duration, bool loopable)
        {
            player.TriggerEvent("clientside:PlayEffect", effect, duration, loopable);
        }

        [Command("sf")]
        public void SF(Player player, string effect)
        {
            player.TriggerEvent("clientside:StopEffect", effect);
        }

    }
}
