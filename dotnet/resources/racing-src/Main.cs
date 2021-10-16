using System;
using System.Diagnostics;
using System.Threading;
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

        [ServerEvent(Event.PlayerConnected)]
        public void PlayerConnected(Player player)
        {
            Server.ServerData.IncreasePlayerCount();
            NAPI.ClientEvent.TriggerClientEventForAll("clientside:SendServerData");
        }

        [ServerEvent(Event.PlayerDisconnected)]
        public void PlayerDisconnected(Player player, DisconnectionType type, string reason)
        {
            Server.ServerData.DecreasePlayerCount();
            NAPI.ClientEvent.TriggerClientEventForAll("clientside:SendServerData");
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

        [RemoteEvent("receivedDamage")]
        public void DamageHandler(Player player, Player entity, int damage)
        {
            entity.Health -= damage;
            player.SendChatMessage($"Healthu e: {entity.Health} si damageu: {damage}");
        }

    }
}
